/**
*	Basic Examples - Injection via method
*	@module examples.basic
*	@author Patricio Ferreira <3dimentionar@gmail.com>
*/

import Container from 'views/container';

/**
*	Class ViaMethod
*	@namespace examples.basic
*	@class examples.basic.ViaMethod
*	@extends examples.views.Container
*
*	@requires Backbone
*/
class ViaMethod extends Container {

	/**
	*	Constructor
	*	@constructor
	*	@param [attrs] {Object} attributes
	*	@return examples.basic.ViaMethod
	*/
	constructor(attrs = {}) {
		super(attrs);
		return this;
	}

	/**
	*	Class Name
	*	@public
	*	@property className
	*	@type String
	*/
	get className() {
		return 'via-method';
	}

	/**
	*	Sets Component
	*	@wire(bone = "Container", method = "add", name = "view")
	*	@public
	*	@override
	*	@method add
	*	@param component {Backbone.View} component view
	*	@return examples.basic.ViaMethod
	*/
	add(view) {
		return super().add(view);
	}

}

export default ViaMethod;
