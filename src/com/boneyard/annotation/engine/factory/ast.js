/**
*	@module com.boneyard.annotation.engine.reader.factory
*	@author Patricio Ferreira <3dimentionar@gmail.com>
**/

import fs from 'fs-extra';
import {resolve} from 'path';
import _ from 'underscore';
import Factory from '../../util/factory';

/**
*	Class ASTFactory
*	@namespace com.boneyard.annotation.engine.reader.factory
*	@class com.boneyard.annotation.engine.reader.factory.ASTFactory
*	@extends com.boneyard.annotation.util.Factory
*
*	@requires fs-extra
*	@requires path.resolve
*	@requires underscore
*	@requires com.boneyard.annotation.util.Factory
**/
class ASTFactory extends Factory {

	/**
	*	@constructor
	*	@return com.boneyard.annotation.engine.reader.factory.ASTFactory
	**/
	constructor() {
		super('../engine/ast');
		return this.registerAll();
	}

	/**
	*	Register AST Classes
	*	@public
	*	@method registerAll
	*	@return com.boneyard.annotation.engine.reader.factory.ASTFactory
	**/
	registerAll(ns) {
		ns = !ns ? ASTFactory.elements : ns;
		_.each(ns, (v, k) => { return _.isString(v) ? this.register(v) : this.registerAll(ns[k]); });
		return this;
	}

	/**
	*	Supported AST elements
	*	@static
	*	@property elements
	*	@type Object
	**/
	static get elements() {
		return {
			class: 'class',
			comment: 'comment',
			constructor: 'constructor',
			method: 'method',
			module: 'module',
			parameter: 'parameter',
			program: 'program',
			property: 'property'
		}
	}

}

export default ASTFactory;
