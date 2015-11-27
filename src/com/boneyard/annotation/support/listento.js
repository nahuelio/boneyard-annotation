/**
*	@module com.boneyard.annotation.support
*	@author Patricio Ferreira <3dimentionar@gmail.com>
**/

import Action from './action';

/**
*	Class ListenTo
*	@namespace com.boneyard.annotation.support
*	@class com.boneyard.annotation.support.ListenTo
*	@extends com.boneyard.annotation.support.Action
*
*	@requires com.boneyard.annotation.support.Action
**/
class ListenTo extends Action {

	/**
	*	Constructor
	*	@constructor
	*	@param [attrs] {Object} attributes
	*	@return com.boneyard.annotation.support.ListenTo
	**/
	constructor(attrs = {}) {
		return super(attrs);
	}

	/**
	*	Retrieves target bone on this Action
	*	FIXME: Resolve Bone by using something???
	*	@public
	*	@override
	*	@property bone
	*	@type String
	**/
	get bone() {
		// TODO
		return 'TODO';
	}

	/**
	*	Retrieves target bone method to call on this Action
	*	@public
	*	@override
	*	@property method
	*	@type String
	**/
	get method() {
		return 'listenTo';
	}

	/**
	*	Resolves ListenTo handler
	*	FIXME: Resolve Handler by using Context
	*	@public
	*	@property handler
	*	@type String
	**/
	get handler() {
		return _.defined(this.params.handler) ? this.params.handler : '';
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
			_.defined(metadata.events) && _.isString(metadata.events) &&
			_.defined(metadata.from) && _.isString(metadata.from);
	}

	/**
	*	Serialization
	*	@public
	*	@override
	*	@method serialize
	*	@return Object
	**/
	serialize() {
		return { [`$bone!${this.bone}.${this.method}`]: [this.params.from, this.params.events, this.handler] };
	}

	/**
	*	Retrieves list of context in which this annotation should be found
	*	@static
	*	@property contexts
	*	@type Array
	**/
	get contexts() {
		return ['__class', '__method'];
	}

	/**
	*	Class Name
	*	@static
	*	@property NAME
	*	@type String
	**/
	static get NAME() {
		return 'ListenTo';
	}

}

export default ListenTo;
