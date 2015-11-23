/**
*	@module com.boneyard.annotation.support
*	@author Patricio Ferreira <3dimentionar@gmail.com>
**/

import Bone from './bone';

/**
*	Class Json
*	@namespace com.boneyard.annotation.support
*	@class com.boneyard.annotation.support.Json
*	@extends com.boneyard.annotation.support.Bone
*
*	@requires com.boneyard.annotation.support.Bone
**/
class Json extends Bone {

	/**
	*	Constructor
	*	@constructor
	*	@param [attrs] {Object} attributes
	*	@return com.boneyard.annotation.support.Json
	**/
	constructor(attrs = {}) {
		super(attrs);
		return this;
	}

	/**
	*	Retrieves list of context in which this annotation should be found
	*	@public
	*	@property contexts
	*	@type Array
	**/
	get contexts() {
		return ['__class'];
	}

	/**
	*	Serialization
	*	@public
	*	@override
	*	@method serialize
	*	@return Object
	**/
	serialize() {
		return { [this.params.id]: { $module: this.module, json: true } };
	}

	/**
	*	Class Name
	*	@static
	*	@property NAME
	*	@type String
	**/
	static get NAME() {
		return 'Json';
	}

}

export default Json;
