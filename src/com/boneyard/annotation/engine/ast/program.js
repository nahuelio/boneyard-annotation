/**
*	@module com.boneyard.annotation.engine.ast
*	@author Patricio Ferreira <3dimentionar@gmail.com>
**/

import _ from 'underscore';
import _s from 'underscore.string';
import ASTElement from './element';
import ASTModule from './module';

/**
*	Class ASTProgram
*	@namespace com.boneyard.annotation.engine.ast
*	@class com.boneyard.annotation.engine.ast.ASTProgram
*	@extends com.boneyard.annotation.engine.ast.ASTElement
*
*	@requires underscore
*	@requires underscore.string
*	@requires com.boneyard.annotation.engine.ast.ASTElement
*	@requires com.boneyard.annotation.engine.ast.ASTModule
**/
class ASTProgram extends ASTElement {

	/**
	*	@constructor
	*	@return com.boneyard.annotation.engine.ast.ASTProgram
	**/
	constructor(...args) {
		super(...args);
		this.modules = new Map();
		return this;
	}

	/**
	*	Add a new module
	*	@public
	*	@method add
	*	@param module {Object} ast module element
	*	@return com.boneyard.annotation.engine.ast.ASTProgram
	**/
	add(module) {
		if(!this.modules.has(module.asset.relativePath)) {
			this.modules.set(module.asset.relativePath, module);
		}
		return this;
	}

	/**
	*	Remove an existing module
	*	@public
	*	@method remove
	*	@param module {Object} ast module element
	*	@return com.boneyard.annotation.engine.ast.ASTProgram
	**/
	remove(module) {
		if(module && this.modules.has(module.asset.relativePath)) {
			this.modules.delete(module.asset.relativePath);
		}
		return this;
	}

	/**
	*	Retrieves a module by predicate, if not found returns null
	*	@public
	*	@method find
	*	@param predicate {Function} predicate function
	*	@return com.boneyard.annotation.engine.ast.ASTModule
	**/
	find(predicate) {
		return _.find(this.modules.entries(), (k, v) => { return predicate(v, k); });
	}

	/**
	*	Filter modules by predicate
	*	@public
	*	@method filter
	*	@param predicate {Function} predicate function
	*	@return Array
	**/
	filter(predicate) {
		return _.filter(this.modules.entries(), (k, v) => { return predicate(v, k); });
	}

	/**
	*	Set Modules
	*	@public
	*	@property modules
	*	@type Map
	**/
	set modules(modules) {
		this._modules = modules;
	}

	/**
	*	Retrieves Modules
	*	@public
	*	@property modules
	*	@type Map
	**/
	get modules() {
		return this._modules;
	}

	/**
	*	@static
	*	@property NAME
	*	@type String
	**/
	static NAME() {
		return 'ASTProgram';
	}

}

export default ASTProgram;
