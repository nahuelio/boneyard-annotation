/**
*	@module com.boneyard.annotation.engine.writer.instrument
*	@author Patricio Ferreira <3dimentionar@gmail.com>
**/
import _ from 'underscore';
import _s from 'underscore.string';
import Instrument from './instrument';
import template from '../templates/plugin.tpl';

/**
*	Class PluginInstrument
*	@namespace com.boneyard.annotation.engine.writer.instrument
*	@class com.boneyard.annotation.engine.writer.instrument.PluginInstrument
*	@extends com.boneyard.annotation.engine.writer.instrument.Instrument
*
*	@requires underscore
*	@requires underscore.string
*	@requires com.boneyard.annotation.engine.writer.instrument.Instrument
*	@requires com.boneyard.annotation.engine.writer.templates.spec
**/
class PluginInstrument extends Instrument {

	/**
	*	Constructor
	*	@constructor
	*	@param specInstrument {com.boneyard.annotation.engine.writer.instrument.SpecInstrument} spec instrument
	*	@param annotation {com.boneyard.annotation.engine.annotation.Annotation} annotation reference
	*	@return com.boneyard.annotation.engine.writer.instrument.PluginInstrument
	**/
	constructor(specInstrument, annotation) {
		super(annotation, template);
		this.spec = specInstrument;
		return this;
	}

	/**
	*	Returns true if this instrument belongs to a given spec by matching the spec id against to this instrument list
	*	of spec ids, otherwise returns false.
	*	@public
	*	@override
	*	@method belongsTo
	*	@param instrument {com.boneyard.annotation.engine.writer.instrument.Instrument} instrument reference
	*	@return Boolean
	**/
	belongsTo(instrument) {
		if(!super.belongsTo(instrument)) return false;
		return _.contains(this.get().specs, instrument.get().spec.id);
	}

	/**
	*	Class Name
	*	@static
	*	@property NAME
	*	@type String
	**/
	static get NAME() {
		return 'PluginInstrument';
	}

}

export default PluginInstrument;
