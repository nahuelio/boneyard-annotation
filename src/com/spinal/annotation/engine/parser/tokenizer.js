/**
*	Parser Tools module
*	@module com.spinal.annotation.engine.parser
*	@author Patricio Ferreira <3dimentionar@gmail.com>
**/

import _ from 'underscore';
import {EventEmitter} from 'events';

/**
*	Class Tokenizer
*	@namespace com.spinal.annotation.engine.parser
*	@class com.spinal.annotation.engine.parser.Tokenizer
*
*	@requires underscore
*	@requires events.EventEmitter
**/
class Tokenizer extends EventEmitter {

	/**
	*	Constructor
	*	@constructor
	*	@param input {String} input string to be tokenized
	*	@return com.spinal.annotation.engine.parser.Tokenizer
	**/
	constructor(input) {
		super();
		this.cur = -1;
		return this.reset(input);
	}

	/**
	*	Outputs Clean Token
	*	@private
	*	@method _output
	*	@return String
	**/
	_output(token) {
		return token.replace(/(\n|\r\n|\t)/gm, '');
	}

	/**
	*	Resets this tokenizer and optionally
	*	@public
	*	@method reset
	*	@param [input] {String} input string to be tokenized
	*	@return com.spinal.annotation.engine.parser.Tokenizer
	**/
	reset(input = "") {
		this.content = _.compact(input.split(Tokenizer.delimiters));
		return this.rewind();
	}

	/**
	*	Returns All tokens of this tokenizer as an array for convenience.
	*	@public
	*	@method tokenize
	*	@param input {String} input string to be tokenized
	*	@return Array
	**/
	tokenize() {
		var out = [];
		while(this.hasNext()) {
			let token = this.next();
			if(token.length > 0) out.push(token);
		}
		return out;
	}

	/**
	*	Returns true if and only if this tokenizer has more elements
	*	@public
	*	@method hasNext
	*	@return Boolean
	**/
	hasNext() {
		var r = (this.cur < (this.content.length-1));
		if(!r) this.rewind();
		return r;
	}

	/**
	*	Returns the next token from this tokenizer
	*	@public
	*	@method next
	*	@return String
	**/
	next() {
		var token = this._output(this.content[++this.cur]);
		this.emit(Tokenizer.Events.next, token);
		return token;
	}

	/**
	*	Removes from the underlying collection the last element returned by the iterator.
	*	This method can be called only once per call to next()
	*	@public
	*	@method remove
	*	@return String
	**/
	remove() {
		var removed = null;
		if(this.content.length > 0 && this.cur !== -1) {
			removed = this._output(this.content.splice(this.cur, 1)[0]);
			this.emit(Tokenizer.Events.remove, removed);
		}
		return removed;
	}

	/**
	*	Reset the cursor to the beginning to the index 0.
	*	@public
	*	@chainable
	*	@method rewind
	*	@return com.spinal.annotation.engine.parser.Tokenizer
	**/
	rewind() {
		this.cur = -1;
		return this;
	}

	/**
	*	Returns RegExp that specifies the strategy trim tokens from the input
	*	@static
	*	@property delimiters
	*	@type RegExp
	**/
	static get delimiters() {
		return /(\n|{|})/gm;
	}

	/**
	*	Events
	*	@static
	*	@property Events
	*	@type Object
	**/
	static get Events() {
		return {
			next: 'com:spinal:annotation:engine:parser:tokenizer:next',
			remove: 'com:spinal:annotation:engine:parser:tokenizer:remove'
		};
	}

}

export default Tokenizer;
