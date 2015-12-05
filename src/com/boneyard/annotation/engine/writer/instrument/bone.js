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
	*	@return com.boneyard.annotation.engine.writer.instrument.BoneInstrument
	**/
	constructor(spec) {
		super(template);
		this.spec
		return this;
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
