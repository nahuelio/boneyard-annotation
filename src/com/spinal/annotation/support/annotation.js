/**
*	Supported Annotations module
*	@module com.spinal.annotation.support
*	@author Patricio Ferreira <3dimentionar@gmail.com>
**/

import {EventEmitter} from 'events';

/**
*	Class Annotation
*	@namespace com.spinal.annotation.support
*	@class com.spinal.annotation.support.Annotation
*	@extends events.EventEmitter
*
*	@requires events.EventEmitter
**/
class Annotation extends EventEmitter {

	/**
	*	@constructor
	*	@param [attrs] {Object} attributes
	*	@return
	**/
	constructor(attrs = {}) {
		super(attrs);
		return this;
	}

}

export default Annotation;
