/**
*	@module com.boneyard.annotation.engine.support.core
*	@author Patricio Ferreira <3dimentionar@gmail.com>
**/

import _ from 'underscore';
import _s from 'underscore.string';
import Annotation from '../annotation';

/**
*	Class Plugin
*	@namespace com.boneyard.annotation.engine.support.core
*	@class com.boneyard.annotation.engine.support.core.Plugin
*	@extends com.boneyard.annotation.engine.support.Annotation
*
*	@requires underscore
*	@requires underscore.string
*	@requires com.boneyard.annotation.engine.writer.templates.pluginTpl
*	@requires com.boneyard.annotation.engine.support.Annotation
**/
class Plugin extends Annotation {

	/**
	*	Constructor
	*	@constructor
	*	@param [...attrs] {Object} constructor parameters
	*	@return com.boneyard.annotation.engine.support.core.Plugin
	**/
	constructor(...attrs) {
		return super(...attrs);
	}

	/**
	*	Retrieves spec id in which this plugin belongs to
	*	@public
	*	@property spec
	*	@type String
	**/
	get specs() {
		return this.params.specs;
	}

	/**
	*	Serialization
	*	@public
	*	@override
	*	@method serialize
	*	@return String
	**/
	serialize() {
		return {
			name: this.params.name,
			config: JSON.stringify(this.params.config)
		};
	}

	/**
	*	Class Name
	*	@static
	*	@property NAME
	*	@type String
	**/
	static get NAME() {
		return 'Plugin';
	}

}

export default Plugin;
