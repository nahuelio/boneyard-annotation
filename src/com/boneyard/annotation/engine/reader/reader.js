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
import Factory from '../../util/factory';
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
*	@requires glob
*	@requires events.EventEmitter
*	@requires esprima
*	@requires com.boneyard.annotation.util.Factory
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
		this._factory = new Factory(resolve(__dirname, '../../support/'));
		this._scanned = [];
		this._ignored = [];
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
	*	@param path {String} current file to read contents from
	*	@param content {String} file content to be read
	*	@return com.boneyard.annotation.reader.Reader
	**/
	read(asset) {
		if(this.filter(asset)) {
			//this.parse(esprima.parse(content, this.options));
		}
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
		if(asset.stats.isDirectory()) return true;
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
		let basePath = `${resolve(process.cwd(), this.settings.source)}/`;
		return _.contains(this.settings.ignore, _s.strRight(asset.path, basePath));
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
	*	Sets current file being analyzed by this reader
	*	@public
	*	@property current
	*	@type String
	**/
	set current(path) {
		this._current = path;
	}

	/**
	*	Retrieves current file path being analyzed by this reader
	*	@public
	*	@property current
	*	@type String
	**/
	get current() {
		return this._current;
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
			tokens: true,
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
	*	Retrieve Reader's factory
	*	@public
	*	@property factory
	*	@type com.boneyard.annotation.util.Factory
	**/
	get factory() {
		return this._factory;
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
