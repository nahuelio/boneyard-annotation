/**
*	@module com.boneyard.annotation.engine.support.core
*	@author Patricio Ferreira <3dimentionar@gmail.com>
**/

import _ from 'underscore';
import _s from 'underscore.string';
import Annotation from '../annotation';

/**
*	Class Spec
*	@namespace com.boneyard.annotation.engine.support.core
*	@class com.boneyard.annotation.engine.support.core.Spec
*	@extends com.boneyard.annotation.engine.annotation.Annotation
*
*	@requires underscore
*	@requires underscore.string
*	@requires com.boneyard.annotation.engine.writer.templates.specTpl
*	@requires com.boneyard.annotation.engine.support.Annotation
**/
class Spec extends Annotation {

	/**
	*	Constructor
	*	@constructor
	*	@param [...attrs] {Object} constructor parameters
	*	@return com.boneyard.annotation.engine.support.core.Spec
	**/
	constructor(...attrs) {
		return super(...attrs);
	}

	/**
	*	Retrieves spec id
	*	@public
	*	@property id
	*	@type String
	**/
	get id() {
		return this.params.id;
	}

	/**
	*	Retrieves spec path
	*	@public
	*	@property path
	*	@type String
	**/
	get path() {
		return this.params.path;
	}

	/**
	*	Retrieves parent specs if defined
	*	@public
	*	@property parent
	*	@type Array
	**/
	get parent() {
		return _.defined(this.params.include) ? this.params.include : [];
	}

	/**
	*	Serialization strategy
	*	@public
	*	@override
	*	@method serialize
	*	@return Object
	**/
	serialize() {
		return _.extend({
			id: this.id,
			dependencies: this.dependencies(),
			specs: this.specs()
		}, this.author(), super.serialize());
	}

	/**
	*	Resolves spec dependency identifiers if any and returns them.
	*	@public
	*	@method dependencies
	*	@return String
	**/
	dependencies() {
		return this.specs();
	}

	/**
	*	Resolves parent specs decorators (parents) if declared and returns them
	*	@public
	*	@method specs
	*	@return String
	**/
	specs() {
		return this.parent.map((s) => { return _s.strRightBack(s, '/'); }).join(', ');
	}

	/**
	*	Resolves author annotation to be included in the top comment block.
	*	@public
	*	@method author
	*	@return Object
	**/
	author() {
		return _.defined(this.config.author) ? { author: this.config.author } : {};
	}

	/**
	*	Class Name
	*	@static
	*	@property NAME
	*	@type String
	**/
	static get NAME() {
		return 'Spec';
	}

}

export default Spec;
