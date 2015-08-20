/**
*	Basic Examples - Application View
*	@module examples.common
*	@author Patricio Ferreira <3dimentionar@gmail.com>
**/

import Backbone from 'backbone';

/**
*	Class Application
*	@namespace examples.common
*	@class examples.common.Application
*
*	@requires Backbone
**/
export default class Application extends Backbone.View {

	/**
	*	@constructor
	*	@param [attrs] {Object} attributes
	*	@return examples.common.Application
	**/
	constructor(attrs = {}) {
		super(attrs);
		return this;
	}

	/**
	*	Render View
	*	@public
	*	@method render
	*	@return examples.common.Application
	**/
	render() {
		return this;
	}

	/**
	*	Static Application Bootstrap
	*	@static
	*	@method bootstrap
	*	@return examples.common.Application
	**/
	static bootstrap() {
		return new Application({ el: 'div#main' }).render();
	}

}
