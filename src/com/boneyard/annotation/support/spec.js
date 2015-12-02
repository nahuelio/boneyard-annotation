/**
*	@module com.boneyard.annotation.support
*	@author Patricio Ferreira <3dimentionar@gmail.com>
**/

import _ from 'underscore';
import _s from 'underscore.string';
import template from '../engine/writer/templates/spec.tpl';
import Annotation from '../engine/annotation/annotation';

/**
*	Class Spec
*	@namespace com.boneyard.annotation.support
*	@class com.boneyard.annotation.support.Spec
*	@extends com.boneyard.annotation.engine.annotation.Annotation
*
*	@requires underscore
*	@requires underscore.string
*	@requires com.boneyard.annotation.engine.writer.templates.specTpl
*	@requires com.boneyard.annotation.engine.annotation.Annotation
**/
class Spec extends Annotation {

	/**
	*	Constructor
	*	@constructor
	*	@param [attrs] {Object} attributes
	*	@return com.boneyard.annotation.support.Spec
	**/
	constructor(attrs = {}) {
		return super(_.extend(attrs, { _template: _.template(template) }));
	}

	/**
	*	Retrieves spec id
	*	@public
	*	@property id
	*	@type String
	**/
	get id() {
		return this.params.id;
	}

	/**
	*	Retrieves parent specs if defined
	*	@public
	*	@property id
	*	@type String
	**/
	get specs() {
		return _.defined(this.params.include) ? this.params.include : [];
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
	*	Set bones into this spec
	*	@public
	*	@property bones
	*	@type Array
	**/
	set bones(bones = []) {
		this._bones = bones;
	}

	/**
	*	Retrieves bones from this spec
	*	@public
	*	@property bones
	*	@type Array
	**/
	get bones() {
		return this._bones;
	}

	/**
	*	Set actions into this spec
	*	@public
	*	@property bones
	*	@type Array
	**/
	set actions(actions = []) {
		this._actions = actions;
	}

	/**
	*	Retrieves actions from this spec
	*	@public
	*	@property actions
	*	@type Array
	**/
	get actions() {
		return this._actions;
	}

	/**
	*	Set plugins into this spec
	*	@public
	*	@property plugins
	*	@type Array
	**/
	set plugins(plugins = []) {
		this._plugins = plugins;
	}

	/**
	*	Retrieves plugins from this spec
	*	@public
	*	@property plugins
	*	@type Array
	**/
	get plugins() {
		return this._plugins;
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
		return super.validate(metadata) && _.defined(metadata.id);
	}

	/**
	*	Serialization strategy
	*	@public
	*	@override
	*	@method serialize
	*	@return Object
	**/
	serialize() {
		return _.extend({
			id: this.id,
			paths: this.paths(),
			dependencies: this.dependencies(),
			specs: this.parent(),
			bones: this.writeBones(),
			actions: this.writeActions(),
			plugins: this.writePlugins()
		}, this.author(), super.serialize());
	}

	/**
	*	Resolves spec dependenciy paths if any and returns them
	*	@public
	*	@method dependencies
	*	@return String
	**/
	paths() {
		return (_.defined(this.specs) && this.specs.length > 0) ? _s.quote(this.specs.join("','"), "'") : "";
	}

	/**
	*	Resolves spec dependency identifiers if any and returns them.
	*	@public
	*	@method dependencies
	*	@return String
	**/
	dependencies() {
		return this.parent();
	}

	/**
	*	Resolves parent specs decorators (parents) if declared and returns them
	*	@public
	*	@method dependencies
	*	@return String
	**/
	parent() {
		return this.specs.map((s) => { return _s.strRightBack(s, '/'); }).join(', ');
	}

	/**
	*	Resolves bones serialization associated with this spec
	*	@public
	*	@method writeBones
	*	@return String
	**/
	writeBones() {
		return _.invoke(this.bones, 'write').join(', ');
	}

	/**
	*	Resolves actions serialization associated with this spec
	*	@public
	*	@method writeActions
	*	@return String
	**/
	writeActions() {
		return _.invoke(this.actions, 'write').join(', ');
	}

	/**
	*	Resolves plugins serialization associated with this spec
	*	@public
	*	@method writePlugins
	*	@return String
	**/
	writePlugins() {
		return _.invoke(this.plugins, 'write').join(', ');
	}

	/**
	*	Resolves author annotation to be included in the top comment block.
	*	@public
	*	@method author
	*	@return Object
	**/
	author() {
		return _.defined(this.config.author) ? { author: this.config.author } : {};
	}

	/**
	*	Class Name
	*	@static
	*	@property NAME
	*	@type String
	**/
	static get NAME() {
		return 'Spec';
	}

}

export default Spec;
