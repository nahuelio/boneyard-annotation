/**
*	@module com.boneyard.annotation.engine.idiom.es6
*	@author Patricio Ferreira <3dimentionar@gmail.com>
**/

import _ from 'underscore';
import Syntax from '../syntax';
import Clazz from './class';

/**
*	Class Es6Module
*	@namespace com.boneyard.annotation.engine.idiom.es6
*	@class com.boneyard.annotation.engine.idiom.es6.Es6Module
*	@extends com.boneyard.annotation.engine.idiom.Syntax
*
*	@requires underscore
*	@requires com.boneyard.annotation.engine.idiom.Syntax
*	@requires com.boneyard.annotation.engine.idiom.es6.Class
**/
class Es6Module extends Syntax {

	/**
	*	Query Visit Strategy
	*	@public
	*	@override
	*	@method query
	*	@return com.boneyard.annotation.engine.ast.Es6Module
	**/
	query() {
		super.query();
		return this;
	}

	/**
	*	Read Strategy Handler
	*	@public
	*	@method read
	*	@param ast {Object} query result reference
	*	@return com.boneyard.annotation.engine.ast.Es6Module
	**/
	read(ast) {
		return super.read(ast);
	}

	/**
	*	@static
	*	@property NAME
	*	@type String
	**/
	static get NAME() {
		return 'module';
	}

}

export default Es6Module;
