/**
*	@module com.boneyard.annotation.engine.reader
*	@author Patricio Ferreira <3dimentionar@gmail.com>
**/

import fs from 'fs-extra';
import {resolve} from 'path';
import _ from 'underscore';
import _s from 'underscore.string';
import {EventEmitter} from 'events';
import Logger from '../../util/logger/logger';

/**
*	Class Reader
*	@namespace com.boneyard.annotation.engine.reader
*	@class com.boneyard.annotation.engine.reader.Reader
*	@extends events.EventEmitter
*
*	@requires fs-extra
*	@requires path.resolve
*	@requires underscore
*	@requires underscore.string
*	@requires events.EventEmitter
*	@requires com.boneyard.annotation.engine.idiom.Syntax
*	@requires com.boneyard.annotation.util.logger.Logger
**/
class Reader extends EventEmitter {

	/**
	*	Constructor
	*	@constructor
	*	@param engine {com.boneyard.annotation.engine.Engine} engine reference
	*	@return com.boneyard.annotation.reader.Reader
	**/
	constructor(engine) {
		super();
		this._engine = engine;
		this._scanned = [];
		this._ignored = [];
		return this;
	}

	/**
	*	Scan Source Path
	*	@public
	*	@method scan
	*	@return com.boneyard.annotation.reader.Reader
	**/
	scan() {
		// TODO: create Program Visitor here...
		fs.walk(this.settings.source)
			.on('data', _.bind(this.read, this))
			.on('error', _.bind(this.error, this))
			.on('end', _.bind(this.complete, this));
		return this;
	}

	/**
	*	Default Annotation Read Strategy
	*	@public
	*	@method read
	*	@param asset {String} current asset to read
	*	@return com.boneyard.annotation.reader.Reader
	**/
	read(asset) {
		return this.filter(asset) ? this.emit('reader:asset', this.parse(this.load(asset))) : this;
	}

	/**
	*	Loads Asset Content from file
	*	@public
	*	@method load
	*	@param asset {Object} asset to load content from
	*	@return Object
	**/
	load(asset) {
		try {
			_.extend(asset, { relativePath: this.filename(asset), content: fs.readFileSync(asset.path, 'utf8') });
		} catch(ex) {
			Logger.out(`Error while parsing file [${asset.path}]:\n\t${ex.message}`, 'r');
			process.exit(1);
		}
		return asset;
	}

	/**
	*	Asset Content Parsing Strategy
	*	@public
	*	@override
	*	@method parse
	*	@param asset {Object} asset reference
	*	@return Object
	**/
	parse(asset) {
		// FIXME: this.program.accept(Syntax.newVisitor('program', this.program, asset.content));
		return asset;
	}

	/**
	*	Default Filter Handler
	*	@public
	*	@method filter
	*	@param asset {Object} asset metadata
	*	@return Boolean
	**/
	filter(asset) {
		if(asset.stats.isDirectory()) return false;
		let result = (this.extensions(asset) && !this.ignore(asset));
		if(result) {
			this._scanned.push(asset.path);
		} else {
			this._ignored.push(asset.path);
		}
		return result;
	}

	/**
	*	Default Ignore Handler
	*	@public
	*	@method ignore
	*	@param asset {Object} asset metadata
	*	@return Boolean
	**/
	ignore(asset) {
		return _.contains(this.settings.ignore, this.filename(asset));
	}

	/**
	*	Default Extensions Handler
	*	@public
	*	@method extensions
	*	@param asset {Object} asset metadata
	*	@return Boolean
	**/
	extensions(asset) {
		return _.some(this.settings.extensions, (ext) => { return _s.endsWith(asset.path, ext); });
	}

	/**
	*	Default Error Handler
	*	@public
	*	@method error
	*	@param err {Error} error reference
	*	@param file {Object} file reference
	**/
	error(err, file) {
		Logger.error(`[Yard]: Error found while scanning file [${file}]: ${err.message}`);
		process.exit(1);
	}

	/**
	*	Default Complete Handler
	*	@public
	*	@method complete
	*	@return com.boneyard.annotation.reader.Reader
	**/
	complete() {
		this.emit('reader:complete', this.files, this.ignored);
		return this;
	}

	/**
	*	Retrieves asset relative filename path to the source directory
	*	@public
	*	@method filename
	*	@param asset {Object} asset reference
	*	@return String
	**/
	filename(asset) {
		return _s.strRight(asset.path, this.settings.basePath);
	}

	/**
	*	Retrieve Scanned files
	*	@public
	*	@property files
	*	@type Array
	**/
	get files() {
		return this._scanned;
	}

	/**
	*	Retrieve Ignored files
	*	@public
	*	@property ignored
	*	@type Array
	**/
	get ignored() {
		return this._ignored;
	}

	/**
	*	Retrieve Program
	*	@public
	*	@property program
	*	@type com.boneyard.annotation.engine.ast.ASTProgram
	**/
	get program() {
		return this._program;
	}

	/**
	*	Retrieve Reader's Engine
	*	@public
	*	@property engine
	*	@type com.boneyard.annotation.engine.Engine
	**/
	get engine() {
		return this._engine;
	}

	/**
	*	Retrieves Engine's settings
	*	@public
	*	@property settings
	*	@type Object
	**/
	get settings() {
		return this.engine.settings;
	}

}

export default Reader;
