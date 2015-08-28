/**
*	Read Tools module
*	@module com.spinal.annotation.reader
*	@author Patricio Ferreira <3dimentionar@gmail.com>
**/

import Reader from './reader';

/**
*	Class Es5Reader
*	@namespace com.spinal.annotation.reader
*	@class com.spinal.annotation.reader.Es5Reader
*	@extends com.spinal.annotation.reader.Annotation
*
*	@requires com.spinal.annotation.reader.Annotation
**/
class Es5Reader extends Reader {

	/**
	*	Constructor
	*	@constructor
	*	@param [attrs] {Object} attributes
	*	@return com.spinal.annotation.reader.Es5Reader
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
	*	@return com.spinal.annotation.support.Context
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
	static get Context() {
		return {
			CLASS: [`var ${name} = function`, `function ${name}`],
			METHOD: [`${name}()`, `${name}: function`],
			PROPERTY: `${name}:`
		};
	}

}

export default Es5Reader;
