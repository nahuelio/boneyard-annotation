/**
*	@module com.boneyard.annotation.engine.ast
*	@author Patricio Ferreira <3dimentionar@gmail.com>
**/

import _ from 'underscore';
import _s from 'underscore.string';
import {EventEmitter} from 'events';

/**
*	Class ASTElement
*	@namespace com.boneyard.annotation.engine.ast
*	@class com.boneyard.annotation.engine.ast.ASTElement
*	@extends events.EventEmitter
*
*	@requires underscore
*	@requires underscore.string
*	@requires events.EventEmitter
**/
class ASTElement extends EventEmitter {

	/**
	*	@constructor
	*	@param [...args] {Object} constructor arguments
	*	@return com.boneyard.annotation.engine.ast.ASTElement
	**/
	constructor(...args) {
		super();
		this.asset = (args.length > 0) ? args[0].asset : null;
		return this;
	}

	/**
	*	Accepts Visitor
	*	@public
	*	@throws Error
	*	@method accept
	*	@param visitor {com.boneyard.annotation.engine.reader.idiom.Syntax} Syntax Visitor
	*	@return com.boneyard.annotation.engine.ast.ASTElement
	**/
	accept(visitor) {
		if(!visitor || !visitor.query || !visitor.read)
			throw new Error(`${this.toString()} has not received visitor idiom element.`);
		return visitor.query();
	}

	/**
	*	Get Asset in which this element was found
	*	@public
	*	@property asset
	*	@type Object
	**/
	get asset() {
		return this._asset;
	}

	/**
	*	Set Asset in which this element was found
	*	@public
	*	@property asset
	*	@type Object
	**/
	set asset(asset) {
		this._asset = asset;
	}

	/**
	*	Default AST Element serialization strategy.
	*	@public
	*	@method serialize
	*	@return com.boneyard.annotation.engine.ast.ASTElement
	**/
	serialize() {
		return this;
	}

	/**
	*	Default AST Element deserialization strategy
	*	@public
	*	@method deserialize
	*	@return Object
	**/
	deserialize() {
		return { type: this.constructor.NAME };
	}

	/**
	*	Return a string Representation of an instance of this class.
	*	@public
	*	@override
	*	@method toString
	*	@return String
	**/
	toString() {
		return `[${this.constructor.NAME}]`;
	}

	/**
	*	@static
	*	@property NAME
	*	@type String
	**/
	static get NAME() {
		return 'ASTElement';
	}

}

export default ASTElement;
