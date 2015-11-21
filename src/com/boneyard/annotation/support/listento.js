/**
*	@module com.boneyard.annotation.support
*	@author Patricio Ferreira <3dimentionar@gmail.com>
**/

import Action from './action';

/**
*	Class ListenTo
*	@namespace com.boneyard.annotation.support
*	@class com.boneyard.annotation.support.ListenTo
*	@extends com.boneyard.annotation.support.Action
*
*	@requires com.boneyard.annotation.support.Action
**/
class ListenTo extends Action {

	/**
	*	Constructor
	*	@constructor
	*	@param [attrs] {Object} attributes
	*	@return com.boneyard.annotation.support.ListenTo
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
		return 'ListenTo';
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

export default ListenTo;
