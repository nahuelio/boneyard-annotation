/**
*	Supported Annotations module
*	@module com.spinal.annotation.support.class
*	@author Patricio Ferreira <3dimentionar@gmail.com>
**/

import Annotation from '../annotation';

/**
*	Class Bone
*	@namespace com.spinal.annotation.support.class
*	@class com.spinal.annotation.support.class.Bone
*	@extends com.spinal.annotation.support.Annotation
*
*	@requires com.spinal.annotation.support.Annotation
**/
class Bone extends Annotation {

	/**
	*	Constructor
	*	@constructor
	*	@param [attrs] {Object} attributes
	*	@return com.spinal.annotation.support.class.Bone
	**/
	constructor(attrs = {}) {
		super(attrs);
		return this;
	}

}

export default Bone;
