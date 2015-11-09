/**
*	@module com.boneyard.annotation.support.spec
*	@author Patricio Ferreira <3dimentionar@gmail.com>
**/

import Annotation from '../annotation';

/**
*	Class Scan
*	@namespace com.boneyard.annotation.support.spec
*	@class com.boneyard.annotation.support.spec.Scan
*	@extends com.boneyard.annotation.support.Annotation
*
*	@requires com.boneyard.annotation.support.Annotation
**/
class Scan extends Annotation {

	/**
	*	Constructor
	*	@constructor
	*	@param [attrs] {Object} attributes
	*	@return com.boneyard.annotation.support.spec.Scan
	**/
	constructor(attrs = {}) {
		super(attrs);
		return this;
	}

}

export default Scan;
