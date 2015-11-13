/**
*	@module com.boneyard.annotation.engine.parser
*	@author Patricio Ferreira <3dimentionar@gmail.com>
**/

import fs from 'fs-extra';
import {resolve} from 'path';
import Glob from 'glob';
import _ from 'underscore';
import {EventEmitter} from 'events';
import Es6Reader from '../reader/es6.js';

/**
*	Class Parser
*	@namespace com.boneyard.annotation.engine.parser
*	@class com.boneyard.annotation.engine.parser.Parser
*
*	@requires fs-extra
*	@requires path
*	@requires underscore
*	@requires events.EventEmitter
*	@requires com.boneyard.annotation.engine.reader.Es6Reader
**/
class Parser extends EventEmitter {

	/**
	*	Constructor
	*	@constructor
	*	@param config {Object} config used to load files
	*	@param promise {Promise} promise as a result of loading reader's supported annotations
	*	@return com.boneyard.annotation.engine.parser.Parser
	**/
	constructor(config = {}, reader) {
		super();
		if(!reader) throw new Error('Parser requires an instance of a reader in order to work');
		this.config = config;
		this.reader = reader;
		return this;
	}

	/**
	*	Default Before Parse Handler
	*	@public
	*	@method beforeParse
	*	@param config {Object} config used to load files
	*	@return com.boneyard.annotation.engine.parser.Parser
	**/
	beforeParse() {
		if(!this.config.cwd || !this.config.target)
			throw new Error("Parser {{config}} requires parameter 'cwd' and 'target' in order to work.");
		if(!this.config.ignore) this.config.ignore = [];
		this.emit(Parser.Events.start, this);
		return this;
	}

	/**
	*	Parse files
	*	@public
	*	@method parse
	*	@return com.boneyard.annotation.engine.parser.Parser
	**/
	parse() {
		Logger.out('Parsing Annotations...\n', 'c');
		return this.beforeParse().load(Glob.sync(this.config.target, this.config)).afterParse();
	}

	/**
	*	Load File given a path
	*	@public
	*	@method load
	*	@param files {Array} list of files that matched glob pattern.
	*	@return
	**/
	load(files) {
		files.forEach(f => {
			let filepath = resolve(this.config.cwd, f);
			this.emit(Parser.Events.read, filepath);
			this.reader.read(fs.readFileSync(filepath).toString('utf-8'));
		});
		return this;
	}

	/**
	*	Default After Parse Handler
	*	@public
	*	@method afterParse
	*	@return com.boneyard.annotation.engine.parser.Parser
	**/
	afterParse() {
		this.emit(Parser.Events.end, this);
		return this;
	}

	/**
	*	Instanciates a new Parser given an a list of files
	*	@static
	*	@method from
	*	@param config {Object} configuration reference
	*	@param reader {String} Reader Support
	*	@return com.boneyard.annotation.engine.parser.Parser
	**/
	static from(config = {}, reader = 'es6') {
		let Reader = require('../reader/' + reader);
		return new Parser(config, Reader.new());
	}

	/**
	*	Events
	*	@static
	*	@property Events
	*	@type Object
	**/
	static get Events() {
		return {
			start: 'com:boneyard:annotation:engine:parser:start',
			read: 'com:boneyard:annotation:engine:parser:read',
			end: 'com:boneyard:annotation:engine:parser:end'
		}
	}

}

export default Parser;
