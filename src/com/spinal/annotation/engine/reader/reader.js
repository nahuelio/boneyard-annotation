/**
*	Read Tools module
*	@module com.spinal.annotation.reader
*	@author Patricio Ferreira <3dimentionar@gmail.com>
**/

import Tokenizer from '../parser/tokenizer';

/**
*	Class Reader
*	@namespace com.spinal.annotation.reader
*	@class com.spinal.annotation.reader.Reader
*
*	@requires com.spinal.annotation.parser.Tokenizer
**/
class Reader  {

	/**
	*	Constructor
	*	@constructor
	*	@param [attrs] {Object} attributes
	*	@return com.spinal.annotation.reader.Reader
	**/
	constructor(tokenizer) {
		this.setTokenizer(tokenizer);
		this.tokenizer.on(Tokenizer.Events.next, this.onToken);
		return this;
	}

	/**
	*	Register Supported Annotations
	*	@public
	*	@method register
	*	@return com.spinal.annotation.reader.Reader
	**/
	register() {
		// TODO: Implement
	}

	/**
	*	Default Annotation Read Strategy
	*	@public
	*	@method read
	*	@param content {String} file content to be read
	*	@return com.spinal.annotation.reader.Reader
	**/
	read(content = "") {
		return this.tokenizer.reset(content).tokenize();
	}

	/**
	*	Default Token Handler
	*	@public
	*	@method onToken
	*	@param [token] {String} token gathered by tokenizer
	*	@return com.spinal.annotation.reader.Reader
	**/
	onToken(token = "") {
		return this.evaluate(token);
	}

	/**
	*	Static Constructor
	*	@static
	*	@method new
	*	@return com.spinal.annotation.reader.Reader
	**/
	static new() {
		return new Reader(new Tokenizer());
	}

}

export default Reader;
