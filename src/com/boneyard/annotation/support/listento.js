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
	*	Retrieves list of context in which this annotation should be found
	*	@static
	*	@property contexts
	*	@type Array
	**/
	get contexts() {
		return ['__class', '__method'];
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

}

export default ListenTo;
