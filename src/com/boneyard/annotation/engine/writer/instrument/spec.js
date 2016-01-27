/**
*	@module com.boneyard.annotation.engine.writer.instrument
*	@author Patricio Ferreira <3dimentionar@gmail.com>
**/
import _ from 'underscore';
import _s from 'underscore.string';
import Instrument from './instrument';
import template from '../templates/spec.tpl';

/**
*	Class SpecInstrument
*	@namespace com.boneyard.annotation.engine.writer.instrument
*	@class com.boneyard.annotation.engine.writer.instrument.SpecInstrument
*	@extends com.boneyard.annotation.engine.writer.instrument.Instrument
*
*	@requires underscore
*	@requires underscore.string
*	@requires com.boneyard.annotation.engine.writer.instrument.Instrument
*	@requires com.boneyard.annotation.engine.writer.templates.spec
**/
class SpecInstrument extends Instrument {

	/**
	*	Constructor
	*	@constructor
	*	@param annotation {com.boneyard.annotation.engine.annotation.Annotation} annotation reference
	*	@return com.boneyard.annotation.engine.writer.instrument.SpecInstrument
	**/
	constructor(annotation) {
		return super(annotation, template);
	}

	/**
	*	Sets Spec bone instruments
	*	@public
	*	@property bones
	*	@type Array
	**/
	set paths(paths) {
		this._paths = paths;
	}

	/**
	*	Retrieves resolved dependency paths
	*	@public
	*	@property paths
	*	@type Array
	**/
	get paths() {
		return this._paths;
	}

	/**
	*	Sets Spec bone instruments
	*	@public
	*	@property bones
	*	@type Array
	**/
	set bones(bones) {
		this._bones = bones;
	}

	/**
	*	Retrieves Spec bone instruments
	*	@public
	*	@property bones
	*	@type Array
	**/
	get bones() {
		return this._bones;
	}

	/**
	*	Sets Spec action instruments
	*	@public
	*	@property actions
	*	@type Array
	**/
	set actions(actions) {
		this._actions = actions;
	}

	/**
	*	Retrieves Spec action instruments
	*	@public
	*	@property actions
	*	@type Array
	**/
	get actions() {
		return this._actions;
	}

	/**
	*	Sets Spec plugin instruments
	*	@public
	*	@property plugins
	*	@type Array
	**/
	set plugins(plugins) {
		this._plugins = plugins;
	}

	/**
	*	Retrieves Spec plugin instruments
	*	@public
	*	@property plugins
	*	@type Array
	**/
	get plugins() {
		return this._plugins;
	}

	/**
	*	Default spec has annotation implementation
	*	@public
	*	@override
	*	@method has
	*	@param annotation {com.boneyard.annotation.engine.annotation.Annotation} annotation reference
	*	@return Boolean
	**/
	has(annotation) {
		var method = this[`has${annotation.toString()}`];
		return (super.has(annotation) && _.defined(method) && method.call(this, annotation));
	}

	/**
	*	Returns true if a given plugin is part of this spec, otherwise returns false.
	*	@public
	*	@method hasPlugin
	*	@param plugin {com.boneyard.annotation.support.Plugin} annotation reference
	*	@return Boolean
	**/
	hasPlugin(plugin) {
		return _.contains(plugin.specs, this.get().id);
	}

	/**
	*	Returns true if a given bone is part of this spec, otherwise returns false.
	*	@public
	*	@method hasBone
	*	@param bone {com.boneyard.annotation.support.Bone} annotation reference
	*	@return Boolean
	**/
	hasBone(bone) {
		return _.contains(bone.specs, this.get().id);
	}

	/**
	*	Returns true if a given component is part of this spec, otherwise returns false.
	*	@public
	*	@method hasComponent
	*	@param component {com.boneyard.annotation.support.Component} annotation reference
	*	@return Boolean
	**/
	hasComponent(component) {
		return _.contains(component.specs, this.get().id);
	}

