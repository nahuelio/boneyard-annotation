/**
*	@module com.boneyard.annotation.support
*	@author Patricio Ferreira <3dimentionar@gmail.com>
**/

import _ from 'underscore';
import _s from 'underscore.string';
import template from '../engine/writer/templates/bone.tpl';
import Annotation from '../engine/annotation/annotation';

/**
*	Class Bone
*	@namespace com.boneyard.annotation.support
*	@class com.boneyard.annotation.support.Bone
*	@extends com.boneyard.annotation.engine.annotation.Annotation
*
*	@requires underscore
*	@requires underscore.string
*	@requires com.boneyard.annotation.engine.writer.templates.boneTpl
*	@requires com.boneyard.annotation.engine.annotation.Annotation
**/
class Bone extends Annotation {

	/**
	*	Constructor
	*	@constructor
	*	@param [attrs] {Object} attributes
	*	@return com.boneyard.annotation.support.Bone
	**/
	constructor(attrs = {}) {
		return super(_.extend(attrs, { _template: _.template(template) }));
	}

	/**
	*	Retrieves bone id
	*	@public
	*	@property id
	*	@type String
	**/
	get id() {
		return this.params.id;
	}

	/**
	*	Retrieves spec id in which this bone belongs to
	*	@public
	*	@property spec
	*	@type String
	**/
	get spec() {
		return this.params.spec;
	}

	/**
	*	Retrieves singleton flag
	*	@public
	*	@property singleton
	*	@type Boolean
	**/
	get singleton() {
		return this.params.singleton;
	}

	/**
	*	Sets bone wire annotation
	*	@public
	*	@property wire
	*	@type com.boneyard.annotation.support.Wire
	**/
	set wire(wire) {
		this._wire = wire;
	}

	/**
	*	Retrieves bone wire annotation
	*	@public
	*	@property wire
	*	@type com.boneyard.annotation.support.Wire
	**/
	get wire() {
		return this._wire;
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
	*	Resolves bone module path
	*	@public
	*	@property module
	*	@type String
	**/
	get modulePath() {
		return !this.params.module ? _s.replaceAll(this.path, this.config.cwd + '/', '') : this.params.module;
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
		return super.validate(metadata) && _.defined(metadata.id) && _.defined(metadata.module);
	}

	/**
	*	Serialization
	*	@public
	*	@override
	*	@method serialize
	*	@return Object
	**/
	serialize() {
		return _.extend({ id: this.id, module: JSON.stringify(this.module()) }, super.serialize());
	}

	/**
	*	Resolves module data structure.
	*	@public
	*	@method module
	*	@return Array
	**/
	module() {
		return {
			$module: this.modulePath,
			$params: _.omit(this.params, 'id', 'spec', 'module')
		};
	}

	/**
	*	Class Name
	*	@static
	*	@property NAME
	*	@type String
	**/
	static get NAME() {
		return 'Bone';
	}

}

export default Bone;
