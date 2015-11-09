/**
*	@module com.boneyard.annotation.reader
*	@author Patricio Ferreira <3dimentionar@gmail.com>
**/

import Reader from './reader';

/**
*	Class Es5Reader
*	@namespace com.boneyard.annotation.reader
*	@class com.boneyard.annotation.reader.Es5Reader
*	@extends com.boneyard.annotation.reader.Annotation
*
*	@requires com.boneyard.annotation.reader.Annotation
**/
class Es5Reader extends Reader {

	/**
	*	Constructor
	*	@constructor
	*	@param [attrs] {Object} attributes
	*	@return com.boneyard.annotation.reader.Es5Reader
	**/
	constructor(attrs = {}) {
		super(attrs);
		return this;
	}

	/**
	*	Retrieves annotation context and stores a pointer to the specific position in
	*	injections may ocurr later on.
	*	@public
	*	@override
	*	@method getAnnotationContext
	*	@param token {String} token reference
	*	@return com.boneyard.annotation.support.Context
	**/
	getAnnotationContext(token) {
		// TODO: Specific for this Reader
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
