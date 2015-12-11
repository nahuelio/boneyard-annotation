/**
*	@module com.boneyard.annotation.engine.writer.instrument
*	@author Patricio Ferreira <3dimentionar@gmail.com>
**/
import _ from 'underscore';
import _s from 'underscore.string';
import Instrument from './instrument';
import template from '../templates/action.tpl';

/**
*	Class ActionInstrument
*	@namespace com.boneyard.annotation.engine.writer.instrument
*	@class com.boneyard.annotation.engine.writer.instrument.ActionInstrument
*	@extends com.boneyard.annotation.engine.writer.instrument.Instrument
*
*	@requires underscore
*	@requires underscore.string
*	@requires com.boneyard.annotation.engine.writer.instrument.Instrument
*	@requires com.boneyard.annotation.engine.writer.templates.spec
**/
class ActionInstrument extends Instrument {

	/**
	*	Constructor
	*	@constructor
	*	@param spec {com.boneyard.annotation.engine.writer.instrument.SpecInstrument} spec instrument
	*	@param annotation {com.boneyard.annotation.engine.annotation.Annotation} annotation reference
	*	@return com.boneyard.annotation.engine.writer.instrument.ActionInstrument
	**/
	constructor(spec, annotation) {
		super(annotation, template);
		this.spec = spec;
		return this;
	}

	/**
	*	Returns true if this instrument belongs to a given spec by matching the spec id against to this instrument spec
	*	id, otherwise returns false.
	*	@public
	*	@override
	*	@method belongsTo
	*	@param instrument {com.boneyard.annotation.engine.writer.instrument.Instrument} instrument reference
	*	@return Boolean
	**/
	belongsTo(instrument) {
		if(!super.belongsTo(instrument)) return false;
		return (this.get().spec.id === instrument.get().spec.id);
	}

	/**
	*	Validates Instrumenter
	*	@public
	*	@override
	*	@method validate
	*	@return Boolean
	**/
	validate() {
		super.validate();
		if(_.defined(this.spec))
			throw new Error(`${this.toString()}: specInstrumenter where the this instrument belongs to is undefined.`);
		return true;
	}

	/**
	*	Serialization
	*	@public
	*	@override
	*	@method serialize
	*	@return Object
	**/
	serialize() {
		return { target: `$bone!${this.bone}.${this.method}`, params: JSON.stringify(this.params.params) };
	}

	/**
	*	Class Name
	*	@static
	*	@property NAME
	*	@type String
	**/
	static get NAME() {
		return 'ActionInstrument';
	}

}

export default ActionInstrument;
