/**
*	Basic Examples - Injection via property
*	@module examples.basic
*	@author Patricio Ferreira <3dimentionar@gmail.com>
**/

import Backbone from 'libs/backbone';

/**
*	Class ViaProperty
*	@namespace examples.basic
*	@class examples.basic.ViaProperty
*
*	@requires Backbone
**/
export default class ViaProperty extends Backbone.View {

	/**
	*	@constructor
	*	@param [attrs] {Object} attributes
	*	@param [view] {Backbone.View} view
	*	@return examples.basic.ViaProperty
	**/
	constructor(attrs = {}) {
		super(attrs);
		return this;
	}

	/**
	*	Render View
	*	@public
	*	@method render
	*	@return examples.basic.ViaProperty
	**/
	render() {
		super();
		this.view.hello();
		return this;
	}

	/**
	*	Class Name
	*	@public
	*	@property className
	*	@type String
	**/
	get className() {
		return 'via-property';
	}

	/**
	*	@HERE...
	*	@public
	*	@property view
	*	@type Backbone.View
	**/
	get view() {
		return this.view;
	}

}
