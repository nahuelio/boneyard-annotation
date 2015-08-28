/**
*	Annotation Context Module
*	@module com.spinal.annotation.support
*	@author Patricio Ferreira <3dimentionar@gmail.com>
**/

/**
*	Class Context
*	@namespace com.spinal.annotation.support
*	@class com.spinal.annotation.support.Context
**/
class Context {

	/**
	*	Constructor
	*	@constructor
	*	@param [attrs] {Object} attributes
	*	@return com.spinal.annotation.support.Context
	**/
	constructor(attrs = {}) {
		return this;
	}

	/**
	*	Static Constructor
	*	@static
	*	@method new
	*	@return com.spinal.annotation.support.Context
	**/
	static new() {
		return new Context();
	}

}
export default Context;
