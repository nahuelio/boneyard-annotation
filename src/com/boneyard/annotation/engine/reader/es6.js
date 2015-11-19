/**
*	@module com.boneyard.annotation.reader
*	@author Patricio Ferreira <3dimentionar@gmail.com>
**/

import Reader from './reader';
import Context from '../annotation/context';

/**
*	Class Es6Reader
*	@namespace com.boneyard.annotation.reader
*	@class com.boneyard.annotation.reader.Es6Reader
*	@extends com.boneyard.annotation.reader.Reader
*
*	@requires com.boneyard.annotation.reader.Reader
*	@requires com.boneyard.annotation.engine.annotation.Context
**/
class Es6Reader extends Reader {

	/**
	*	Constructor
	*	@constructor
	*	@param [...args] {Arguments} constructor arguments
	*	@return com.boneyard.annotation.reader.Es6Reader
	**/
	constructor(...args) {
		super(...args);
		return this;
	}

	/**
	*	Evaluates token to determine context on found annotations
	*	@public
	*	@override
	*	@method onContext
	*	@param token {String} token to be analyzed
	*	@return com.boneyard.annotation.support.Annotation
	**/
	onContext(token) {
		// TODO: Implement for ES6
		return super.context(token);
	}

	/**
	*	Annotation Contexts for this Reader
	*	@static
	*	@property Context
	*	@type Object
	**/
	static get Contexts() {
		return {
			CLASS: 'class <%= name %>',
			METHOD: '<%= name %>()',
			PROPERTY: 'get <%= name %>()'
		};
	}

}

export default Es6Reader;
