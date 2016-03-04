/**
*	@module com.boneyard.annotation.engine.ast
*	@author Patricio Ferreira <3dimentionar@gmail.com>
**/

import _ from 'underscore';
import _s from 'underscore.string';
import  {EventEmitter} from 'events';

/**
*	Class ASTMetadata
*	@namespace com.boneyard.annotation.engine.ast
*	@class com.boneyard.annotation.engine.ast.ASTMetadata
*	@extends events.EventEmitter
*
*	@requires underscore
*	@requires underscore.string
*	@requires events.EventEmitter
**/
class ASTMetadata extends EventEmitter {

	/**
	*	@constructor
	*	@param [attrs] {Object} constructor attributes
	*	@return com.boneyard.annotation.engine.ast.ASTMetadata
	**/
	constructor(attrs = {}) {
		return super();
	}

	/**
	*	Default AST metadata serialization strategy
	*	@public
	*	@method serialize
	*	@return com.boneyard.annotation.engine.ast.ASTMetadata
	**/
	serialize() {
		return this;
	}

	/**
	*	Default AST metadata deserialization strategy
	*	@public
	*	@method deserialize
	*	@return Object
	**/
	deserialize() {
		return { filename: this._filename };
	}

	/**
	*	Absolute path to File
	*	@public
	*	@property filename
	*	@type String
	**/
	get filename() {
		return this._filename;
	}

	/**
	*	Retrieve file comments
	*	@public
	*	@property comments
	*	@type Map
	**/
	get comments() {
		return this._comments;
	}

	/**
	*	Retrieve file annotations
	*	@public
	*	@property comments
	*	@type Map
	**/
	get annotations() {
		// TODO: Filter annotations inside comments;
	}

}

export default ASTMetadata;
