/**
*	@module com.boneyard.annotation.support
*	@author Patricio Ferreira <3dimentionar@gmail.com>
**/

import Bone from './bone';
import Context from '../engine/annotation/context';

/**
*	Class Json
*	@namespace com.boneyard.annotation.support
*	@class com.boneyard.annotation.support.Json
*	@extends com.boneyard.annotation.support.Bone
*
*	@requires com.boneyard.annotation.support.Bone
*	@requires com.boneyard.annotation.engine.annotation.Context
**/
class Json extends Bone {

	/**
	*	Constructor
	*	@constructor
	*	@param [...attrs] {Object} constructor parameters
	*	@return com.boneyard.annotation.support.Json
	**/
	constructor(...attrs) {
		return super(...attrs);
	}

	/**
	*	Retrieves list of context in which this annotation should be found
	*	@public
	*	@property contexts
	*	@type Array
	**/
	get contexts() {
		return [Context.TYPES.Class];
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
