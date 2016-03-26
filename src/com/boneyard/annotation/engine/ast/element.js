/**
*	@module com.boneyard.annotation.engine.ast
*	@author Patricio Ferreira <3dimentionar@gmail.com>
**/

import _ from 'underscore';
import _s from 'underscore.string';
import  {EventEmitter} from 'events';

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
	*	@param [attrs] {Object} constructor attributes
	*	@return com.boneyard.annotation.engine.ast.ASTElement
	**/
	constructor(attrs = {}) {
		return super();
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
		return visitor.query(this);
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
		return `${[this.constructor.NAME]}`;
	}

	/**
	*	@static
	*	@property NAME
	*	@type String
	**/
	static NAME() {
		return 'ASTElement';
	}

}

export default ASTMetadata;
