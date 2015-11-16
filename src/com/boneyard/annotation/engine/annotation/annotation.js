/**
*	@module com.boneyard.annotation.support
*	@author Patricio Ferreira <3dimentionar@gmail.com>
**/

import _ from 'underscore';
import _s from 'underscore.string';
import {EventEmitter} from 'events';
import Context from './context';
import '../../util/mixins';

/**
*	Class Annotation
*	@namespace com.boneyard.annotation.support
*	@class com.boneyard.annotation.support.Annotation
*	@extends events.EventEmitter
*
*	@requires underscore
*	@requires underscore.string
*	@requires events.EventEmitter
*	@requires com.boneyard.annotation.support.Context
*	@requires com.boneyard.annotation.util.mixins
**/
class Annotation extends EventEmitter {

	/**
	*	Constructor
	*	@constructor
	*	@param [parameters] {Object} annotation's parameters.
	*	@return com.boneyard.annotation.support.Annotation
	**/
	constructor(parameters = {}) {
		super();
		return _.extend(this, parameters);
	}

	/**
	*	Retrieves annotation name from a given expression
	*	@static
	*	@method metadata
	*	@param expr {String} expression to evaluate
	*	@return String
	**/
	static metadata(expr) {
		return _.extend({ name: Annotation.get(expr).toLowerCase(), token: expr }, Annotation.parameters(expr));
	}

	/**
	*	Retrieves annotation name from a given expression
	*	@static
	*	@method get
	*	@param expr {String} expression to evaluate
	*	@return String
	**/
	static get(expr) {
		if(!Annotation.regExp.test(expr)) return null;
		let token = _.clean(expr), end = token.indexOf('(');
		return token.substring(token.indexOf(Annotation.Symbol) + 1, (end !== -1) ? end : token.length);
	}

	/**
	*	Retrieves annotation parameters from a given expression if any exists
	*	@static
	*	@method parameters
	*	@param expr {String} expression to evaluate
	*	@return Object
	**/
	static parameters(expr) {
		if(!Annotation.regExp.test(expr) || expr.indexOf('(') === -1) return {};
		let token = _.clean(expr), ps = token.substring(token.indexOf('(') + 1, token.indexOf(')'));
		return eval('[' + ps + ']')[0];
	}

	/**
	*	Retrieves core regular expression that identifies the presence of an annotation declaration
	*	@static
	*	@property regExp
	*	@type RegExp
	**/
	static get regExp() {
		return new RegExp(("(\\*|\\/\\/)+\\s\*" + Annotation.Symbol), 'gi');
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

	/**
	*	Class Name
	*	@static
	*	@property NAME
	*	@type String
	**/
	static get NAME() {
		return 'Annotation';
	}

}

export default Annotation;
