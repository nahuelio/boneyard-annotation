/**
*	@module com.boneyard.annotation.reader
*	@author Patricio Ferreira <3dimentionar@gmail.com>
**/

import Reader from './reader';

/**
*	Class Es6Reader
*	@namespace com.boneyard.annotation.reader
*	@class com.boneyard.annotation.reader.Es6Reader
*	@extends com.boneyard.annotation.reader.Annotation
*
*	@requires com.boneyard.annotation.reader.Annotation
**/
class Es6Reader extends Reader {

	/**
	*	Constructor
	*	@constructor
	*	@param [...args] {Arguments} constructor arguments
	*	@return com.boneyard.annotation.reader.Es6Reader
	**/
	constructor(...args) {
		super(...args);
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
		// TODO: Implement for ES6
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
		// TODO: Implement for ES6
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
			CLASS: 'class <%= name %>',
			METHOD: '<%= name %>()',
			PROPERTY: 'get <%= name %>()'
		};
	}

}

export default Es6Reader;
