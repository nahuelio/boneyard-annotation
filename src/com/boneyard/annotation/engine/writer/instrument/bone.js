/**
*	@module com.boneyard.annotation.engine.writer.instrument
*	@author Patricio Ferreira <3dimentionar@gmail.com>
**/
import _ from 'underscore';
import _s from 'underscore.string';
import Instrument from './instrument';
import template from '../templates/bone.tpl';
import Context from '../../annotation/context';

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
*	@requires com.boneyard.annotation.engine.annotation.Context
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
		this.wires = [];
		return this;
	}

	/**
	*	Dependency Injection Strategy
	*	@public
	*	@method inject
	*	@param wire {com.boneyard.annotation.engine.writer.instrument.WireInstrument} wire instrument reference
	*	@return com.boneyard.annotation.engine.writer.instrument.BoneInstrument
	**/
	inject(wire) {
		this[`inject${wire.get().context.name}`].call(this, wire);
		this.wires.push(wire);
		return this;
	}

	/**
	*	Contructor Injection Resolution
	*	@public
	*	@method inject__constructor
	*	@param wire {com.boneyard.annotation.engine.writer.instrument.WireInstrument} wire instrument reference
	*	@return com.boneyard.annotation.engine.writer.instrument.BoneInstrument
	**/
	inject__constructor(wire) {
		return wire.serialize();
	}

	/**
	*	Field Injection Resolution
	*	@public
	*	@method inject__constructor
	*	@param wire {com.boneyard.annotation.engine.writer.instrument.WireInstrument} wire instrument reference
	*	@return com.boneyard.annotation.engine.writer.instrument.BoneInstrument
	**/
	inject__field(wire) {
		// TODO: Handle if wire is on field (Action perform)
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
		return super.serialize();
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
