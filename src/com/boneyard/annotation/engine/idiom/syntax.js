/**
*	@module com.boneyard.annotation.engine.reader.idiom
*	@author Patricio Ferreira <3dimentionar@gmail.com>
**/

import {resolve} from 'path';
import {EventEmitter} from 'events';
import _ from 'underscore';

/**
*	Class Syntax
*	@namespace com.boneyard.annotation.engine.reader.idiom
*	@class com.boneyard.annotation.engine.reader.idiom.Syntax
*	@extends events.EventEmitter
*
*	@requires path
*	@requires events.EventEmitter
*	@requires underscore
**/
class Syntax extends EventEmitter {

	/**
	*	@constructor
	*	@param element {com.boneyard.annotation.engine.ast.ASTElement} ast element
	*	@param [node] {Object} current ast node
	*	@return com.boneyard.annotation.engine.reader.idiom.Syntax
	**/
	constructor(element, node) {
		super();
		this.element = element;
		return this.parse(node);
	}

	/**
	*	Default parse strategy will take a given ast node to work as a context for traversing the tree
	*	and query the ast.
	*	@public
	*	@throws Error
	*	@method parse
	*	@param [node] {Object} current ast node
	*	@return com.boneyard.annotation.engine.reader.idiom.Syntax
	**/
	parse(node) {
		if(!node)
			throw new Error(`${this.toString()} parse method requires a json node context in order to query the ast`);
		this.element.node = node;
		return this;
	}

	/**
	*	Get AST Element
	*	@public
	*	@property element
	*	@type com.boneyard.annotation.engine.ast.ASTElement
	**/
	get element() {
		return this._element;
	}

	/**
	*	Set AST Element
	*	@public
	*	@property element
	*	@type com.boneyard.annotation.engine.ast.ASTElement
	**/
	set element(e) {
		this._element = e;
	}

	/**
	*	Retrieve Esprima default options
	*	@public
	*	@property options
	*	@type Object
	**/
	get options() {
		return {
			sourceType: 'module',
			tolerant: false,
			attachComments: true
		};
	}

	/**
	*	Return a string Representation of an instance of this class.
	*	@public
	*	@override
	*	@method toString
	*	@return String
	**/
	toString() {
		return this.constructor.NAME;
	}

	/**
	*	@static
	*	@property NAME
	*	@type String
	**/
	static NAME() {
		return 'Syntax';
	}

	/**
	*	Static Constructor
	*	@static
	*	@method new
	*	@param [...args] {Object} constructor parameters
	*	@return com.boneyard.annotation.engine.reader.idiom.Syntax
	**/
	static new(...args) {
		return new this(...args);
	}

	/**
	*	Get Configuration Settings
	*	@static
	*	@property settings
	*	@type Object
	**/
	static get settings() {
		return this._settings;
	}

	/**
	*	Set Configuration Settings
	*	@static
	*	@property settings
	*	@type Object
	**/
	static set settings(settings) {
		this._settings = settings;
	}

}

export default Syntax;