	/**
	*	Returns true if a given json is part of this spec, otherwise returns false.
	*	@public
	*	@method hasJson
	*	@param json {com.boneyard.annotation.support.Json} annotation reference
	*	@return Boolean
	**/
	hasJson(json) {
		return _.contains(json.specs, this.get().id);
	}

	/**
	*	Returns true if a given action is part of this spec, otherwise returns false.
	*	@public
	*	@method hasAction
	*	@param action {com.boneyard.annotation.support.Action} annotation reference
	*	@return Boolean
	**/
	hasAction(action) {
		return (action.spec === this.get().id);
	}

	/**
	*	Validates Instrumenter
	*	@public
	*	@override
	*	@throws Error
	*	@method validate
	*	@return Boolean
	**/
	validate() {
		super.validate();
		if(!_.defined(this.get().filepath) || !_.isString(this.get().filepath))
			throw new Error(`${this.toString()} annotation filepath is not defined or is not a string`);
		return true;
	}

	/**
	*	Add a new bone instrument
	*	@public
	*	@method addBone
	*	@param bone {com.boneyard.annotation.engine.writer.instrument.BoneInstrument} bone instrument reference
	*	@return com.boneyard.annotation.engine.writer.instrument.SpecInstrument
	**/
	addBone(bone) {
		if(this.findBone(bone)) return this;
		this.bones.push(bone);
		return this;
	}

	/**
	*	Removes an existing bone instrument
	*	@public
	*	@method addBone
	*	@param bone {com.boneyard.annotation.engine.writer.instrument.BoneInstrument} bone instrument reference
	*	@return com.boneyard.annotation.engine.writer.instrument.SpecInstrument
	**/
	removeBone(bone) {
		if(!this.findBone(bone)) return this;
		for(let i = 0; i < this.bones.length; i++) {
			if(this.bones[i].get().id === bone.get().id) {
				this.bones.splice(i, 1);
				break;
			}
		}
		return this;
	}

	/**
	*	Performs a look up by bone instrument and retrieves it if found, otherwise returns null
	*	@public
	*	@method findBone
	*	@param bone {com.boneyard.annotation.engine.writer.instrument.BoneInstrument} bone instrument reference
	*	@return com.boneyard.annotation.engine.writer.instrument.BoneInstrument
	**/
	findBone(bone) {
		return _.find(this.bones, (b) => { return (b.get().id === bone.id); });
	}

	/**
	*	Performs a bone instrument look up by wire annotation and retrieves it if found, otherwise returns null
	*	@public
	*	@method findBoneByWire
	*	@param wire {com.boneyard.annotation.support.Wire} wire annotation
	*	@return com.boneyard.annotation.engine.writer.instrument.BoneInstrument
	**/
	findBoneByWire(wire) {
		return _.find(this.bones, (b) => { return (b.get().filepath === wire.filepath); });
	}

	/**
	*	Dependency Path Resolution strategy
	*	@public
	*	@method resolvePaths
	*	@param specs {Array} list of spec instruments
	*	@return com.boneyard.annotation.engine.writer.instrument.BoneInstrument
	**/
	resolvePaths(specs) {
		this.paths = (this.get().parent.length > 0) ?
			_.compact(_.map(this.get().parent, (p, ix, arr) => {
				let s = _.find(specs, (s) => { return (s.get().id === p); });
				return (s) ? s.get().path : null;
			})) : [];
		return this;
	}

	/**
	*	Instrument Serialization strategy
	*	@public
	*	@override
	*	@method serialize
	*	@return Object
	**/
	serialize() {
		return _.extend(super.serialize(), this.get().serialize(), {
			paths: (this.paths.length > 0) ? _s.quote(this.paths.join("','"), "'") : '',
			//bones: _.invoke(this.bones, 'write'),
			actions: _.invoke(this.actions, 'write'),
			plugins: _.invoke(this.plugins, 'write')
		});
	}

	/**
	*	Class Name
	*	@static
	*	@property NAME
	*	@type String
	**/
	static get NAME() {
		return 'SpecInstrument';
	}

}

export default SpecInstrument;
