/**
*	Parser Tools module
*	@module com.spinal.annotation.engine.parser
*	@author Patricio Ferreira <3dimentionar@gmail.com>
**/

import fs from 'fs-extra';
import Glob from 'glob';
import _ from 'underscore';
import {EventEmitter} from 'events';
import Es6Reader from '../reader/es6.js';

/**
*	Class Parser
*	@namespace com.spinal.annotation.engine.parser
*	@class com.spinal.annotation.engine.parser.Parser
*
*	@requires fs-extra
*	@requires underscore
*	@requires events.EventEmitter
*	@requires com.spinal.annotation.engine.reader.Es6Reader
**/
class Parser extends EventEmitter {

	/**
	*	Constructor
	*	@constructor
	*	@param reader {com.spinal.annotation.engine.reader.Reader} reader instance
	*	@return com.spinal.annotation.engine.parser.Parser
	**/
	constructor(reader) {
		super();
		this.reader = reader.register();
		return this;
	}

	/**
	*	Default Before Parse Handler
	*	@public
	*	@method beforeParse
	*	@param config {Object} config used to load files
	*	@return com.spinal.annotation.engine.parser.Parser
	**/
	beforeParse(attrs) {
		if(!attrs.basePath || !attrs.path)
			throw new Error(`Parser requires 2 parameters 'basePath' and 'path' in order to work.`);
		if(!attrs.ignoreList) attrs.ignoreList = [];
		return this.emit(Parser.Events.start, this);
	}

	/**
	*	Parse files
	*	@public
	*	@method parse
	*	@param config {Object} config used to load files
	*	@return com.spinal.annotation.engine.parser.Parser
	**/
	parse(attrs = {}) {
		return this.beforeParse(attrs)
			.load(Glob.sync(attrs.path, { cwd: attrs.basePath, ignore: attrs.ignoreList, nodir: true }))
			.afterParse();
	}

	/**
	*	Load File given a path
	*	@public
	*	@method load
	*	@param files {Array} list of files that matched glob pattern.
	*	@return
	**/
	load(files = []) {
		files.forEach(f => {
			this.emit(Parser.Events.read, f);
			this.reader.read(fs.readFileSync(f));
		});
		return this;
	}

	/**
	*	Default After Parse Handler
	*	@public
	*	@method afterParse
	*	@return com.spinal.annotation.engine.parser.Parser
	**/
	afterParse() {
		this.emit(Parser.Events.end, this);
		return this;
	}

	/**
	*	Instanciates a new Parser given an a list of files
	*	@static
	*	@method from
	*	@param reader {Class} Reader Class
	*	@return com.spinal.annotation.engine.parser.Parser
	**/
	static from(Reader = Es6Reader) {
		return new Parser(Reader.new());
	}

	/**
	*	Events
	*	@static
	*	@property Events
	*	@type Object
	**/
	static get Events() {
		return {
			start: 'com:spinal:annotation:engine:parser:start',
			read: 'com:spinal:annotation:engine:parser:read',
			end: 'com:spinal:annotation:engine:parser:end'
		}
	}

}

export default Parser;
