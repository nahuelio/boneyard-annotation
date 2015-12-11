/**
*	@module com.boneyard.annotation.support
*	@author Patricio Ferreira <3dimentionar@gmail.com>
**/

import _ from 'underscore';
import _s from 'underscore.string';
import Annotation from '../engine/annotation/annotation';

/**
*	Class Plugin
*	@namespace com.boneyard.annotation.support
*	@class com.boneyard.annotation.support.Plugin
*	@extends com.boneyard.annotation.engine.annotation.Annotation
*
*	@requires underscore
*	@requires underscore.string
*	@requires com.boneyard.annotation.engine.writer.templates.pluginTpl
*	@requires com.boneyard.annotation.engine.annotation.Annotation
**/
class Plugin extends Annotation {

	/**
	*	Constructor
	*	@constructor
	*	@param [...attrs] {Object} constructor parameters
	*	@return com.boneyard.annotation.support.Plugin
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
	get spec() {
		return this.params.spec;
	}

	/**
	*	Retrieves list of context in which this annotation should be found
	*	@public
	*	@property contexts
	*	@type Array
	**/
	get contexts() {
		return ['__class'];
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
