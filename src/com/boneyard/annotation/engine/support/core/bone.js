/**
*	@module com.boneyard.annotation.engine.support.core
*	@author Patricio Ferreira <3dimentionar@gmail.com>
**/

import _ from 'underscore';
import _s from 'underscore.string';
import Annotation from '../annotation';

/**
*	Class Bone
*	@namespace com.boneyard.annotation.engine.support.core
*	@class com.boneyard.annotation.engine.support.core.Bone
*	@extends com.boneyard.annotation.engine.support.Annotation
*
*	@requires underscore
*	@requires underscore.string
*	@requires com.boneyard.annotation.engine.writer.templates.boneTpl
*	@requires com.boneyard.annotation.engine.support.Annotation
**/
class Bone extends Annotation {

	/**
	*	Constructor
	*	@constructor
	*	@param [...attrs] {Object} constructor parameters
	*	@return com.boneyard.annotation.engine.support.core.Bone
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
	*	Resolves module data structure.
	*	@public
	*	@method module
	*	@return Array
	**/
	module() {
		return {
			$module: _s.trim(this.path, '.js'),
			$params: (this.params.params) ? this.params.params : []
		};
	}

	/**
	*	Serialization
	*	@public
	*	@override
	*	@method serialize
	*	@return Object
	**/
	serialize() {
		return _.extend(super.serialize(), { id: this.id, module: this.module() });
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
