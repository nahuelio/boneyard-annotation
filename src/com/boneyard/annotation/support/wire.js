/**
*	@module com.boneyard.annotation.support
*	@author Patricio Ferreira <3dimentionar@gmail.com>
**/

import Annotation from '../engine/annotation/annotation';

/**
*	Class Wire
*	@namespace com.boneyard.annotation.support
*	@class com.boneyard.annotation.support.Wire
*	@extends com.boneyard.annotation.engine.annotation.Annotation
*
*	@requires com.boneyard.annotation.engine.annotation.Annotation
**/
class Wire extends Annotation {

	/**
	*	Constructor
	*	@constructor
	*	@param [attrs] {Object} attributes
	*	@return com.boneyard.annotation.support.Wire
	**/
	constructor(attrs = {}) {
		return super(attrs);
	}

	/**
	*	Retrieves list of bones to be injected
	*	@public
	*	@property bones
	*	@type Array
	**/
	get bones() {
		return this.params.bones;
	}

	/**
	*	Retrieves attributes in which bones should be injected
	*	@public
	*	@property onAttr
	*	@type String
	**/
	get onAttr() {
		return this.params.on;
	}

	/**
	*	Retrieves property name of attribute in which bones should injected
	*	@public
	*	@property onName
	*	@type String
	**/
	get onName() {
		return this.params.name;
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
	validate(metadata) {
		return super.validate(metadata) &&
			_.defined(metadata.bones) && _.isArray(metadata.bones) &&
			_.defined(metadata.on) && _.isString(metadata.on);
	}

	/**
	*	Serialization
	*	@public
	*	@override
	*	@method serialize
	*	@return Object
	**/
	serialize() {
		// TODO: Continue here...
		return {};
	}

	/**
	*	Retrieves list of context in which this annotation should be found
	*	@public
	*	@property contexts
	*	@type Array
	**/
	get contexts() {
		return ['__constructor', '__field'];
	}

	/**
	*	Class Name
	*	@static
	*	@property NAME
	*	@type String
	**/
	static get NAME() {
		return 'Wire';
	}

}

export default Wire;
