/**
*	Basic Examples - Application View
*	@module examples
*	@author Patricio Ferreira <3dimentionar@gmail.com>
**/

import Container from 'views/container';

/**
*	Class Application
*	@namespace examples
*	@class examples.Application
*	@extends examples.views.Container
*	@scan(['basic.*', 'advanced.*'])
*
*	@requires examples.views.Container
**/
export default class Application extends Container {

	/**
	*	@constructor
	*	@param [attrs] {Object} attributes
	*	@return examples.Application
	**/
	constructor(attrs = {}) {
		return super(attrs);
	}

	/**
	*	Views setter
	*	@public
	*	@autowired
	*	@param [exampleViews...] {Array} collection of views
	*	@method setViews
	**/
	set setViews(...exampleViews) {
		this.views = exampleViews;
	}

	/**
	*	Static Application Bootstrap
	*	@static
	*	@method bootstrap
	*	@return examples.Application
	**/
	static bootstrap() {
		return new Application({ el: 'div#main' }).render();
	}

}
