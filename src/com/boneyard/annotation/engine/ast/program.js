/**
*	@module com.boneyard.annotation.engine.ast
*	@author Patricio Ferreira <3dimentionar@gmail.com>
**/

import _ from 'underscore';
import _s from 'underscore.string';
import {EventEmitter} from 'events';
import ASTModule from './module';

/**
*	Class ASTProgram
*	@namespace com.boneyard.annotation.engine.ast
*	@class com.boneyard.annotation.engine.ast.ASTProgram
*	@extends events.EventEmitter
*
*	@requires underscore
*	@requires underscore.string
*	@requires events.EventEmitter
*	@requires com.boneyard.annotation.engine.ast.ASTModule
**/
class ASTProgram extends EventEmitter {

	/**
	*	@constructor
	*	@return com.boneyard.annotation.engine.ast.ASTProgram
	**/
	constructor() {
		super();
		this.modules = new Map();
		return this;
	}

	/**
	*	Add a new module by a given key and ast node
	*	@public
	*	@method add
	*	@param key {String} module key
	*	@param m {com.boneyard.annotation.engine.ast.ASTModule} module to add
	*	@return com.boneyard.annotation.engine.ast.ASTProgram
	**/
	add(key, node) {
		if(!this.modules.has(key)) {
			this.modules.set(key, ASTModule.parse(node));
		}
		return this;
	}

	/**
	*	Remove an existing module
	*	@public
	*	@method remove
	*	@param m {com.boneyard.annotation.engine.ast.ASTModule} module to add
	*	@return com.boneyard.annotation.engine.ast.ASTProgram
	**/
	remove(m) {
		if(this.modules.has(m.filename)) {
			this.modules.delete(m.filename);
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

}

export default ASTProgram;
