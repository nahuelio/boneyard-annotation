/**
*	@module com.boneyard.annotation.support
*	@author Patricio Ferreira <3dimentionar@gmail.com>
**/

import Annotation from '../engine/annotation/annotation';

/**
*	Class Action
*	@namespace com.boneyard.annotation.support
*	@class com.boneyard.annotation.support.Action
*	@extends com.boneyard.annotation.engine.annotation.Annotation
*
*	@requires com.boneyard.annotation.engine.annotation.Annotation
**/
class Action extends Annotation {

	/**
	*	Constructor
	*	@constructor
	*	@param [attrs] {Object} attributes
	*	@return com.boneyard.annotation.support.Action
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
		return 'Action';
	}

	/**
	*	Retrieves list of context in which this annotation should be found
	*	@static
	*	@property inContext
	*	@type Array
	**/
	static get inContext() {
		return ['__class', '__method'];
	}

}

export default Action;
