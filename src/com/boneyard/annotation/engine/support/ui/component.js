/**
*	@module com.boneyard.annotation.engine.support.core
*	@author Patricio Ferreira <3dimentionar@gmail.com>
**/
import Bone from '../core/bone';

/**
*	Class Component
*	@namespace com.boneyard.annotation.engine.support.ui
*	@class com.boneyard.annotation.engine.support.ui.Component
*	@extends com.boneyard.annotation.engine.support.core.Bone
*
*	@requires com.boneyard.annotation.engine.support.core.Bone
**/
class Component extends Bone {

	/**
	*	Constructor
	*	@constructor
	*	@param [...attrs] {Object} constructor parameters
	*	@return com.boneyard.annotation.support.ui.Component
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
		return super.serialize();
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
