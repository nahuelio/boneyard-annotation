/**
*	Annotation Autowired
*	@module com.spinal.annotation.support
*	@author Patricio Ferreira <3dimentionar@gmail.com>
**/

import {Annotation, Target} from 'violin-annotations';

/**
*	Class Autowired
*	@namespace com.spinal.annotation.support
*	@class com.spinal.annotation.support.Autowired
*	@extends Annotation
*
*	@requires violin-annotations.Annnotation
*	@requires violin-annotations.Target
**/
export default class Autowired extends Annotation {

	/**
	*	@constructor
	*	@param [attrs] {Object} attributes
	*	@return com.spinal.annotation.support.Autowired
	**/
	constructor(attrs = {}) {
		return super(attrs);
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
		return 'autowired';
	}

}
