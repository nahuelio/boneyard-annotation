/**
*	@module com.boneyard.annotation.engine.reader.factory
*	@author Patricio Ferreira <3dimentionar@gmail.com>
**/

import fs from 'fs-extra';
import {resolve} from 'path';
import _ from 'underscore';
import ASTFactory from './ast';
import Factory from '../../util/factory';

/**
*	Class SyntaxFactory
*	@namespace com.boneyard.annotation.engine.reader.factory
*	@class com.boneyard.annotation.engine.reader.factory.SyntaxFactory
*	@extends com.boneyard.annotation.util.Factory
*
*	@requires fs-extra
*	@requires path.resolve
*	@requires underscore
*	@requires com.boneyard.annotation.engine.factory.ASTFactory
*	@requires com.boneyard.annotation.util.Factory
**/
class SyntaxFactory extends Factory {

	/**
	*	@constructor
	*	@return com.boneyard.annotation.engine.reader.factory.SyntaxFactory
	**/
	constructor(attrs = {}) {
		super(`../engine/idiom/${attrs.type}`);
		return this.registerAll();
	}

	/**
	*	Register syntax factory classes
	*	@public
	*	@method registerAll
	*	@return com.boneyard.annotation.engine.reader.factory.SyntaxFactory
	**/
	registerAll(ns) {
		ns = !ns ? ASTFactory.elements : ns;
		_.each(ns, (v, k) => {
			return _.isString(v) ? this.register(v) : this.registerAll(ns[k]);
		});
		return this;
	}

}

export default SyntaxFactory;
