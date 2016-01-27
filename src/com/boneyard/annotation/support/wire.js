/**
*	@module com.boneyard.annotation.support
*	@author Patricio Ferreira <3dimentionar@gmail.com>
**/

import _ from 'underscore';
import _s from 'underscore.string';
import Annotation from '../engine/annotation/annotation';

/**
*	Class Wire
*	@namespace com.boneyard.annotation.support
*	@class com.boneyard.annotation.support.Wire
*	@extends com.boneyard.annotation.engine.annotation.Annotation
*
*	@requires underscore
*	@requires underscore.string
*	@requires com.boneyard.annotation.engine.annotation.Annotation
**/
class Wire extends Annotation {

	/**
	*	Constructor
	*	@constructor
	*	@param [...attrs] {Object} constructor parameters
	*	@return com.boneyard.annotation.support.Wire
	**/
	constructor(...attrs) {
		return super(...attrs);
	}

	/**
	*	Retrieves bone identifier to be injected
	*	@public
	*	@property id
	*	@type String
	**/
	get id() {
		return this.params.id;
	}

	/**
	*	Retrieves object representation of the target attribute in which the bone will be injected.
	*	@public
	*	@property attrOn
	*	@type Object
	**/
	get attrOn() {
		return _.strToJSON(this.params.on);
	}

	/**
	*	Retrieves bone annotation on which this annotation was found
	*	@public
	*	@method foundIn
	*	@return com.boneyard.annotation.support.Bone
	**/
	get foundIn() {
		return this._foundIn;
	}

	/**
	*	Sets where in which bone this annotation was found
	*	@public
	*	@property foundIn
	*	@type com.boneyard.annotation.support.Bone
	**/
	set foundIn(bone) {
		this._foundIn = bone;
	}

	/**
	*	Serialization
	*	@FIXME: // On Field (No 'on' params, process it as an action)!!
	*	@public
	*	@override
	*	@method serialize
	*	@return Object
	**/
	serialize() {
		if(this.params.on) {
			let out = {};
			_.ns(this.params.on, [`$bone.${this.params.id}`], out);
			return out;
		}
		return [];
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
