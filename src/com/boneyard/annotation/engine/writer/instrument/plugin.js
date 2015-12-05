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
	*	@return com.boneyard.annotation.engine.writer.instrument.PluginInstrument
	**/
	constructor() {
		super(template);
		return this;
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
