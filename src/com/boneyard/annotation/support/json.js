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
	*	Serialization
	*	@public
	*	@override
	*	@method serialize
	*	@return Object
	**/
	serialize() {
		return { [this.params.id]: { $module: this.module, $params: {} } };
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
