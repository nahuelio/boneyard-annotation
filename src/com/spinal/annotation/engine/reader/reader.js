/**
*	Read Tools module
*	@module com.spinal.annotation.reader
*	@author Patricio Ferreira <3dimentionar@gmail.com>
**/

import Tokenizer from '../parser/tokenizer';
import Annotation from '../../support/annotation';
import Context from '../../support/context';

/**
*	Class Reader
*	@namespace com.spinal.annotation.reader
*	@class com.spinal.annotation.reader.Reader
*
*	@requires com.spinal.annotation.parser.Tokenizer
*	@requires com.spinal.annotation.support.Annotation
*	@requires com.spinal.annotation.support.Context
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
		return this;
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
		let Annotation = Reader.annotations[this.getAnnotationName(token)];
		if(!Annotation) return null;
		return this.annotations.set(new Annotation(this.getAnnotationParameters(token), this.getAnnotationContext(token)));
	}

	/**
	*	Retrieves annotation name given a token extracted from tokenizer
	*	@public
	*	@method getAnnotationName
	*	@param token {String} token reference
	*	@return String
	**/
	getAnnotationName(token) {
		if(token.length === 0 || token.indexOf(Annotation.Symbol) === -1) return '';
		return token.substring(token.indexOf(Annotation.Symbol), token.indexOf('('));
	}

	/**
	*	Strategy to retrieve parameters from annotation
	*	@public
	*	@override
	*	@method getAnnotationParameters
	*	@param token {String} token reference
	*	@return Object
	**/
	getAnnotationParameters(token) {
		// TODO: Generic
		return {};
	}

	/**
	*	Retrieves annotation context and stores a pointer to the specific position in
	*	injections may ocurr later on.
	*	@public
	*	@method getAnnotationContext
	*	@param token {String} token reference
	*	@return com.spinal.annotation.support.Context
	**/
	getAnnotationContext(token) {
		// TODO: Generic
		return {};
	}

	/**
	*	Static Constructor
	*	@static
	*	@method new
	*	@return com.spinal.annotation.reader.Reader
	**/
	static new() {;
		return new this(new Tokenizer());
	}

	/**
	*	Annotations Supported
	*	@static
	*	@property annotations
	*	@type Array
	**/
	static get annotations() {
		return {
			scan: require('../../support/scan'),
			bone: require('../../support/bone'),
			wire: require('../../support/wire')
		};
	}

}

export default Reader;
