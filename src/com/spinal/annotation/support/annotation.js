/**
*	Supported Annotations module
*	@module com.spinal.annotation.support
*	@author Patricio Ferreira <3dimentionar@gmail.com>
**/

import _ from 'underscore';
import {EventEmitter} from 'events';
import Context from './context';

/**
*	Class Annotation
*	@namespace com.spinal.annotation.support
*	@class com.spinal.annotation.support.Annotation
*	@extends events.EventEmitter
*
*	@requires underscore
*	@requires events.EventEmitter
*	@requires com.spinal.annotation.support.Context
**/
class Annotation extends EventEmitter {

	/**
	*	Constructor
	*	@constructor
	*	@param [parameters] {Object} annotation's parameters.
	*	@param [context] {com.spinal.annotation.support.Context}
	*		context in which annotation may perform operation into.
	*	@return com.spinal.annotation.support.Annotation
	**/
	constructor(parameters = {}, context = Context.new()) {
		super();
		this.context = context;
		return _.extend(this, parameters);
	}

	/**
	*	Symbol
	*	@static
	*	@property Symbol
	*	@type String
	**/
	static get Symbol() {
		return '@';
	}

}

export default Annotation;
