/**
*	@module com.boneyard.annotation.engine.reader.idiom
*	@author Patricio Ferreira <3dimentionar@gmail.com>
**/

import {EventEmitter} from 'events';

/**
*	Class Syntax
*	@namespace com.boneyard.annotation.engine.reader.idiom
*	@class com.boneyard.annotation.engine.reader.idiom.Syntax
*	@extends events.EventEmitter
*
*	@requires evetns.EventEmitter
**/
class Syntax extends events.EventEmitter {

	/**
	*	@constructor
	*	@param ast {com.boneyard.annotation.engine.ast.ASTElement} AST Element
	*	@return com.boneyard.annotation.engine.reader.idiom.Syntax
	**/
	constructor(ast) {
		super();
		this.ast = ast;
		return this.source();
	}

	/**
	*	Default AST Sourcing Strategy
	*	@public
	*	@method source
	*	@return	com.boneyard.annotation.engine.reader.idiom.Syntax
	**/
	source() {
		return this;
	}

	/**
	*	Default AST Conversion Strategy
	*	@public
	*	@method convert
	*	@return	com.boneyard.annotation.engine.reader.idiom.Syntax
	**/
	convert() {
		return this;
	}

	/**
	*	Setter AST Element
	*	@public
	*	@property ast
	*	@type com.boneyard.annotation.engine.ast.ASTElement
	**/
	set ast(ast) {
		this._ast = ast;
	}

	/**
	*	Getter Syntax Strategy Element
	*	@public
	*	@property ast
	*	@type com.boneyard.annotation.engine.ast.ASTElement
	**/
	get ast() {
		return this._ast;
	}

	/**
	*	Static Constructor
	*	@static
	*	@method new
	*	@param [...args] {Object} constructor parameters
	*	@return com.boneyard.annotation.engine.reader.idiom.Syntax
	**/
	static new(...args) {
		return new Syntax(...args);
	}

}

export default Syntax;
