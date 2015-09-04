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
	*	@return com.spinal.annotation.support.Annotation
	**/
	constructor(parameters = {}) {
		super();
		this.context = null;
		return _.extend(this, parameters);
	}

	/**
	*	Retrieves annotation name from a given expression
	*	@static
	*	@method get
	*	@param expr {String} expression to evaluate
	*	@return String
	**/
	static get(expr = "") {
		let end = (expr.indexOf('(') !== -1) ? expr.indexOf('(') : expr.length;
		return expr.substring(expr.indexOf(Annotation.Symbol) + 1, end);
	}

	/**
	*	Retrieves annotation parameters from a given expression if any exists
	*	@static
	*	@method get
	*	@param expr {String} expression to evaluate
	*	@return String
	**/
	static parameters(expr) {
		// TODO: Implement
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
