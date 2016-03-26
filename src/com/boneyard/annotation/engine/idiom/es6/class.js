/**
*	@module com.boneyard.annotation.engine.idiom.es6
*	@author Patricio Ferreira <3dimentionar@gmail.com>
**/

import Syntax from './syntax';

/**
*	Class Es6Class
*	@namespace com.boneyard.annotation.engine.idiom.es6
*	@class com.boneyard.annotation.engine.idiom.es6.Es6Class
*	@extends com.boneyard.annotation.engine.idiom.Syntax
*
*	@requires com.boneyard.annotation.engine.idiom.Syntax
**/
class Es6Class extends Syntax {

	/**
	*	Query Visit Strategy
	*	@public
	*	@override
	*	@method query
	*	@param clazz {com.boneyard.annotation.engine.ast.ASTClass} AST class
	*	@return com.boneyard.annotation.engine.ast.ASTClass
	**/
	query(clazz) {
		super.query(clazz);
		// TODO
		return clazz;
	}

	/**
	*	Read Visit Strategy
	*	@public
	*	@override
	*	@method read
	*	@return com.boneyard.annotation.engine.idiom.es6.Es6Class
	**/
	read() {
		// TODO
		return this;
	}

}

export default Es6Class;
