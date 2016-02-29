/**
*	@module com.boneyard.annotation.engine.ast
*	@author Patricio Ferreira <3dimentionar@gmail.com>
**/

import _ from 'underscore';
import _s from 'underscore.string';
import ASTMetadata from './metadata';

/**
*	Class ASTMethod
*	@namespace com.boneyard.annotation.engine.ast
*	@class com.boneyard.annotation.engine.ast.ASTMethod
*	@extends com.boneyard.annotation.engine.ast.ASTMetadata
*
*	@requires underscore
*	@requires underscore.string
*	@requires com.boneyard.annotation.engine.ast.ASTMetadata
**/
class ASTMethod extends ASTMetadata {

	/**
	*	@constructor
	*	@param [attrs] {Object} constructor attributes
	*	@return com.boneyard.annotation.engine.ast.ASTMethod
	**/
	constructor(parameters, clazz) {
		super();
		this._parameters = parameters;
		this._class = clazz;
		return this;
	}

	/**
	*	Retrieve constructor parameters
	*	@public
	*	@property parameters
	*	@type Array
	**/
	get parameters() {
		return this._parameters;
	}

	/**
	*	Retrieve constructor class
	*	@public
	*	@property clazz
	*	@type com.boneyard.annotation.engine.ast.ASTClass
	**/
	get clazz() {
		return this._class;
	}

}

export default ASTMethod;
