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
	*	@param [attrs] {Object} attributes
	*	@return com.boneyard.annotation.support.Context
	**/
	constructor(attrs = {}) {
		return this;
	}
	/**
	*	Returns true if token is
	*	@static
	*	@method validate
	*	@param token {String} token to evaluates
	*	@param contexts {Array} list of context used to evaluate token against
	*	@return com.boneyard.annotation.support.Context
	**/
	static validate(token, contexts) {
		// FIXME: !!!
		return _.some(_.invoke(Context.CLASS, 'test', token));
	}

	/**
	*	Static Constructor
	*	@static
	*	@method new
	*	@return com.boneyard.annotation.support.Context
	**/
	static new() {
		return new Context();
	}

}
export default Context;
