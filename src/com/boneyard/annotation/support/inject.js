/**
*	@module com.boneyard.annotation.support
*	@author Patricio Ferreira <3dimentionar@gmail.com>
**/
import Wire from './wire';

/**
*	Class Inject
*	@namespace com.boneyard.annotation.support
*	@class com.boneyard.annotation.support.Inject
*	@extends com.boneyard.annotation.support.Wire
*
*	@requires com.boneyard.annotation.support.Wire
**/
class Inject extends Wire {

	/**
	*	Constructor
	*	@constructor
	*	@param [attrs] {Object} attributes
	*	@return com.boneyard.annotation.support.Inject
	**/
	constructor(attrs = {}) {
		return super(attrs);
	}

	/**
	*	Class Name
	*	@static
	*	@property NAME
	*	@type String
	**/
	static get NAME() {
		return 'Inject';
	}

}

export default Inject;
