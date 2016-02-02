/**
*	@module com.boneyard.annotation.support
*	@author Patricio Ferreira <3dimentionar@gmail.com>
**/

import Action from './action';
import Context from '../engine/annotation/context';

/**
*	Class ListenTo
*	@namespace com.boneyard.annotation.support
*	@class com.boneyard.annotation.support.ListenTo
*	@extends com.boneyard.annotation.support.Action
*
*	@requires com.boneyard.annotation.support.Action
*	@requires com.boneyard.annotation.engine.annotation.Context
**/
class ListenTo extends Action {

	/**
	*	Constructor
	*	@constructor
	*	@param [...attrs] {Object} constructor parameters
	*	@return com.boneyard.annotation.support.ListenTo
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
	*	Retrieves list of context in which this annotation should be found
	*	@static
	*	@property contexts
	*	@type Array
	**/
	get contexts() {
		return [Context.TYPES.Method];
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
