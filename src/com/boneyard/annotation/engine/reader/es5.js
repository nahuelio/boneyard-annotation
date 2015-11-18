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
	*	Evaluates token expression and decide which annotation will process the token
	*	@public
	*	@override
	*	@method onToken
	*	@param token {String} token to be analyzed
	*	@return com.boneyard.annotation.reader.Reader
	**/
	onToken(token) {
		// TODO: Implement for ES5
		return super.onToken(token);
	}

	/**
	*	Evaluates token to determine the context of the last annotation matched
	*	@public
	*	@method onContext
	*	@param token {String} token to be analyzed
	*	@return com.boneyard.annotation.support.Annotation
	**/
	onContext(token) {
		// TODO: Implement for ES5
		return super.onContext(token);
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
