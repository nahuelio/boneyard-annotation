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
	*	@param [attrs] {Object} attributes
	*	@return com.boneyard.annotation.reader.Es6Reader
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
			CLASS: 'class <%= name %>',
			METHOD: '<%= name %>()',
			PROPERTY: 'get <%= name %>()'
		};
	}

}

export default Es6Reader;