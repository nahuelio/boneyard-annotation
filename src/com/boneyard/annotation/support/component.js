/**
*	@module com.boneyard.annotation.support
*	@author Patricio Ferreira <3dimentionar@gmail.com>
**/
import Bone from './bone';

/**
*	Class Component
*	@namespace com.boneyard.annotation.support
*	@class com.boneyard.annotation.support.Component
*	@extends com.boneyard.annotation.support.Bone
*
*	@requires com.boneyard.annotation.support.Bone
**/
class Component extends Bone {

	/**
	*	Constructor
	*	@constructor
	*	@param [...attrs] {Object} constructor parameters
	*	@return com.boneyard.annotation.support.Component
	**/
	constructor(...attrs) {
		return super(...attrs);
	}

	/**
	*	Resolves bone module path
	*	@public
	*	@override
	*	@property module
	*	@type String
	**/
	get path() {
		return this.params.path;
	}

	/**
	*	JSON serialization strategy
	*	@public
	*	@override
	*	@method serialize
	*	@return Object
	**/
	serialize() {
		// TODO
		return {};
	}

	/**
	*	Class Name
	*	@static
	*	@property NAME
	*	@type String
	**/
	static get NAME() {
		return 'Component';
	}

}

export default Component;
