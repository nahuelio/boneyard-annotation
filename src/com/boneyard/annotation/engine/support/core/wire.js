/**
*	@module com.boneyard.annotation.engine.support.core
*	@author Patricio Ferreira <3dimentionar@gmail.com>
**/

import _ from 'underscore';
import _s from 'underscore.string';
import Annotation from '../annotation';

/**
*	Class Wire
*	@namespace com.boneyard.annotation.engine.support.core
*	@class com.boneyard.annotation.engine.support.core.Wire
*	@extends com.boneyard.annotation.engine.support.Annotation
*
*	@requires underscore
*	@requires underscore.string
*	@requires com.boneyard.annotation.engine.support.Annotation
**/
class Wire extends Annotation {

	/**
	*	Constructor
	*	@constructor
	*	@param [...attrs] {Object} constructor parameters
	*	@return com.boneyard.annotation.engine.support.core.Wire
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
	*	@return com.boneyard.annotation.engine.support.core.Bone
	**/
	get foundIn() {
		return this._foundIn;
	}

	/**
	*	Sets where in which bone this annotation was found
	*	@public
	*	@property foundIn
	*	@type com.boneyard.annotation.engine.support.core.Bone
	**/
	set foundIn(bone) {
		this._foundIn = bone;
	}

	/**
	*	Serialization
	*	@public
	*	@override
	*	@method serialize
	*	@return Object
	**/
	serialize() {
		let out = {};
		_.ns(this.params.on, [`$bone.${this.params.id}`], out);
		return out;
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
