/**
*	@module com.boneyard.annotation.reader
*	@author Patricio Ferreira <3dimentionar@gmail.com>
**/

import Reader from './reader';
import Context from '../annotation/context';

/**
*	Class Es5Reader
*	@namespace com.boneyard.annotation.reader
*	@class com.boneyard.annotation.reader.Es5Reader
*	@extends com.boneyard.annotation.reader.Reader
*
*	@requires com.boneyard.annotation.reader.Reader
*	@requires com.boneyard.annotation.engine.annotation.Context
**/
class Es5Reader extends Reader {

	/**
	*	Constructor
	*	@constructor
	*	@param [attrs] {Object} attributes
	*	@return com.boneyard.annotation.reader.Es5Reader
	**/
	constructor(...args) {
		return super(...args);
	}

	/**
	*	Retrieves annotation list of contexts
	*	@public
	*	@method contexts
	*	@param annotation {com.boneyard.annotation.engine.annotation.Annotation} annotation reference
	*	@return Array
	**/
	contexts(annotation) {
		return _.flatten(annotation.contexts.map((ctx) => { return { name: ctx, re: this[ctx] }; }));
	}

	/**
	*	Context Handler
	*	@public
	*	@override
	*	@method resolve
	*	@param token {String} token to evaluate
	*	@return com.boneyard.annotation.support.Es5Reader
	**/
	onContext(token) {
		let annotations = super.onContext(token);
		return annotations.map((a) => { this.resolve(a, token); });
	}

	/**
	*	Resolves annotation context when valid, otherwise this method will throw an exception.
	*	@public
	*	@method resolve
	*	@param annotation {com.boneyard.annotation.engine.annotation.Annotation} annotation reference
	*	@param token {String} token reference
	*	@return com.boneyard.annotation.engine.annotation.Annotation
	**/
	resolve(annotation, token) {
		let ctx = null;
		if(!(ctx = Context.validate(token, this.contexts(annotation), annotation))) return annotation;
		annotation.context = Context.new(_.extend(ctx, { token: token, annotation: annotation }));
		return annotation;
	}

	/**
	*	Retrieves a list of RegExps used to calculate class context
	*	@public
	*	@property __module
	*	@type Array
	**/
	get __class() {
		return [
			/^define/i, // define
			/^\s*(var\s+\w+|(?!var\b)\w+)\s*=\w*/i, // > var <v> =
			/^\s*return(.*)\s+function\s*\(.*\)\s*{/i, // > return function() {
			/^\s*function\s+.+\s*{$/i // > function <v>() {
		];
	}

	/**
	*	Retrieves a list of RegExps used to calculate constructor context
	*	@public
	*	@property __module
	*	@type Array
	**/
	get __constructor() {
		return [/^constructor:/i];
	}

	/**
	*	Retrieves a list of RegExps used to calculate field context
	*	@public
	*	@property __module
	*	@type Array
	**/
	get __field() {
		return [/^\w+\:\s*(?!function\b)[a-zA-Z0-9\W]+,$/i];
	}

	/**
	*	Retrieves a list of RegExps used to calculate method context
	*	@public
	*	@property __module
	*	@type Array
	**/
	get __method() {
		return [/^\w+\:\s*function\s*\(.*\)\s*{$/i];
	}

}

export default Es5Reader;
