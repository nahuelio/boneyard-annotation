/**
*	@module com.boneyard.annotation.support
*	@author Patricio Ferreira <3dimentionar@gmail.com>
**/

import _ from 'underscore';
import _s from 'underscore.string';
import template from '../engine/writer/templates/plugin.tpl';
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
	*	@param [attrs] {Object} attributes
	*	@return com.boneyard.annotation.support.Plugin
	**/
	constructor(attrs = {}) {
		return super(_.extend(attrs, { _template: _.template(template) }));
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
	*	Returns true if metadata passes rules criteria in order to serialized annotation to be exported as template,
	*	otherwise returns false.
	*	@public
	*	@override
	*	@method validate
	*	@param metadata {Object} metadata retrieved by serialization strategy
	*	@return Boolean
	**/
	validate(metadata) {
		return super.validate(metadata) &&
			_.defined(metadata.name) && _.isString(metadata.name) && _.defined(metadata.config);
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
