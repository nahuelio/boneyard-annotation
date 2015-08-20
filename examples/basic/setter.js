/**
*	Basic Examples - Injection via setter
*	@module examples.basic
*	@author Patricio Ferreira <3dimentionar@gmail.com>
**/

import Container from 'views/container';

/**
*	Class ViaSetter
*	@namespace examples.basic
*	@class examples.basic.ViaSetter
*	@extends examples.views.Container
*
*	@requires Backbone
**/
export default class ViaSetter extends Container {

	/**
	*	Constructor
	*	@constructor
	*	@param [attrs] {Object} attributes
	*	@return examples.basic.ViaSetter
	**/
	constructor(attrs = {}) {
		super(attrs);
		return this;
	}

	/**
	*	Class Name
	*	@public
	*	@property className
	*	@type String
	**/
	get className() {
		return 'via-setter';
	}

	/**
	*	Sets View
	*	@HERE...
	*	@public
	*	@method view
	*	@param basicView {Backbone.View} dependent view
	**/
	set view(basicView) {
		this.basicView = basicView;
	}

}
