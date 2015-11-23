/**
*	@module com.boneyard.annotation.support
*	@author Patricio Ferreira <3dimentionar@gmail.com>
**/

import Annotation from '../engine/annotation/annotation';

/**
*	Class Ignore
*	@namespace com.boneyard.annotation.support
*	@class com.boneyard.annotation.support.Ignore
*	@extends com.boneyard.annotation.engine.annotation.Annotation
*
*	@requires com.boneyard.annotation.engine.annotation.Annotation
**/
class Ignore extends Annotation {

	/**
	*	Constructor
	*	@constructor
	*	@param [attrs] {Object} attributes
	*	@return com.boneyard.annotation.support.Ignore
	**/
	constructor(attrs = {}) {
		super(attrs);
		return this;
	}

	/**
	*	Serialization
	*	@public
	*	@method serialize
	*	@return Object
	**/
	serialize() {
		return { [this.name]: { file: this.path } };
	}

	/**
	*	Retrieves list of context in which this annotation should be found
	*	@public
	*	@property contexts
	*	@type Array
	**/
	get contexts() {
		return ['__module'];
	}

	/**
	*	Class Name
	*	@static
	*	@property NAME
	*	@type String
	**/
	static get NAME() {
		return 'Ignore';
	}

}

export default Ignore;
