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
		super(attrs);
		return this;
	}

	/**
	*	Sets bone id
	*	@public
	*	@property bone id
	*	@type String
	**/
	set bone(id) {
		this.boneId = id;
	}

	/**
	*	Sets Param Name
	*	@public
	*	@property name
	*	@type String
	**/
	set name(name) {
		this.paramName = name;
	}

	/**
	*	Sets Property Name
	*	@public
	*	@property property
	*	@type String
	**/
	set property(name) {
		this.propertyName = name;
	}

	/**
	*	Sets Method Name
	*	@public
	*	@property method name
	*	@type String
	**/
	set method(name) {
		this.methodName = name;
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
