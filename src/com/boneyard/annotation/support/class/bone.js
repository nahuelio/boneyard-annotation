/**
*	@module com.boneyard.annotation.support.class
*	@author Patricio Ferreira <3dimentionar@gmail.com>
**/

import Annotation from '../annotation';

/**
*	Class Bone
*	@namespace com.boneyard.annotation.support.class
*	@class com.boneyard.annotation.support.class.Bone
*	@extends com.boneyard.annotation.support.Annotation
*
*	@requires com.boneyard.annotation.support.Annotation
**/
class Bone extends Annotation {

	/**
	*	Constructor
	*	@constructor
	*	@param [attrs] {Object} attributes
	*	@return com.boneyard.annotation.support.class.Bone
	**/
	constructor(attrs = {}) {
		super(attrs);
		return this;
	}

}

export default Bone;
