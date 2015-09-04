/**
*	Read Tools module
*	@module com.spinal.annotation.reader
*	@author Patricio Ferreira <3dimentionar@gmail.com>
**/

import Tokenizer from '../parser/tokenizer';
import Annotation from '../../support/annotation';
import Context from '../../support/context';
import Factory from '../../util/factory';

/**
*	Class Reader
*	@namespace com.spinal.annotation.reader
*	@class com.spinal.annotation.reader.Reader
*
*	@requires com.spinal.annotation.parser.Tokenizer
*	@requires com.spinal.annotation.support.Annotation
*	@requires com.spinal.annotation.support.Context
*	@requires com.spinal.annotation.util.Factory
**/
class Reader  {

	/**
	*	Constructor
	*	@constructor
	*	@param [attrs] {Object} attributes
	*	@return com.spinal.annotation.reader.Reader
	**/
	constructor(tokenizer) {
		this.annotations = new Map();
		this.tokenizer = tokenizer;
		this.tokenizer.on(Tokenizer.Events.next, _.bind(this.onToken, this));
		this.factory = new Factory('../support/');
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
	*	@return com.spinal.annotation.reader.Reader
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
	*	@return com.spinal.annotation.support.Annotation
	**/
	onToken(token) {
		if(!this.isValid(token)) return this;
		let metadata = this.getAnnotationMetadata(token);
		this.annotations.set(metadata.name, this.getAnnotation(metadata));
		return this;
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
	*	@return com.spinal.annotation.support.Annotation
	**/
	getAnnotation(metadata) {
		return this.factory.create(metadata.name, this.getAnnotationParameters(metadata));
	}

	/**
	*	Default retrieval of annotation's context in which dependency injection may ocurr later on.
	*	@public
	*	@method getAnnotationContext
	*	@param metadata {Object} metadata reference
	*	@return Object
	**/
	getAnnotationParameters(metadata) {
		return _.extend(this.getAnnotationContext(metadata), metadata);
	}

	/**
	*	Default retrieval of annotation's context in which dependency injection may ocurr later on.
	*	@public
	*	@method getAnnotationContext
	*	@param metadata {Object} metadata reference
	*	@return Object
	**/
	getAnnotationContext(metadata) {
		return { context: Context.new() };
	}

	/**
	*	Static Constructor
	*	@static
	*	@method new
	*	@return com.spinal.annotation.reader.Reader
	**/
	static new() {
		return new this(new Tokenizer());
	}

}

export default Reader;
