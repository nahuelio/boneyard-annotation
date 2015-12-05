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
	*	@param file {String} spec file
	*	@return com.boneyard.annotation.engine.writer.instrument.SpecInstrument
	**/
	constructor(file) {
		super(template);
		this.file = file;
		return this;
	}

	/**
	*	Sets Spec file
	*	@public
	*	@property file
	*	@type String
	**/
	set file(file) {
		this._file = file;
	}

	/**
	*	Retrieves Spec file
	*	@public
	*	@property file
	*	@type String
	**/
	get file() {
		return this._file;
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
	*	Retrieves Spec bones
	*	@public
	*	@property bones
	*	@type Array
	**/
	get bones() {
		return this._bones;
	}

	/**
	*	Sets Spec actions
	*	@public
	*	@property actions
	*	@type Array
	**/
	set actions(actions) {
		this._actions = actions;
	}

	/**
	*	Retrieves Spec actions
	*	@public
	*	@property actions
	*	@type Array
	**/
	get actions() {
		return this._actions;
	}

	/**
	*	Sets Spec plugins
	*	@public
	*	@property plugins
	*	@type Array
	**/
	set plugins(plugins) {
		this._plugins = plugins;
	}

	/**
	*	Retrieves Spec plugins
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
		if(!_.defined(this.file) || !_.isString(this.file))
			throw new Error(`${SpecInstrument.NAME} file is not defined or is not a string`);
		return true;
	}

	/**
	*	Add a new bone
	*	@public
	*	@method addBone
	*	@param bone {com.boneyard.annotation.support.Bone} bone reference
	*	@return com.boneyard.annotation.engine.writer.instrument.SpecInstrument
	**/
	addBone(bone) {
		if(this.findBone(bone)) return this;
		this.bones.push(bone);
		return this;
	}

	/**
	*	Removes an existing bone
	*	@public
	*	@method addBone
	*	@param bone {com.boneyard.annotation.support.Bone} bone reference
	*	@return com.boneyard.annotation.engine.writer.instrument.SpecInstrument
	**/
	removeBone(bone) {
		if(!this.findBone(bone)) return this;
		for(let i = 0; i < this.bones.length; i++) {
			if(this.bones[i].id === bone.id) {
				this.bones.splice(i, 1);
				break;
			}
		}
		return this;
	}

	/**
	*	Performs a look up by bone annotation and retrieves it if found, otherwise returns null
	*	@public
	*	@method findBone
	*	@param bone {com.boneyard.annotation.support.Bone} bone reference
	*	@return com.boneyard.annotation.support.Bone
	**/
	findBone(bone) {
		return _.find(this.bones, (b) => { return (b.id === bone.id); });
	}

	/**
	*	Spec Serialization
	*	@public
	*	@override
	*	@method serialize
	*	@return Object
	**/
	serialize() {
		return {};
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
