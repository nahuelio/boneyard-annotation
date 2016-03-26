/**
*	@module com.boneyard.annotation.engine.ast
*	@author Patricio Ferreira <3dimentionar@gmail.com>
**/

import _ from 'underscore';
import _s from 'underscore.string';
import ASTElement from './element';

/**
*	Class ASTProperty
*	@namespace com.boneyard.annotation.engine.ast
*	@class com.boneyard.annotation.engine.ast.ASTProperty
*	@extends com.boneyard.annotation.engine.ast.ASTElement
*
*	@requires underscore
*	@requires underscore.string
*	@requires com.boneyard.annotation.engine.ast.ASTElement
**/
class ASTProperty extends ASTElement {

	/**
	*	@constructor
	*	@param [attrs] {Object} constructor attributes
	*	@return com.boneyard.annotation.engine.ast.ASTProperty
	**/
	constructor(name, value, clazz) {
		super();
		this._name = name;
		this._value = value;
		this._class = clazz;
		return this;
	}

	/**
	*	Retrieve name
	*	@public
	*	@property name
	*	@type String
	**/
	get name() {
		return this._name;
	}

	/**
	*	Retrieve value
	*	@public
	*	@property value
	*	@type Object
	**/
	get value() {
		return this._value;
	}

	/**
	*	Retrieve property class
	*	@public
	*	@property clazz
	*	@type com.boneyard.annotation.engine.ast.ASTClass
	**/
	get clazz() {
		return this._class;
	}

	/**
	*	@static
	*	@property NAME
	*	@type String
	**/
	static NAME() {
		return 'ASTProperty';
	}

}

export default ASTProperty;
