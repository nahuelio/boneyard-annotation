/**
*	@module com.boneyard.annotation.reader
*	@author Patricio Ferreira <3dimentionar@gmail.com>
**/

import {resolve} from 'path';
import _ from 'underscore';
import _s from 'underscore.string';
import Tokenizer from '../parser/tokenizer';
import Parser from '../parser/parser';
import Annotation from '../annotation/annotation';
import Factory from '../../util/factory';
import Logger from '../../util/logger';

/**
*	Class Reader
*	@namespace com.boneyard.annotation.reader
*	@class com.boneyard.annotation.reader.Reader
*
*	@requires path
*	@requires underscore
*	@requires underscore.string
*	@requires com.boneyard.annotation.parser.Tokenizer
*	@requires com.boneyard.annotation.parser.Parser
*	@requires com.boneyard.annotation.engine.annotation.Annotation
*	@requires com.boneyard.annotation.engine.annotation.Context
*	@requires com.boneyard.annotation.util.Factory
*	@requires com.boneyard.annotation.util.Logger
**/
class Reader  {

	/**
	*	Constructor
	*	@constructor
	*	@param tokenizer {com.boneyard.annotation.parser.Tokenizer} tokenizer instance
	*	@return com.boneyard.annotation.reader.Reader
	**/
	constructor(tokenizer) {
		this.annotations = new Map();
		this.tokenizer = tokenizer;
		this.tokenizer.on(Tokenizer.Events.next, _.bind(this.onToken, this));
		this.factory = new Factory(resolve(__dirname, '../../support/'));
		return this;
	}

	/**
	*	Sets Current file being analyzed by this reader
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
	*	Retrieves annotation registry for the current file being read
	*	@public
	*	@property registry
	*	@type Array
	**/
	get registry() {
		return this.annotations.get(this.current);
	}

	/**
	*	Returns true if token passes basic validation, otherwise false.
	*	Return true all the following conditions are met:
	*	- A token is a string
	*	- A token has length greater than 0.
	*	- A token contains a symbol character declared in Annotation.Symbol.
	*	- A token must be defined inside a comment block of any kind (multi line / single line).
	*	- A token containing a symbol character must start with the symbol itself.
	*	@public
	*	@method isValid
	*	@param token {String} token reference
	*	@return Boolean
	**/
	isValid(token) {
		return (typeof(token) === 'string' && token.length > 0 && Annotation.regExp.test(token));
	}

	/**
	*	Returns true if the content of a given token is a comment, otherwise returns false.
	*	@public
	*	@method inComment
	*	@param token {String} token to evaluate
	*	@return Boolean
	**/
	inComment(token) {
		return _s.startsWith(token, '*') || _s.startsWith(token, '//') || _s.startsWith(token, '/*');
	}

	/**
	*	Resolves relative path to the current file being read
	*	@public
	*	@method resolvePath
	*	@param path {String} current file to read contents from
	*	@return String
	**/
	resolvePath(path) {
		if(!path) return null;
		return _s.replaceAll(path, Parser.config.cwd + '/', '')
	}

	/**
	*	Default Annotation Read Strategy
	*	@public
	*	@method read
	*	@param path {String} current file to read contents from
	*	@param content {String} file content to be read
	*	@return com.boneyard.annotation.reader.Reader
	**/
	read(path, content = "") {
		if(!(this.current = this.resolvePath(path))) return this;
		Logger.out(`Reading ${this.current}...`, 'm');
		this.annotations.set(this.current, new Array());
		this.tokenizer.reset(content).tokenize();
		return this;
	}

	/**
	*	Returns a list of annotations that have not resolved their contexts by this reader.
	*	@public
	*	@method annotationsWithNoContext
	*	@return Array
	**/
	annotationsWithNoContext() {
		return _.compact(this.registry.map((a) => { return a.hasContext() ? a : null }));
	}

	/**
	*	Default Token Handler
	*	Evaluates token expression and decide which annotation will process the token
	*	@public
	*	@method onToken
	*	@param token {String} token to be analyzed
	*	@param [predicate] {Function} predicate operation
	*	@return com.boneyard.annotation.reader.Reader
	**/
	onToken(token) {
		return this.isValid(token) ? this.onAnnotation(Annotation.metadata(token)) : this.onContext(token);
	}

	/**
	*	Default Annotation resolution strategy
	*	@public
	*	@method onAnnotation
	*	@param metadata {Object} annotation metadata
	*	@return com.boneyard.annotation.reader.Reader
	**/
	onAnnotation(metadata) {
		if(!metadata) return this;
		try {
			this.factory.register(metadata._name.toLowerCase());
			this.registry.push(this.getAnnotation(metadata));
		} catch(ex) {}
		return this;
	}

	/**
	*	Default Context resolution strategy
	*	@public
	*	@method onContext
	*	@param token {String} token not in comment used to determine annotation context
	*	@return Array
	**/
	onContext(token) {
		if(this.inComment(token)) return [];
		return this.annotationsWithNoContext();
	}

	/**
	*	Retrieves annotation class given a token extracted from tokenizer
	*	@public
	*	@method getAnnotation
	*	@param metadata {Object} annotation metadata
	*	@return com.boneyard.annotation.support.Annotation
	**/
	getAnnotation(metadata) {
		return this.factory.create(metadata._name.toLowerCase(), _.extend({
			_path: this.current,
			_config: Parser.config
		}, metadata));
	}

	/**
	*	Static Constructor
	*	@static
	*	@method new
	*	@return com.boneyard.annotation.reader.Reader
	**/
	static new() {
		return new this(new Tokenizer());
	}

}

export default Reader;
