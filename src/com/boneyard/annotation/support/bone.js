/**
*	@module com.boneyard.annotation.support
*	@author Patricio Ferreira <3dimentionar@gmail.com>
**/

import _ from 'underscore';
import _s from 'underscore.string';
import Annotation from '../engine/annotation/annotation';

/**
*	Class Bone
*	@namespace com.boneyard.annotation.support
*	@class com.boneyard.annotation.support.Bone
*	@extends com.boneyard.annotation.engine.annotation.Annotation
*
*	@requires underscore
*	@requires underscore.string
*	@requires com.boneyard.annotation.engine.writer.templates.boneTpl
*	@requires com.boneyard.annotation.engine.annotation.Annotation
**/
class Bone extends Annotation {

	/**
	*	Constructor
	*	@constructor
	*	@param [...attrs] {Object} constructor parameters
	*	@return com.boneyard.annotation.support.Bone
	**/
	constructor(...attrs) {
		return super(...attrs);
	}

	/**
	*	Retrieves bone id
	*	@public
	*	@property id
	*	@type String
	**/
	get id() {
		return this.params.id;
	}

	/**
	*	Retrieves spec id in which this bone belongs to
	*	@public
	*	@property specs
	*	@type Array
	**/
	get specs() {
		return this.params.specs;
	}

	/**
	*	Resolves bone module path
	*	@public
	*	@property path
	*	@type String
	**/
	get path() {
		return _s.replaceAll(this._filepath, this.config.cwd + '/', '');
	}

	/**
	*	Retrieves singleton flag
	*	@public
	*	@property singleton
	*	@type Boolean
	**/
	get singleton() {
		return this.params.singleton;
	}

	/**
	*	Retrieves list of context in which this annotation should be found
	*	@public
	*	@property contexts
	*	@type Array
	**/
	get contexts() {
		return ['__class'];
	}

	/**
	*	JSON serialization strategy
	*	@public
	*	@override
	*	@method serialize
	*	@return Object
	**/
	serialize() {
		// TODO
		return {};
	}

	/**
	*	Class Name
	*	@static
	*	@property NAME
	*	@type String
	**/
	static get NAME() {
		return 'Bone';
	}

}

export default Bone;
