/**
*	Supported Annotations module
*	@module com.spinal.annotation.support.method
*	@author Patricio Ferreira <3dimentionar@gmail.com>
**/

import Annotation from '../annotation';

/**
*	Class Wire
*	@namespace com.spinal.annotation.support.method
*	@class com.spinal.annotation.support.method.Wire
*	@extends com.spinal.annotation.support.Annotation
*
*	@requires com.spinal.annotation.support.Annotation
**/
class Wire extends Annotation {

	/**
	*	Constructor
	*	@constructor
	*	@param [attrs] {Object} attributes
	*	@return com.spinal.annotation.support.method.Wire
	**/
	constructor(parameters = {}, context) {
		return super(parameters, context);
	}

	/**
	*	Injects Dependency by using the context
	*	@public
	*	@method inject
	*	@return com.spinal.annotation.support.method.Wire
	**/
	inject() {
		// TODO: Implement
	}

}

export default Wire;
