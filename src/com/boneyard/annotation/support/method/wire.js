/**
*	@module com.boneyard.annotation.support.method
*	@author Patricio Ferreira <3dimentionar@gmail.com>
**/

import Annotation from '../annotation';

/**
*	Class Wire
*	@namespace com.boneyard.annotation.support.method
*	@class com.boneyard.annotation.support.method.Wire
*	@extends com.boneyard.annotation.support.Annotation
*
*	@requires com.boneyard.annotation.support.Annotation
**/
class Wire extends Annotation {

	/**
	*	Constructor
	*	@constructor
	*	@param [attrs] {Object} attributes
	*	@return com.boneyard.annotation.support.method.Wire
	**/
	constructor(parameters = {}, context) {
		return super(parameters, context);
	}

	/**
	*	Injects Dependency by using the context
	*	@public
	*	@method inject
	*	@return com.boneyard.annotation.support.method.Wire
	**/
	inject() {
		// TODO: Implement
	}

}

export default Wire;
