/**
*	@module com.boneyard.annotation.support
*	@author Patricio Ferreira <3dimentionar@gmail.com>
**/

/**
*	Class Context
*	@namespace com.boneyard.annotation.support
*	@class com.boneyard.annotation.support.Context
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
	*	Returns true if annotations context can be resolved on next immediate token that it's not inside a comment,
	*	otherwise it will throw an exception.
	*	@static
	*	@throws Error
	*	@method validate
	*	@param token {String} token to evaluates
	*	@param contexts {Array} list of context used to evaluate token against
	*	@return com.boneyard.annotation.support.Context
	**/
	static validate(token, contexts) {
		if(!_.some(_.invoke(contexts, 'test', token)))
			throw new Error("Context resolution couldn't be resolved for ... [list of annotations]");
		return true;
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

}
export default Context;
