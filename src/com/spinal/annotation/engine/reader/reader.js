/**
*	Read Tools module
*	@module com.spinal.annotation.reader
*	@author Patricio Ferreira <3dimentionar@gmail.com>
**/

import Tokenizer from '../parser/tokenizer';
import Annotation from '../../support/annotation';

/**
*	Class Reader
*	@namespace com.spinal.annotation.reader
*	@class com.spinal.annotation.reader.Reader
*
*	@requires com.spinal.annotation.parser.Tokenizer
*	@requires com.spinal.annotation.support.Annotation
**/
class Reader  {

	/**
	*	Constructor
	*	@constructor
	*	@param [attrs] {Object} attributes
	*	@return com.spinal.annotation.reader.Reader
	**/
	constructor(tokenizer) {
		this.tokenizer = tokenizer;
		this.tokenizer.on(Tokenizer.Events.next, this.onToken);
		this.annotations = [];
		return this;
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
	*	Evaluates token expression and decide which annotation will process the token
	*	@public
	*	@method onToken
	*	@param token {String} token to be analyzed
	*	@return
	**/
	onToken(token = "") {
		let annotation = this.from(token);
		if(annotation) this.annotations.push(annotation.process(token));
		return this;
	}

	/**
	*	Retrieves annotation by a given token
	*	@public
	*	@method from
	*	@param token {String} token reference
	*	@return com.spinal.annotation.support.Annotation
	**/
	from(token) {
		if(token.length === 0 || token.indexOf(Annotation.Symbol) === -1) return null;
		let name = Annotation.name(token);
		return (Reader.annotations[name]) ? new Reader.annotations[name]() : null;
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

	/**
	*	Annotations Supported
	*	@static
	*	@property annotations
	*	@type Array
	**/
	static get annotations() {
		return {
			scan: System.import('../support/scan'),
			bone: System.import('../support/bone'),
			wire: System.import('../support/wire')
		};
	}

}

export default Reader;
