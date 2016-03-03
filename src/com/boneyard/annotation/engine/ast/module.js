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
	*	@param [attrs] {Object} constructor attributes
	*	@return com.boneyard.annotation.engine.ast.ASTModule
	**/
	constructor(attrs = {}) {
		super();
		this._classes = new Map();
		this._imports = new Map();
		this._exports = new Map();
		return this.serialize(attrs.node);
	}

	/**
	*	Serialization strategy
	*	@public
	*	@override
	*	@param node {Object} ast module node
	*	@method serialize
	*	@return com.boneyard.annotation.engine.ast.ASTModule
	**/
	serialize(node) {
		console.log(node);
	}

	/**
	*	Deserialization strategy
	*	@public
	*	@override
	*	@method deserialize
	*	@return Object
	**/
	deserialize() {
		return _.extend(super.deserialize(), {});
	}

	/**
	*	Retrieve classes
	*	@public
	*	@property classes
	*	@type Map
	**/
	get classes() {
		return this._classes;
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

	/**
	*	Static Module Constructor
	*	@static
	*	@method parse
	*	@param node {Object} ast node
	*	@return com.boneyard.annotation.engine.ast.ASTModule
	**/
	static parse(node) {
		return new ASTModule({ node: node });
	}

}

export default ASTModule;
