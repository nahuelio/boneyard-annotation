/**
*	@module com.boneyard.annotation.engine.ast
*	@author Patricio Ferreira <3dimentionar@gmail.com>
**/

import _ from 'underscore';
import _s from 'underscore.string';
import {EventEmitter} from 'events';

/**
*	Class ASTParameter
*	@namespace com.boneyard.annotation.engine.ast
*	@class com.boneyard.annotation.engine.ast.ASTParameter
*	@extends events.EventEmitter
*
*	@requires underscore
*	@requires underscore.string
*	@requires events.EventEmitter
**/
class ASTParameter extends EventEmitter {

	/**
	*	@constructor
	*	@param name {String} parameter name
	*	@param defaultValue {Object} parameter defaultValue
	*	@param method {com.boneyard.annotation.engine.ast.ASTMethod} parameter method
	*	@return com.boneyard.annotation.engine.ast.ASTParameter
	**/
	constructor(name, defaultValue, method) {
		super();
		this._name = name;
		this._default = defaultValue;
		this._method = method;
		return this;
	}

	/**
	*	Retrieves name
	*	@public
	*	@property name
	*	@type String
	**/
	get name() {
		return this._name;
	}

	/**
	*	Retrieves default
	*	@public
	*	@property default
	*	@type Object
	**/
	get default() {
		return this._default;
	}

	/**
	*	Retrieves method
	*	@public
	*	@property method
	*	@type com.boneyard.annotation.engine.ast.ASTMethod
	**/
	get method() {
		return this._method;
	}

}

export default ASTParameter;
