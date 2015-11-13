/**
*	@module com.boneyard.annotation.support.spec
*	@author Patricio Ferreira <3dimentionar@gmail.com>
**/

import Annotation from '../annotation';

/**
*	Class Spec
*	@namespace com.boneyard.annotation.support.spec
*	@class com.boneyard.annotation.support.spec.Spec
*	@extends com.boneyard.annotation.support.Annotation
*
*	@requires com.boneyard.annotation.support.Annotation
**/
class Spec extends Annotation {

	/**
	*	Constructor
	*	@constructor
	*	@param [attrs] {Object} attributes
	*	@return com.boneyard.annotation.support.spec.Spec
	**/
	constructor(attrs = {}) {
		super(attrs);
		return this;
	}

}

export default Spec;
