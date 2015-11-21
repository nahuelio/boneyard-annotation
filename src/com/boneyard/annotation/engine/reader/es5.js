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
	*	Retrieves a list of RegExps used to calculate module context
	*	@public
	*	@property __module
	*	@type Array
	**/
	get __module() {
		return [/^define/i];
	}

	/**
	*	Retrieves a list of RegExps used to calculate class context
	*	@public
	*	@property __module
	*	@type Array
	**/
	get __class() {
		return [
			/^\s*(var\s+\w+|(?!var\b)\w+)\s*=\s*function\s*\(.*\)\s*{/i, // > <v> = function() {
			/^\s*return(.*)\s+function\s*\(.*\)\s*{/i, // > return function() {
			/^\s*function\s+.+\s*{$/i // > function <v>() {
		];
	}

	/**
	*	Retrieves a list of RegExps used to calculate constructor context
	*	@public
	*	@property __module
	*	@type Array
	**/
	get __constructor() {
		return [/^constructor:/i];
	}

	/**
	*	Retrieves a list of RegExps used to calculate field context
	*	@public
	*	@property __module
	*	@type Array
	**/
	get __field() {
		return [/^\w+\:\s*(?!function\b)\w+,$/i];
	}

	/**
	*	Retrieves a list of RegExps used to calculate method context
	*	@public
	*	@property __module
	*	@type Array
	**/
	get __method() {
		return [/\todo/i];
	}

}

export default Es5Reader;
