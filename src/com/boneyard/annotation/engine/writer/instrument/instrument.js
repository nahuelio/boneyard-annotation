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
	*	@param annotation {com.boneyard.annotation.engine.annotation.Annotation} annotation reference
	*	@param [template] {String} instrument template
	*	@return com.boneyard.annotation.engine.writer.instrument.Instrument
	**/
	constructor(annotation, template = '') {
		super();
		this.annotation = annotation;
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
	*	Retrieves annotation associated to this instrument
	*	@public
	*	@method get
	*	@return com.boneyard.annotation.engine.annotation.Annotation
	**/
	get() {
		return this.annotation;
	}

	/**
	*	Default spec has annotation implementation
	*	@public
	*	@method has
	*	@param annotation {com.boneyard.annotation.engine.annotation.Annotation} annotation reference
	*	@return Boolean
	**/
	has(annotation) {
		if(!_.defined(annotation) || (!_.defined(annotation.specs) && !_.defined(annotation.spec))) return false;
		return true;
	}

	/**
	*	Validates Instrumenter
	*	@public
	*	@throws Error
	*	@method validate
	*	@return Boolean
	**/
	validate() {
		if(!_.defined(this.annotation))
			throw new Error(`${this.toString()} annotation associated with this instrument was not defined.`);
		if(!_.defined(this.template) || !_.isFunction(this.template))
			throw new Error(`${this.toString()} template is not defined or is not a function.`);
		return true;
	}

	/**
	*	Default Instrument Serialization strategy
	*	@public
	*	@method serialize
	*	@return Object
	**/
	serialize() {
		return this.validate() ? this.annotation.serialize() : {};
	}

	/**
	*	Default Instrument Write Strategy will output a string representation of the annotation or
	*	group of annotations to be exported.
	*	@public
	*	@method write
	*	@return String
	**/
	write() {
		return this.template(this.serialize());
	}

	/**
	*	Returns String representation of the instance of this class
	*	@public
	*	@override
	*	@method toString
	*	@return String
	**/
	toString() {
		return this.constructor.NAME;
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
