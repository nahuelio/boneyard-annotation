/**
*	Annotation Bone
*	@module com.spinal.annotation.support
*	@author Patricio Ferreira <3dimentionar@gmail.com>
**/

import {Annotation, Target} from 'violin-annotations';

/**
*	Class Bone
*	@namespace com.spinal.annotation.support
*	@class com.spinal.annotation.support.Bone
*	@extends violin-annotations.Annotation
*
*	@requires violin-annotations.Annnotation
*	@requires violin-annotations.Target
**/
export default class Bone extends Annotation {

	/**
	*	@constructor
	*	@param [attrs] {Object} attributes
	*	@return com.spinal.annotation.support.Bone
	**/
	constructor(attrs = {}) {
		return super(attrs);
	}

	/**
	*	Bone Id
	*	@public
	*	@property id
	*	@type String
	**/
	set id(id) {
		this.boneId = id;
	}

	/**
	*	Where this annotation can be found
	*	@static
	*	@override
	*	@method getTargets
	*	@return Array
	**/
	static getTargets() {
		return [Target.CLASS_ANNOTATION];
	}

	/**
	*	Annotation name
	*	@static
	*	@override
	*	@method getName
	*	@return String
	**/
	static getName() {
		return 'bone';
	}

}
