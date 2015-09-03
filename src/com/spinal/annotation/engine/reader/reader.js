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
		this.annotations = new Set();
		this.tokenizer = tokenizer;
		this.tokenizer.on(Tokenizer.Events.next, _.bind(this.onToken, this));
		this.factory = new Factory('../support/');
		return this;
	}

	/**
	*	Returns true if token passed basic validation, otherwise false.
	*	- A token must be a string
	*	- A token must be have a length greater than 0.
	*	- A token must startWith the symbol declared in Annotation base class
	*	- A token must be defined inside a comment block
	*	@public
	*	@method isValid
	*	@param token {String} token reference
	*	@return Boolean
	**/
	isValid(token) {
		return (typeof(token) !== 'string' ||
			token.length > 0 ||
			token.indexOf(Annotation.Symbol) !== -1 ||
			this.tokenizer.inComment(token));
	}

	/**
	*	Default Annotation Read Strategy
	*	@public
	*	@method read
	*	@param content {String} file content to be read
	*	@return Array
	**/
	read(content = "") {
		return this.tokenizer.reset(content).tokenize();
	}

	/**
	*	Default Token Handler
	*	Evaluates token expression and decide which annotation will process the token
	*	@public
	*	@method onToken
	*	@param token {String} token to be analyzed
	*	@return com.spinal.annotation.support.Annotation
	**/
	onToken(token = "") {
		if(!this.isValid(token)) return this;
		let annotation = this.getAnnotation(token);
		if(annotation) this.annotations.add(annotation);
		return this;
	}

	/**
	*	Retrieves annotation class given a token extracted from tokenizer
	*	@public
	*	@method getAnnotation
	*	@param token {String} token reference
	*	@return com.spinal.annotation.support.Annotation
	**/
	getAnnotation(token) {
		return this.factory.create(this.getAnnotationName(token),
			this.getAnnotationParameters(token),
			this.getAnnotationContext(token));
	}

	/**
	*	Default retrieval strategy to get the annotation name given a token
	*	@public
	*	@method getAnnotationName
	*	@param token {String} token reference
	*	@return String
	**/
	getAnnotationName(token) {
		return this.factory.register(Annotation.get(token));
	}

	/**
	*	Default retrieval of annotation's parameters from token
	*	@public
	*	@override
	*	@method getAnnotationParameters
	*	@param token {String} token reference
	*	@return Object
	**/
	getAnnotationParameters(token) {
		return Annotation.parameters(token);
	}

	/**
	*	Default retrieval of annotation's context in which dependency injection may ocurr later on
	*	@public
	*	@method getAnnotationContext
	*	@param token {String} token reference
	*	@return com.spinal.annotation.support.Context
	**/
	getAnnotationContext(token) {
		return Context.new(this.tokenizer.block(token));
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
