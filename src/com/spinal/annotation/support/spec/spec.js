/**
*	Supported Annotations module
*	@module com.spinal.annotation.support.spec
*	@author Patricio Ferreira <3dimentionar@gmail.com>
**/

import Annotation from '../annotation';

/**
*	Class Spec
*	@namespace com.spinal.annotation.support.spec
*	@class com.spinal.annotation.support.spec.Spec
*	@extends com.spinal.annotation.support.Annotation
*
*	@requires com.spinal.annotation.support.Annotation
**/
class Spec extends Annotation {

	/**
	*	Constructor
	*	@constructor
	*	@param [attrs] {Object} attributes
	*	@return com.spinal.annotation.support.spec.Spec
	**/
	constructor(attrs = {}) {
		super(attrs);
		return this;
	}

}

export default Spec;
