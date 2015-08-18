/**
*	Basic Examples - Injection via constructor
*	@module examples.basic
*	@author Patricio Ferreira <3dimentionar@gmail.com>
**/

import Backbone from 'libs/backbone';

/**
*	Class ViaConstructor
*	@namespace examples.basic
*	@class examples.basic.ViaConstructor
*
*	@requires Backbone
**/
export default class ViaConstructor extends Backbone.View {

	/**
	*	Class Name
	*	@public
	*	@property className
	*	@type String
	**/
	get className() {
		return 'via-constructor';
	}

	/**
	*	@constructor
	*	@HERE...
	*	@param [attrs] {Object} attributes
	*	@param [view] {Backbone.View} view
	*	@return examples.basic.ViaConstructor
	**/
	constructor(attrs = {}, view) {
		super(attrs);
		return this;
	}

	/**
	*	Render View
	*	@public
	*	@method render
	*	@return examples.basic.ViaConstructor
	**/
	render() {
		super();
		this.view.hello();
		return this;
	}

}
