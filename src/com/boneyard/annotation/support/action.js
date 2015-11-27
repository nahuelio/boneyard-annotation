/**
*	@module com.boneyard.annotation.support
*	@author Patricio Ferreira <3dimentionar@gmail.com>
**/

import _ from 'underscore';
import _s from 'underscore.string';
import template from '../engine/writer/templates/action.tpl';
import Annotation from '../engine/annotation/annotation';

/**
*	Class Action
*	@namespace com.boneyard.annotation.support
*	@class com.boneyard.annotation.support.Action
*	@extends com.boneyard.annotation.engine.annotation.Annotation
*
*	@requires underscore
*	@requires underscore.string
*	@requires com.boneyard.annotation.engine.writer.templates.actionTpl
*	@requires com.boneyard.annotation.engine.annotation.Annotation
**/
class Action extends Annotation {

	/**
	*	Constructor
	*	@constructor
	*	@param [attrs] {Object} attributes
	*	@return com.boneyard.annotation.support.Action
	**/
	constructor(attrs = {}) {
		return super(_.extend(attrs, { _template: _.template(template) }));
	}

	/**
	*	Retrieves target bone on this Action
	*	@public
	*	@property bone
	*	@type String
	**/
	get bone() {
		return this.params.bone;
	}

	/**
	*	Retrieves target bone method to call on this Action
	*	@public
	*	@property method
	*	@type String
	**/
	get method() {
		return this.params.method;
	}

	/**
	*	Retrieves spec id in which this action belongs to
	*	@public
	*	@property spec
	*	@type String
	**/
	get spec() {
		return this.params.spec;
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
			_.defined(metadata.bone) && _.isString(metadata.bone) &&
			_.defined(metadata.method) && _.isString(metadata.method);
	}

	/**
	*	Serialization
	*	@public
	*	@override
	*	@method serialize
	*	@return Object
	**/
	serialize() {
		return { [`$bone!${this.bone}.${this.method}`]: this.params.params };
	}

	/**
	*	Retrieves list of context in which this annotation should be found
	*	@public
	*	@property contexts
	*	@type Array
	**/
	get contexts() {
		return ['__class', '__method'];
	}

	/**
	*	Class Name
	*	@static
	*	@property NAME
	*	@type String
	**/
	static get NAME() {
		return 'Action';
	}

}

export default Action;
