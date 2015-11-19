/**
*	@module com.boneyard.annotation.reader
*	@author Patricio Ferreira <3dimentionar@gmail.com>
**/

import {resolve} from 'path';
import _s from 'underscore.string';
import Tokenizer from '../parser/tokenizer';
import Annotation from '../annotation/annotation';
import Factory from '../../util/factory';
import Logger from '../../util/logger';

/**
*	Class Reader
*	@namespace com.boneyard.annotation.reader
*	@class com.boneyard.annotation.reader.Reader
*
*	@requires path
*	@requires underscore.string
*	@requires com.boneyard.annotation.parser.Tokenizer
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
		this.annotations = new Array();
		this.tokenizer = tokenizer;
		this.tokenizer.on(Tokenizer.Events.next, _.bind(this.onToken, this));
		this.factory = new Factory(resolve(__dirname, '../../support/'));
		return this;
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
	*	Default Annotation Read Strategy
	*	@public
	*	@method read
	*	@param path {String} current file to read contents from
	*	@param content {String} file content to be read
	*	@return com.boneyard.annotation.reader.Reader
	**/
	read(path, content = "") {
		this.tokenizer.reset(content).tokenize();
		return this;
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
		return this.isValid(token) ? this.onAnnotation(Annotation.metadata(token)) : this.resolve(token);
	}

	/**
	*	Default Non-annotation resolution strategy
	*	@public
	*	@method resolve
	*	@param token {String} token to be analyzed
	*	@return com.boneyard.annotation.support.Annotation
	**/
	resolve(token) {
		if(this.inComment(token)) return this;
		return this.onContext(token);
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
			this.factory.register(metadata.name);
			this.annotations.push({ name: metadata.name, annotation: this.getAnnotation(metadata) });
		} catch(ex) {}
		return this;
	}

	/**
	*	Default Context resolution strategy
	*	@public
	*	@method onContext
	*	@param token {String} token not in comment used to determine annotation context
	*	@return com.boneyard.annotation.reader.Reader
	**/
	onContext(token) {
		return this;
	}

	/**
	*	Retrieves annotation class given a token extracted from tokenizer
	*	@public
	*	@method getAnnotation
	*	@param metadata {Object} annotation metadata
	*	@return com.boneyard.annotation.support.Annotation
	**/
	getAnnotation(metadata) {
		return this.factory.create(metadata.name, metadata);
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
