/**
*	Basic Examples - Application View
*	@module examples
*	@author Patricio Ferreira <3dimentionar@gmail.com>
*/

import Container from 'views/container';

/**
*	Class Application
*	@namespace examples
*	@class examples.Application
*	@extends examples.views.Container
*
*	@requires examples.views.Container
*	@scan(paths = {"basic.*", "advanced.*"})
*/
class Application extends Container {

	/**
	*	@constructor
	*	@param [attrs] {Object} attributes
	*	@return examples.Application
	*/
	constructor(attrs = {}) {
		return super(attrs);
	}

	/**
	*	Views setter
	*	@public
	*	@autowired
	*	@param [exampleViews...] {Array} collection of views
	*	@method setViews
	*/
	setViews(...exampleViews) {
		this.views = exampleViews;
	}

	/**
	*	Static Application Bootstrap
	*	@static
	*	@method bootstrap
	*	@return examples.Application
	*/
	static bootstrap() {
		return new Application({ el: 'div#main' }).render();
	}

}

export default Application;
