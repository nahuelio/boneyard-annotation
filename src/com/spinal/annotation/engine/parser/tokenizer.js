/**
*	Parser Tools module
*	@module com.spinal.annotation.engine.parser
*	@author Patricio Ferreira <3dimentionar@gmail.com>
**/

import {EventEmitter} from 'events';
import Es5Reader from '../reader/es5';

/**
*	Class Tokenizer
*	@namespace com.spinal.annotation.engine.parser
*	@class com.spinal.annotation.engine.parser.Tokenizer
*
*	@requires events.EventEmitter
*	@requires com.spinal.annotation.engine.reader.es5
**/
export default class Tokenizer extends EventEmitter {

	/**
	*	Constructor
	*	@constructor
	*	@param input {String} input string to be tokenized
	*	@return com.spinal.annotation.engine.parser.Tokenizer
	**/
	constructor(input = "") {
		super();
		this.bf = Tokenizer.newBuffer(input);
		this.cur = -1;
		return this;
	}

	/**
	*	Returns All tokens of this tokenizer as an array for convenience asynchrounously.
	*	@public
	*	@method tokenize
	*	@param [callback] {Function} callback reference
	*	@return com.spinal.annotation.engine.parser.Tokenizer
	**/
	tokenize(callback) {
		while(this.hasNext()) {

		}
		this.cur = -1;
		callback(null, result);
		return this;
	}

	/**
	*	Returns All tokens of this tokenizer as an array for convenience.
	*	@public
	*	@method tokenize
	*	@param input {String} input string to be tokenized
	*	@return Array
	**/
	tokenizeSync() {
		return this;
	}

	/**
	*	Returns true if and only if this tokenizer has more elements
	*	@public
	*	@method hasNext
	*	@return Boolean
	**/
	hasNext() {
		return (this.cur < (this.bf.length-1));
	}

	/**
	*	Returns the next token from this tokenizer
	*	@public
	*	@method next
	*	@return String
	**/
	next() {
		// FIXME
		return this.bf.toString(this.enconding, this.cur++);
	}

	/**
	*	Returns the next token, without removing it from the Tokenizer.
	*	Same token will be returned again on the next call to next() or peek().
	*	@public
	*	@method peek
	*	@return String
	**/
	peek() {
		// TODO
	}

	/**
	*	Removes from the underlying collection the last element returned by the iterator.
	*	This method can be called only once per call to next()
	*	@public
	*	@method remove
	*	@return String
	**/
	remove() {
		// FIXME
		return this.bf.slice(this.encoding, this.cur++);
	}

	/**
	*	Returns Encoding supported by this tokenizer
	*	@public
	*	@property enconding
	*	@type String
	**/
	get encoding() {
		return 'utf8';
	}

	/**
	*	Returns a new fresh buffer with a default size of 4096
	*	@static
	*	@method newBuffer
	*	@param [size] {Number} buffer size
	*	@return Object
	**/
	static newBuffer(input = "") {
		let bf = new Buffer(input.length);
		return bf.write(input, 0, input.length, 'utf8');
	}

	/**
	*	Returns RegExp that specifies the strategy trim tokens from the input
	*	@static
	*	@property token_delimiters
	*	@type RegExp
	**/
	static get token_delimiters() {
		return /\n\t/;
	}

}
