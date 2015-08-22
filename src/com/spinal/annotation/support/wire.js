/**
*	Annotation Wire
*	@module com.spinal.annotation.support
*	@author Patricio Ferreira <3dimentionar@gmail.com>
**/

import {Annotation, Target} from 'violin-annotations';

/**
*	Class Wire
*	@namespace com.spinal.annotation.support
*	@class com.spinal.annotation.support.Wire
*	@extends Annotation
*
*	@requires violin-annotations.Annnotation
*	@requires violin-annotations.Target
**/
export default class Wire extends Annotation {

	/**
	*	@constructor
	*	@param [attrs] {Object} attributes
	*	@return com.spinal.annotation.support.Wire
	**/
	constructor(attrs = {}) {
		return super(attrs);
	}

	/**
	*	Reference to bone id
	*	@public
	*	@property id
	*	@type String
	**/
	get id() {
		return 'Something';
	}

	/**
	*	Where this annotation can be found
	*	@static
	*	@override
	*	@method getTargets
	*	@return Array
	**/
	static getTargets() {
		return [Target.PROPERTY_ANNOTATION, Target.METHOD_ANNOTATION];
	}

	/**
	*	Annotation name
	*	@static
	*	@override
	*	@method getName
	*	@return String
	**/
	static getName() {
		return 'wire';
	}

}
