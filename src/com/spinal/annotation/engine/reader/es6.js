/**
*	Read Tools module
*	@module com.spinal.annotation.reader
*	@author Patricio Ferreira <3dimentionar@gmail.com>
**/

import Reader from 'reader';

/**
*	Class Es6Reader
*	@namespace com.spinal.annotation.reader
*	@class com.spinal.annotation.reader.Es6Reader
*	@extends com.spinal.annotation.reader.Annotation
*
*	@requires com.spinal.annotation.reader.Annotation
**/
class Es6Reader extends Reader {

	/**
	*	Constructor
	*	@constructor
	*	@param [attrs] {Object} attributes
	*	@return com.spinal.annotation.reader.Es6Reader
	**/
	constructor(attrs = {}) {
		super(attrs);
		return this;
	}

}

export default Es6Reader;
