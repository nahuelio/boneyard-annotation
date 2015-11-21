/**
*	@module com.boneyard.annotation.support
*	@author Patricio Ferreira <3dimentionar@gmail.com>
**/

import Annotation from '../engine/annotation/annotation';

/**
*	Class Spec
*	@namespace com.boneyard.annotation.support
*	@class com.boneyard.annotation.support.Spec
*	@extends com.boneyard.annotation.engine.annotation.Annotation
*
*	@requires com.boneyard.annotation.engine.annotation.Annotation
**/
class Spec extends Annotation {

	/**
	*	Constructor
	*	@constructor
	*	@param [attrs] {Object} attributes
	*	@return com.boneyard.annotation.support.Spec
	**/
	constructor(attrs = {}) {
		super(attrs);
		return this;
	}

	/**
	*	Class Name
	*	@static
	*	@property NAME
	*	@type String
	**/
	static get NAME() {
		return 'Spec';
	}

	/**
	*	Retrieves list of context in which this annotation should be found
	*	@static
	*	@property inContext
	*	@type Array
	**/
	static get inContext() {
		return ['__class'];
	}

}

export default Spec;
