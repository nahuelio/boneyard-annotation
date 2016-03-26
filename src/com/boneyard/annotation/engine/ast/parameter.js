/**
*	@module com.boneyard.annotation.engine.ast
*	@author Patricio Ferreira <3dimentionar@gmail.com>
**/

import _ from 'underscore';
import _s from 'underscore.string';
import ASTElement from './element';

/**
*	Class ASTParameter
*	@namespace com.boneyard.annotation.engine.ast
*	@class com.boneyard.annotation.engine.ast.ASTParameter
*	@extends com.boneyard.annotation.engine.ast.ASTElement
*
*	@requires underscore
*	@requires underscore.string
*	@requires com.boneyard.annotation.engine.ast.ASTElement
**/
class ASTParameter extends ASTElement {

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

	/**
	*	@static
	*	@property NAME
	*	@type String
	**/
	static NAME() {
		return 'ASTParameter';
	}

}

export default ASTParameter;
