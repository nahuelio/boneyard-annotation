/**
*	@module com.boneyard.annotation.reader
*	@author Patricio Ferreira <3dimentionar@gmail.com>
**/

import {resolve} from 'path';
import Tokenizer from '../parser/tokenizer';
import Annotation from '../annotation/annotation';
import Context from '../annotation/context';
import Factory from '../../util/factory';
import Logger from '../../util/logger';

/**
*	Class Reader
*	@namespace com.boneyard.annotation.reader
*	@class com.boneyard.annotation.reader.Reader
*
*	@requires path
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
		this.annotations = new Map();
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
	*	Default Annotation Read Strategy
	*	@public
	*	@method read
	*	@param content {String} file content to be read
	*	@return com.boneyard.annotation.reader.Reader
	**/
	read(content = "") {
		this.tokenizer.reset(content).tokenize();
		return this;
	}

	/**
	*	Default Token Handler
	*	Evaluates token expression and decide which annotation will process the token
	*	@public
	*	@method onToken
	*	@param token {String} token to be analyzed
	*	@return com.boneyard.annotation.reader.Reader
	**/
	onToken(token) {
		if(!this.isValid(token)) return this.onContext(token);
		try {
			let metadata = this.getAnnotationMetadata(token);
			this.annotations.set(metadata.name, this.getAnnotation(metadata));
		} catch(ex) {
			Logger.warn(token);
			return this;
		}
		return this;
	}

	/**
	*	Default Context Handler
	*	Evaluates token to determine the context of the last annotation matched
	*	@public
	*	@method onContext
	*	@param token {String} token to be analyzed
	*	@return com.boneyard.annotation.support.Annotation
	**/
	onContext(token) {
		if(this.annotations.size === 0) return this;
		return Array.from(this.annotations.values()).pop();
	}

	/**
	*	Default retrieval strategy to get the annotation metadata given a token
	*	@public
	*	@method getAnnotationMetadata
	*	@param token {String} token reference
	*	@return Object
	**/
	getAnnotationMetadata(token) {
		let metadata = Annotation.metadata(token);
		this.factory.register(metadata.name);
		return metadata;
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
