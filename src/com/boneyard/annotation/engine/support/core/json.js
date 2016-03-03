/**
*	@module com.boneyard.annotation.engine.support.core
*	@author Patricio Ferreira <3dimentionar@gmail.com>
**/

import Bone from './bone';

/**
*	Class Json
*	@namespace com.boneyard.annotation.engine.support.core
*	@class com.boneyard.annotation.engine.support.core.Json
*	@extends com.boneyard.annotation.engine.support.core.Bone
*
*	@requires com.boneyard.annotation.engine.support.core.Bone
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
