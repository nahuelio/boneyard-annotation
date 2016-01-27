/**
*	@module com.boneyard.annotation.engine.writer.instrument
*	@author Patricio Ferreira <3dimentionar@gmail.com>
**/
import _ from 'underscore';
import _s from 'underscore.string';
import Instrument from './instrument';
import template from '../templates/bone.tpl';

/**
*	Class BoneInstrument
*	@namespace com.boneyard.annotation.engine.writer.instrument
*	@class com.boneyard.annotation.engine.writer.instrument.BoneInstrument
*	@extends com.boneyard.annotation.engine.writer.instrument.Instrument
*
*	@requires underscore
*	@requires underscore.string
*	@requires com.boneyard.annotation.engine.writer.instrument.Instrument
*	@requires com.boneyard.annotation.engine.writer.templates.spec
**/
class BoneInstrument extends Instrument {

	/**
	*	Constructor
	*	@constructor
	*	@param spec {com.boneyard.annotation.engine.writer.instrument.SpecInstrument} spec instrument
	*	@param annotation {com.boneyard.annotation.engine.annotation.Annotation} annotation reference
	*	@return com.boneyard.annotation.engine.writer.instrument.BoneInstrument
	**/
	constructor(spec, annotation) {
		super(annotation, template);
		this.spec = spec;
		return this;
	}

	/**
	*	Returns true if this instrument has a given annotation by matching the spec id against annotation spec id or list
	*	of spec ids, otherwise returns false.
	*	@public
	*	@override
	*	@method has
	*	@param instrument {com.boneyard.annotation.engine.writer.instrument.Instrument} instrument reference
	*	@return Boolean
	**/
	has(instrument) {
		if(!super.belongsTo(instrument)) return false;
		return _.contains(this.get().specs, instrument.get().spec.id);
	}

	/**
	*	Wire Strategy
	*	@public
	*	@method wire
	*	@param annotation {com.boneyard.annotation.support.Wire} annotation reference
	*	@return com.boneyard.annotation.engine.writer.instrument.BoneInstrument
	**/
	wire(annotation) {
		_.extend(annotation.foundId.get().params, { params: annotation.serialize() });
		return this;
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
	validate() {
		return super.validate() && _.defined(this.get().id) && _.defined(this.get().path);
	}

	/**
	*	Serialization
	*	@public
	*	@override
	*	@method serialize
	*	@return Object
	**/
	serialize() {
		return _.extend(super.serialize(), this.get().serialize());
	}

	/**
	*	Class Name
	*	@static
	*	@property NAME
	*	@type String
	**/
	static get NAME() {
		return 'BoneInstrument';
	}

}

export default BoneInstrument;
