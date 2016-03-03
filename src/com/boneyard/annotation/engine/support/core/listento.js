/**
*	@module com.boneyard.annotation.engine.support.core
*	@author Patricio Ferreira <3dimentionar@gmail.com>
**/

import Action from './action';

/**
*	Class ListenTo
*	@namespace com.boneyard.annotation.engine.support.core
*	@class com.boneyard.annotation.engine.support.core.ListenTo
*	@extends com.boneyard.annotation.engine.support.core.Action
*
*	@requires com.boneyard.annotation.engine.support.core.Action
**/
class ListenTo extends Action {

	/**
	*	Constructor
	*	@constructor
	*	@param [...attrs] {Object} constructor parameters
	*	@return com.boneyard.annotation.engine.support.core.ListenTo
	**/
	constructor(...attrs) {
		return super(...attrs);
	}

	/**
	*	Retrieves target bone on this Action
	*	FIXME: Resolve Bone by using what???
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
	*	@public
	*	@property handler
	*	@type String
	**/
	get handler() {
		// TODO: Resolve Handler by using Context
		return '';
	}

	/**
	*	Serialization
	*	@public
	*	@override
	*	@method serialize
	*	@return Object
	**/
	serialize() {
		return {
			target: `$bone!${this.bone}.${this.method}`,
			params: JSON.stringify([this.params.from, this.params.events, this.handler])
		};
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
