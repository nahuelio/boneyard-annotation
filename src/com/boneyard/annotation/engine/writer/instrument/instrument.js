/**
*	@module com.boneyard.annotation.engine.writer.instrument
*	@author Patricio Ferreira <3dimentionar@gmail.com>
**/
import _ from 'underscore';
import _s from 'underscore.string';
import {EventEmitter} from 'events';

/**
*	Class Instrument
*	@namespace com.boneyard.annotation.engine.writer.instrument
*	@class com.boneyard.annotation.engine.writer.instrument.Instrument
*	@extends events.EventEmitter
*
*	@requires underscore
*	@requires underscore.string
**/
class Instrument extends EventEmitter {

	/**
	*	Constructor
	*	@constructor
	*	@param template {String} instrument template
	*	@return com.boneyard.annotation.engine.writer.instrument.Instrument
	**/
	constructor(template = "") {
		super();
		this.template = _.template(template);
		return this;
	}

	/**
	*	Sets Instrument Template
	*	@public
	*	@property template
	*	@type Function
	**/
	set template(template) {
		this._template = template;
	}

	/**
	*	Retrieves Spec template
	*	@public
	*	@property template
	*	@type Function
	**/
	get template() {
		return this._template;
	}

	/**
	*	Validates Instrumenter
	*	@public
	*	@throws Error
	*	@method validate
	*	@return Boolean
	**/
	validate() {
		if(!_.defined(this.template) || !_.isFunction(this.template))
			throw new Error(`${this.constructor.NAME} template is not defined or is not a function.`);
		return true;
	}

	/**
	*	Default Instrument Serialization strategy
	*	@public
	*	@method serialize
	*	@return Object
	**/
	serialize() {
		return {};
	}

	/**
	*	Default Instrument Write Strategy will output a string representation of the annotation or
	*	group of annotations to be exported.
	*	@public
	*	@method write
	*	@return String
	**/
	write() {
		if(!_.defined(this.template))
		return this.template(this.serialize());
	}

	/**
	*	Class Name
	*	@static
	*	@property NAME
	*	@type String
	**/
	static get NAME() {
		return 'Instrument';
	}

}

export default Instrument;
