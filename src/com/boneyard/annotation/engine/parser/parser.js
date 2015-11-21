/**
*	@module com.boneyard.annotation.engine.parser
*	@author Patricio Ferreira <3dimentionar@gmail.com>
**/

import fs from 'fs-extra';
import {resolve} from 'path';
import Glob from 'glob';
import _ from 'underscore';
import {EventEmitter} from 'events';
import Es6Reader from '../reader/es6';
import Writer from '../writer/writer';

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
*	@requires com.boneyard.annotation.writer.Writer
**/
class Parser extends EventEmitter {

	/**
	*	Constructor
	*	@constructor
	*	@param reader {com.boneyard.annotation.engine.reader.Reader} Reader reference
	*	@return com.boneyard.annotation.engine.parser.Parser
	**/
	constructor(reader) {
		super();
		if(!reader) throw new Error('Parser requires an instance of a reader in order to work');
		this.reader = reader;
		this.writer = new Writer();
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
		if(!Parser.config.cwd || !Parser.config.target)
			throw new Error("Parser {{config}} requires parameter 'cwd' and 'target' in order to work.");
		if(!Parser.config.ignore) Parser.config.ignore = [];
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
		return this.beforeParse().load(Glob.sync(Parser.config.target, Parser.config)).afterParse();
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
			let filepath = resolve(Parser.config.cwd, f);
			this.emit(Parser.Events.read, filepath);
			this.reader.read(filepath, fs.readFileSync(filepath).toString('utf-8'));
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
		this.writer.write(this.reader.annotations);
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
		Parser.config = config;
		return new Parser(Reader.new());
	}

	/**
	*	Sets Scanner Config
	*	@static
	*	@property config
	*	@type Object
	**/
	static set config(config) {
		Parser._config = config;
	}

	/**
	*	Retrieves Scanner Config
	*	@static
	*	@property config
	*	@type Object
	**/
	static get config() {
		return Parser._config;
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
