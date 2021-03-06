/**
*	@module com.boneyard.annotation.engine.support
*	@author Patricio Ferreira <3dimentionar@gmail.com>
**/

import _ from 'underscore';
import _s from 'underscore.string';
import {EventEmitter} from 'events';
import '../../util/mixins';

/**
*	Class Annotation
*	@namespace com.boneyard.annotation.engine.support
*	@class com.boneyard.annotation.engine.support.Annotation
*	@extends events.EventEmitter
*
*	@requires underscore
*	@requires underscore.string
*	@requires events.EventEmitter
*	@requires com.boneyard.annotation.util.mixins
**/
class Annotation extends EventEmitter {

	/**
	*	Constructor
	*	@constructor
	*	@param [parameters] {Object} annotation's parameters.
	*	@return com.boneyard.annotation.engine.support.Annotation
	**/
	constructor(parameters = {}) {
		super();
		return _.extend(this, parameters);
	}

	/**
	*	Retrieves annotation name
	*	@public
	*	@property name
	*	@type String
	**/
	get name() {
		return this._name;
	}

	/**
	*	Retrieves annotation token
	*	@public
	*	@property token
	*	@type String
	**/
	get token() {
		return this._token;
	}

	/**
	*	Retrieves annotation params
	*	@public
	*	@property params
	*	@type Object
	**/
	get params() {
		return this._params;
	}

	/**
	*	Retrieves absolute filepath in which this annotation was found
	*	@public
	*	@property filepath
	*	@type String
	**/
	get filepath() {
		return this._filepath;
	}

	/**
	*	Retrieves Parser config associated on this annotation
	*	@public
	*	@property config
	*	@type Object
	**/
	get config() {
		return this._config;
	}

	/**
	*	Retrieves annotation ignored
	*	@public
	*	@property ignored
	*	@type Boolean
	**/
	get ignored() {
		return this._ignored;
	}

	/**
	*	Retrieves annotation context
	*	@public
	*	@property context
	*	@type com.boneyard.annotation.engine.annotation.Context
	**/
	get context() {
		return this._context;
	}

	/**
	*	Sets the annotation context
	*	@public
	*	@property context
	*	@type com.boneyard.annotation.engine.annotation.Context
	**/
	set context(context) {
		this._context = context;
	}

	/**
	*	Returns true if annotation has a context
	*	@public
	*	@method hasContext
	*	@return Boolean
	**/
	hasContext() {
		return !this.context;
	}

	/**
	*	Default JSON serialization strategy of this annotation
	*	@public
	*	@method serialize
	*	@return Object
	**/
	serialize() {
		return {};
	}

	/**
	*	Type to String
	*	@public
	*	@override
	*	@method toString
	*	@return String
	**/
	toString() {
		return this.constructor.NAME;
	}

	/**
	*	Retrieves annotation name from a given expression
	*	@static
	*	@method metadata
	*	@param expr {String} expression to evaluate
	*	@return String
	**/
	static metadata(expr) {
		let name = Annotation.get(expr), params = Annotation.parameters(expr);
		return (name) ? { _name: name, _token: expr, _params: params } : null;
	}

	/**
	*	Retrieves annotation name from a given expression
	*	@static
	*	@method get
	*	@param expr {String} expression to evaluate
	*	@return String
	**/
	static get(expr) {
		if(!Annotation.regExp.test(expr) || expr.indexOf('(') === -1) return null;
		let token = _.clean(expr);
		return _s.strRight(_s.strLeft(token, '('), '@');
	}

	/**
	*	Retrieves annotation parameters from a given expression if any exists
	*	@static
	*	@method parameters
	*	@param expr {String} expression to evaluate
	*	@return Object
	**/
	static parameters(expr) {
		if(!Annotation.regExp.test(expr) || expr.indexOf('(') === -1) return null;
		let token = _.clean(expr);
		return eval('[' + _s.strLeft(_s.strRight(token, '('), ')') + ']')[0];
	}

	/**
	*	Retrieves core regular expression that identifies the presence of an annotation declaration
	*	@static
	*	@property regExp
	*	@type RegExp
	**/
	static get regExp() {
		return new RegExp(("(\\*|\\/\\/|\\/\\*\\*)(\\s|\\w)*" + Annotation.Symbol + '\\w+'), 'gi');
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
