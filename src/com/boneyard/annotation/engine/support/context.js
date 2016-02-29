/**
*	@module com.boneyard.annotation.support
*	@author Patricio Ferreira <3dimentionar@gmail.com>
**/
import _ from 'underscore';
import _s from 'underscore.string';

/**
*	Class Context
*	@namespace com.boneyard.annotation.support
*	@class com.boneyard.annotation.support.Context
*
*	@requires underscore
**/
class Context {

	/**
	*	Constructor
	*	@constructor
	*	@param [...params] {Array} constructor parameters
	*	@return com.boneyard.annotation.support.Context
	**/
	constructor(...params) {
		params.unshift(this);
		return _.extend.apply(this, params);
	}

	/**
	*	Returns true if the current context was found in a given context name. Otherwise, returns false.
	*	@public
	*	@method isContext
	*	@param [name] {String} context name
	*	@return Boolean
	**/
	isContext(name = '') {
		return (_.contains(_.values(Context.TYPES), name) && this.name === name);
	}

	/**
	*	Returns true if annotations context can be resolved on next immediate token that it's not inside a comment,
	*	otherwise it will throw an exception.
	*	@static
	*	@throws Error
	*	@method validate
	*	@param token {String} token to evaluates
	*	@param cxts {Array} list of context used to evaluate token against
	*	@param annotation {com.boneyard.annotation.engine.annotation.Annotation} annotation reference
	*	@return com.boneyard.annotation.support.Context
	**/
	static validate(token, cxts, annotation) {
		var context = _.find(cxts, function(ctx) { return _.some(_.invoke(ctx.re, 'test', token)) ? ctx : null; }, this);
		if(!context) throw new Error(Context.exception(annotation));
		return context;
	}

	/**
	*	Static Constructor
	*	@static
	*	@method new
	*	@param [...params] {Array} constructor parameters
	*	@return com.boneyard.annotation.support.Context
	**/
	static new(...params) {
		return new Context(...params);
	}

	/**
	*	Retrieves Exception Message for Context Resolution on a given annotation.
	*	@static
	*	@property exception
	*	@type String
	**/
	static exception(annotation) {
		return `Context couldn't be resolved for @${annotation.name} located in ${annotation.path}.
			 Annotation @${annotation.name} supports the following scopes:
			 ${_s.trim(annotation.contexts.join(','), '_')}`.replace(/(\n|\t)/gi, '');
	}

	/**
	*	Context Types
	*	@static
	*	@property TYPES
	*	@type Object
	**/
	static get TYPES() {
		return {
			Class: '__class',
			Constructor: '__constructor',
			Method: '__method',
			Field: '__field'
		};
	}

}
export default Context;
