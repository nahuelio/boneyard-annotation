/**
*	@module com.boneyard.annotation.reader
*	@author Patricio Ferreira <3dimentionar@gmail.com>
**/

import fs from 'fs-extra';
import {resolve} from 'path';
import _ from 'underscore';
import _s from 'underscore.string';
import {EventEmitter} from 'events';
import esprima from 'esprima';
import q from '../../util/query';
import ASTFactory from './factory/ast-factory';
import AnnotationFactory from './factory/annotation-factory';
import Logger from '../../util/logger';

/**
*	Class Reader
*	@namespace com.boneyard.annotation.reader
*	@class com.boneyard.annotation.reader.Reader
*
*	@requires fs-extra
*	@requires path.resolve
*	@requires underscore
*	@requires underscore.string
*	@requires events.EventEmitter
*	@requires esprima
*	@requires com.boneyard.annotation.util.Query
*	@requires com.boneyard.annotation.engine.reader.factory.ASTFactory
*	@requires com.boneyard.annotation.engine.reader.factory.AnnotationFactory
*	@requires com.boneyard.annotation.util.Logger
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
		this._astFactory = new ASTFactory();
		this._annFactory = new AnnotationFactory();
		this._program = this.astFactory.create('program.js');
		return this;
	}

	/**
	*	Scan Source Path
	*	@public
	*	@method scan
	*	@return
	**/
	scan() {
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
		if(this.filter(asset)) {
			this.emit('reader:asset', this.parse(this.load(asset)));
		}
		return this;
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
			_.extend(asset, { content: fs.readFileSync(asset.path, 'utf8') });
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
		q.set(esprima.parse(asset.content, this.options));
		q.forEach(':root > .body', null, _.bind(this.onModule, this, asset));
		return asset;
	}

	/**
	*	Default Module Handler
	*	@public
	*	@method onModule
	*	@param asset {Object} asset reference
	*	@param node {Object} node reference
	*	@return com.boneyard.annotation.reader.Es6Reader
	**/
	onModule(asset, node) {
		this.program.add(this.filename(asset), node);
		return this;
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
		(result) ? this._scanned.push(asset.path) : this._ignored.push(asset.path);
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
	*	Retrieve Esprima default options
	*	@public
	*	@property options
	*	@type Object
	**/
	get options() {
		return {
			sourceType: 'module',
			tolerant: false,
			attachComments: true
		};
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
	*	Retrieves ASTFactory
	*	@public
	*	@property astFactory
	*	@type com.boneyard.annotation.engine.reader.factory.ASTFactory
	**/
	get astFactory() {
		return this._astFactory;
	}

	/**
	*	Retrieves AnnotationFactory
	*	@public
	*	@property annFactory
	*	@type com.boneyard.annotation.engine.reader.factory.AnnotationFactory
	**/
	get annFactory() {
		return this._annFactory;
	}

	/**
	*	Retrieves Program
	*	@public
	*	@property com.boneyard.annotation.engine.ast.ASTProgram
	*	@type type
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
