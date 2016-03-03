/**
*	@module com.boneyard.annotation.engine.support.core
*	@author Patricio Ferreira <3dimentionar@gmail.com>
**/

import Annotation from '../annotation';

/**
*	Class Ignore
*	@namespace com.boneyard.annotation.engine.support.core
*	@class com.boneyard.annotation.engine.support.core.Ignore
*	@extends com.boneyard.annotation.engine.support.Annotation
*
*	@requires com.boneyard.annotation.engine.support.Annotation
**/
class Ignore extends Annotation {

	/**
	*	Constructor
	*	@constructor
	*	@param [...attrs] {Object} constructor parameters
	*	@return com.boneyard.annotation.engine.support.core.Ignore
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
		return 'Ignore';
	}

}

export default Ignore;
