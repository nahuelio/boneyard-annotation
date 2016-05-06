/**
*	@module com.boneyard.annotation.engine.idiom.es6
*	@author Patricio Ferreira <3dimentionar@gmail.com>
**/

import _ from 'underscore';
import esprima from 'esprima';
import Syntax from '../syntax';
import Module from './module';

/**
*	Class Es6Program
*	@namespace com.boneyard.annotation.engine.idiom.es6
*	@class com.boneyard.annotation.engine.idiom.es6.Es6Program
*	@extends com.boneyard.annotation.engine.idiom.Syntax
*
*	@requires underscore
*	@requires esprima
*	@requires com.boneyard.annotation.engine.idiom.Syntax
*	@requires com.boneyard.annotation.engine.idiom.es6.Module
**/
class Es6Program extends Syntax {

	parse(node) {
		super.parse(node);
		this.qr.set(esprima.parse(node, this.options));
		return this;
	}

	/**
	*	Query Visit Strategy
	*	@public
	*	@override
	*	@method query
	*	@return com.boneyard.annotation.engine.idiom.es6.Es6Program
	**/
	query() {
		super.query();
		this.qr.forEach(':root > .body', null, _.bind(this.read, this));
		return this;
	}

	/**
	*	Read Strategy Handler
	*	@public
	*	@method read
	*	@param ast {Object} query result reference
	*	@return com.boneyard.annotation.engine.idiom.es6.Es6Program
	**/
	read(ast) {
		let module = Module.newElement('module', this.element);
		this.element.add(module.accept(Module.newVisitor(module)));
		return super.read(ast);
	}

	/**
	*	@static
	*	@property NAME
	*	@type String
	**/
	static get NAME() {
		return 'program';
	}

}

export default Es6Program;
