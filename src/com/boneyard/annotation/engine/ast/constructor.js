/**
*	@module com.boneyard.annotation.engine.ast
*	@author Patricio Ferreira <3dimentionar@gmail.com>
**/

import _ from 'underscore';
import _s from 'underscore.string';
import ASTMethod from './method';

/**
*	Class ASTConstructor
*	@namespace com.boneyard.annotation.engine.ast
*	@class com.boneyard.annotation.engine.ast.ASTConstructor
*	@extends com.boneyard.annotation.engine.ast.ASTMethod
*
*	@requires underscore
*	@requires underscore.string
*	@requires com.boneyard.annotation.engine.ast.ASTMethod
**/
class ASTConstructor extends ASTMethod {

	/**
	*	@constructor
	*	@param ...args {Object} constructor arguments
	*	@return com.boneyard.annotation.engine.ast.ASTConstructor
	**/
	constructor(...args) {
		return super(...args);
	}

	/**
	*	@static
	*	@property NAME
	*	@type String
	**/
	static NAME() {
		return 'ASTConstructor';
	}

}

export default ASTConstructor;
