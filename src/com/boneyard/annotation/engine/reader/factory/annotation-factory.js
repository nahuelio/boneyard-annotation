/**
*	@module com.boneyard.annotation.engine.reader.factory
*	@author Patricio Ferreira <3dimentionar@gmail.com>
**/

import fs from 'fs-extra';
import {resolve} from 'path';
import _ from 'underscore';
import Factory from '../../../util/factory';

/**
*	Class AnnotationFactory
*	@namespace com.boneyard.annotation.engine.reader.factory
*	@class com.boneyard.annotation.engine.reader.factory.AnnotationFactory
*	@extends com.boneyard.annotation.util.Factory
*
*	@requires fs-extra
*	@requires path.resolve
*	@requires underscore
*	@requires com.boneyard.annotation.util.Factory
**/
class AnnotationFactory extends Factory {

	/**
	*	@constructor
	*	@return com.boneyard.annotation.engine.reader.factory.AnnotationFactory
	**/
	constructor() {
		super('../engine/support');
		return this.registerAll();
	}

	/**
	*	Register AST Classes
	*	@public
	*	@method registerAll
	*	@return com.boneyard.annotation.engine.reader.factory.AnnotationFactory
	**/
	registerAll(ns) {
		ns = !ns ? AnnotationFactory.annotations : ns;
		_.each(ns, (v, k) => { return _.isString(v) ? this.register(v) : this.registerAll(ns[k]); });
		return this;
	}

	/**
	*	Supported Annotations
	*	@static
	*	@property annotation
	*	@type Object
	**/
	static get annotations() {
		return {
			core: {
				action: 'core/action.js',
				bone: 'core/bone.js',
				ignore: 'core/ignore.js',
				json: 'core/json.js',
				listento: 'core/listento.js',
				plugin: 'core/plugin.js',
				spec: 'core/spec.js',
				wire: 'core/wire.js',
			},
			ui: {
				component: 'ui/component.js'
			}
		}
	}

}

export default AnnotationFactory;
