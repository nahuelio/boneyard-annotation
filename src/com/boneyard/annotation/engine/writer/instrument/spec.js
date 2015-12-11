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
	*	@return com.boneyard.annotation.support.Bone
	**/
	findBone(bone) {
		return _.find(this.bones, (b) => { return (b.get().id === bone.id); });
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
