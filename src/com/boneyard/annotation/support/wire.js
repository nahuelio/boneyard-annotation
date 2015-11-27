/**
*	@module com.boneyard.annotation.support
*	@author Patricio Ferreira <3dimentionar@gmail.com>
**/

import Annotation from '../engine/annotation/annotation';

/**
*	Class Wire
*	@namespace com.boneyard.annotation.support
*	@class com.boneyard.annotation.support.Wire
*	@extends com.boneyard.annotation.engine.annotation.Annotation
*
*	@requires com.boneyard.annotation.engine.annotation.Annotation
**/
class Wire extends Annotation {

	/**
	*	Constructor
	*	@constructor
	*	@param [attrs] {Object} attributes
	*	@return com.boneyard.annotation.support.Wire
	**/
	constructor(attrs = {}) {
		return super(attrs);
	}

	/**
	*	Retrieves bone id
	*	@public
	*	@property id
	*	@type String
	**/
	get id() {
		return this.params.id;
	}

	/**
	*	Retrieves list of context in which this annotation should be found
	*	@public
	*	@property contexts
	*	@type Array
	**/
	get contexts() {
		return ['__constructor', '__field'];
	}

	/**
	*	Class Name
	*	@static
	*	@property NAME
	*	@type String
	**/
	static get NAME() {
		return 'Wire';
	}

}

export default Wire;
