/**
*	Basic Examples - Injection via property
*	@module examples.basic
*	@author Patricio Ferreira <3dimentionar@gmail.com>
*/

import Container from 'views/container';

/**
*	Class ViaProperty
*	@namespace examples.basic
*	@class examples.basic.ViaProperty
*	@extends examples.views.Container
*
*	@requires Backbone
*/
export default class ViaProperty extends Container {

	/**
	*	@constructor
	*	@param [attrs] {Object} attributes
	*	@param [view] {Backbone.View} view
	*	@return examples.basic.ViaProperty
	*/
	constructor(attrs = {}) {
		super(attrs);
		return this;
	}

	/**
	*	@public
	*	@autowired
	*	@property component
	*	@type Backbone.View
	*/
	get component() { }

	/**
	*	Class Name
	*	@public
	*	@property className
	*	@type String
	*/
	get className() {
		return 'via-property';
	}

}
