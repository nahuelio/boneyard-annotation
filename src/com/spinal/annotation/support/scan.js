/**
*	Annotation Scan
*	@module com.spinal.annotation.support
*	@author Patricio Ferreira <3dimentionar@gmail.com>
**/

import {Annotation, Target} from 'violin-annotations';

/**
*	Class Scan
*	@namespace com.spinal.annotation.support
*	@class com.spinal.annotation.support.Scan
*	@extends violin-annotations.Annotation
*
*	@requires violin-annotations.Annnotation
*	@requires violin-annotations.Target
**/
export default class Scan extends Annotation {

	/**
	*	@constructor
	*	@param [attrs] {Object} attributes
	*	@return com.spinal.annotation.support.Scan
	**/
	constructor(paths = []) {
		super();
		this.scanPaths = paths;
		return this;
	}

	/**
	*	Set paths
	*	@public
	*	@method paths
	*	@param paths {Array} paths to scan
	**/
	set paths(paths = []) {
		this.scanPaths = paths;
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
		return 'scan';
	}

}
