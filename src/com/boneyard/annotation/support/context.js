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
