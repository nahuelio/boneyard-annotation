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
	*	@param [...args] {Object} constructor arguments
	*	@return com.boneyard.annotation.engine.reader.idiom.Syntax
	**/
	constructor(...args) {
		return super();
	}

	/**
	*	Default Query Visit Strategy
	*	@public
	*	@method query
	*	@param element {com.boneyard.annotation.engine.ast.ASTElement} ast element
	*	@return com.boneyard.annotation.engine.ast.ASTElement
	**/
	query(element) {
		this.element = element;
		this.emit('syntax:visit', this);
		return this.element;
	}

	/**
	*	Default Read Visit Strategy
	*	@public
	*	@method read
	*	@return com.boneyard.annotation.engine.reader.idiom.Syntax
	**/
	read() {
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
	get element(e) {
		this._element = e;
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
