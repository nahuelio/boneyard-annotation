/**
*	@module com.boneyard.annotation.reader
*	@author Patricio Ferreira <3dimentionar@gmail.com>
**/

import Reader from './reader';
import Context from '../annotation/context';

/**
*	Class Es5Reader
*	@namespace com.boneyard.annotation.reader
*	@class com.boneyard.annotation.reader.Es5Reader
*	@extends com.boneyard.annotation.reader.Reader
*
*	@requires com.boneyard.annotation.reader.Reader
*	@requires com.boneyard.annotation.engine.annotation.Context
**/
class Es5Reader extends Reader {

	/**
	*	Constructor
	*	@constructor
	*	@param [attrs] {Object} attributes
	*	@return com.boneyard.annotation.reader.Es5Reader
	**/
	constructor(...args) {
		return super(...args);
	}

	/**
	*	Evaluates token to determine the annotation contexts
	*	@public
	*	@override
	*	@method context
	*	@param token {String} token to be analyzed
	*	@return com.boneyard.annotation.support.Annotation
	**/
	onContext(token) {
		super.onContext(token);
		//Array.from(this.annotations.pop()
		return this;
	}

	/**
	*	Resolves context resolution
	*	@public
	*	@override
	*	@method resolve
	*	@param token {String} token to evaluate
	*	@return com.boneyard.annotation.support.Es5Reader
	**/
	resolve(token) {
		super.resolve(token);
		// TODO: Assign new context to the annotations
		return this;
	}

	/**
	*	Returns true if token is on module declaration
	*	@public
	*	@method onModule
	*	@param token {String} token to evaluate
	*	@return Boolean
	**/
	onModule(token) {
		return Context.MODULE.test(token);
	}

	/**
	*	Returns true if token is on module declaration
	*	@public
	*	@method onModule
	*	@param token {String} token to evaluate
	*	@return Boolean
	**/
	onClass(token) {
		return _.some(_.invoke(Context.CLASS, 'test', token));
	}

	/**
	*	Returns true if token is on module declaration
	*	@public
	*	@method onModule
	*	@param token {String} token to evaluate
	*	@return Boolean
	**/
	onConstructor(token) {
		return Context.CONSTRUCTOR.test(token);
	}

	/**
	*	Returns true if token is on module declaration
	*	@public
	*	@method onModule
	*	@param token {String} token to evaluate
	*	@return Boolean
	**/
	onField(token) {
		return Context.FIELD.test(token);
	}

	/**
	*	Annotation Contexts for this Reader
	*	@static
	*	@property Context
	*	@type Object
	**/
	static get Context() {
		return {
			MODULE: /^define/i,
			CLASS: [
				/^\s*(var\s+\w+|(?!var\b)\w+)\s*=\s*function\s*\(.*\)\s*{/i, // > <v> = function() {
				/^\s*return(.*)\s+function\s*\(.*\)\s*{/i, // > return function() {
				/^\s*function\s+.+\s*{$/i // > function <v>() {
			],
			CONSTRUCTOR: /^constructor:/i,
			FIELD: /^\w+\:\s*(?!function\b)\w+,$/i
		};
	}

}

export default Es5Reader;
