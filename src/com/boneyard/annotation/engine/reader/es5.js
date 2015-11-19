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
	*	Evaluates token to determine the context of the last annotation matched
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
	*	Annotation Contexts for this Reader
	*	@static
	*	@property Context
	*	@type Object
	**/
	static get Contexts() {
		return {
			CLASS: ['var <%= name %> = function()', 'function <%= name %>()'],
			METHOD: ['<%= name %>()', '<%= name %>: function()'],
			PROPERTY: '<%= name %>:'
		};
	}

}

export default Es5Reader;
