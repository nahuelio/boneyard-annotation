/**
*	@module com.boneyard.annotation.engine.ast
*	@author Patricio Ferreira <3dimentionar@gmail.com>
**/

import _ from 'underscore';
import _s from 'underscore.string';
import q from '../../util/query';
import ASTElement from './element';

/**
*	Class ASTModule
*	@namespace com.boneyard.annotation.engine.ast
*	@class com.boneyard.annotation.engine.ast.ASTModule
*	@extends com.boneyard.annotation.engine.ast.ASTElement
*
*	@requires underscore
*	@requires underscore.string
*	@requires com.boneyard.annotation.util.Query
*	@requires com.boneyard.annotation.engine.ast.ASTElement
**/
class ASTModule extends ASTElement {

	/**
	*	@constructor
	*	@param [attrs] {Object} constructor attributes
	*	@return com.boneyard.annotation.engine.ast.ASTModule
	**/
	constructor(...args) {
		super(...args);
		this._classes = new Map();
		this._imports = new Map();
		this._exports = new Map();
		return this;
	}

	/**
	*	Add Import
	*	@public
	*	@method addImport
	*	@param imp {Object} import statement
	*	@return com.boneyard.annotation.engine.ast.ASTModule
	**/
	addImport(imp) {
		if(!this.imports.has('')) {
			//this.imports
		}
		return this;
	}

	/**
	*	Remove Import
	*	@public
	*	@method removeImport
	*	@param imp {Object} import statement
	*	@return com.boneyard.annotation.engine.ast.ASTModule
	**/
	removeImport(imp) {
		if(this.imports.has('')) {
			//this.imports
		}
		return this;
	}

	/**
	*	Retrieves an import statement by predicate, if not found returns null
	*	@public
	*	@method findImport
	*	@param predicate {Function} predicate function
	*	@return com.boneyard.annotation.engine.ast.ASTModule
	**/
	findImport(predicate) {
		return _.find(this.imports.entries(), (k, v) => { return predicate(v, k); });
	}

	/**
	*	Serialization strategy
	*	TODO: Refactor This to use Syntax Idioms (es5, es6, jsx)
	*	@public
	*	@override
	*	@method serialize
	*	@return com.boneyard.annotation.engine.ast.ASTModule
	**/
	serialize() {
		// return this.onImport(q.match(':root :has(.type:val(?))', ['ImportDeclaration']))
		// 	.onClass(q.match(':root :has(.type:val(?))', ['ClassDeclaration']))
		// 	.onExport(q.match(':root :has(.type:expr(x^=?))', ['Export']));
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
	*	Default Import Declaration Handler
	*	@public
	*	@method onClass
	*	@param list {Array} import declarations
	*	@return com.boneyard.annotation.engine.ast.ASTModule
	**/
	onImport(list = []) {
		// list.forEach((m) =>
		return this;
	}

	/**
	*	Default Class Declaration Handler
	*	@public
	*	@method onClass
	*	@param list {Array} class declarations
	*	@return com.boneyard.annotation.engine.ast.ASTModule
	**/
	onClass(list = []) {
		//console.log('Classes >> ', list);
		return this;
	}

	/**
	*	Default Export Declaration Handler
	*	@public
	*	@method onExport
	*	@param list {Array} export declarations
	*	@return com.boneyard.annotation.engine.ast.ASTModule
	**/
	onExport(list = []) {
		//console.log('Exports >> ', list);
		return this;
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
	*	@static
	*	@property NAME
	*	@type String
	**/
	static NAME() {
		return 'ASTModule';
	}

}

export default ASTModule;
