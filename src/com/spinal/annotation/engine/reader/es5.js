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

}

export default Es5Reader;
