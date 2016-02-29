/**
*	@module com.boneyard.annotation.engine.ast
*	@author Patricio Ferreira <3dimentionar@gmail.com>
**/

import _ from 'underscore';
import _s from 'underscore.string';
import ASTMetadata from './metadata';

/**
*	Class ASTModule
*	@namespace com.boneyard.annotation.engine.ast
*	@class com.boneyard.annotation.engine.ast.ASTModule
*	@extends com.boneyard.annotation.engine.ast.ASTMetadata
*
*	@requires underscore
*	@requires underscore.string
*	@requires com.boneyard.annotation.engine.ast.ASTMetadata
**/
class ASTModule extends ASTMetadata {

	/**
	*	@constructor
	*	@return com.boneyard.annotation.engine.ast.ASTModule
	**/
	constructor() {
		super();
		return this;
	}

	/**
	*	Retrieve Imports
	*	@public
	*	@property imports
	*	@type Map
	**/
	get imports() {
		return this._imports;
	}

	/**
	*	Retrieve Exports
	*	@public
	*	@property exports
	*	@type Map
	**/
	get exports() {
		return this._exports;
	}

}

export default ASTModule;
