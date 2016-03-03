/**
*	@module com.boneyard.annotation.engine.ast
*	@author Patricio Ferreira <3dimentionar@gmail.com>
**/

import _ from 'underscore';
import _s from 'underscore.string';
import ASTMetadata from './metadata';

/**
*	Class ASTClass
*	@namespace com.boneyard.annotation.engine.ast
*	@class com.boneyard.annotation.engine.ast.ASTClass
*	@extends com.boneyard.annotation.engine.ast.ASTMetadata
*
*	@requires underscore
*	@requires underscore.string
*	@requires com.boneyard.annotation.engine.ast.ASTMetadata
**/
class ASTClass extends ASTMetadata {

	/**
	*	@constructor
	*	@param [attrs] {Object} constructor attributes
	*	@return com.boneyard.annotation.engine.ast.ASTClass
	**/
	constructor(attrs = {}) {
		super();
		return this;
	}

	/**
	*	Returns true is the class was inherited from a super class, otherwise returns false
	*	@public
	*	@method isInherited
	*	@return Boolean
	**/
	isInherited() {
		return _.defined(this.superClass);
	}

	/**
	*	Retrieve class name
	*	@public
	*	@property name
	*	@type String
	**/
	get name() {
		return this._name;
	}

	/**
	*	Retrieve SuperClass
	*	@public
	*	@property superClass
	*	@type com.boneyard.annotation.engine.ast.ASTClass
	**/
	get superClass() {
		return this._superClass;
	}

	/**
	*	Retrieve class constructor
	*	@public
	*	@property construct
	*	@type com.boneyard.annotation.engine.ast.ASTConstructor
	**/
	get construct() {
		return this._constructor;
	}

	/**
	*	Retrieve class properties
	*	@public
	*	@property properties
	*	@type Array
	**/
	get properties() {
		return this._properties;
	}

	/**
	*	Retrieve class methods
	*	@public
	*	@property methods
	*	@type Array
	**/
	get methods() {
		return this._methods;
	}

}

export default ASTClass;
