/**
*	Basic Examples - Injection via setter
*	@module examples.basic
*	@author Patricio Ferreira <3dimentionar@gmail.com>
**/

import Backbone from 'libs/backbone';

/**
*	Class ViaSetter
*	@namespace examples.basic
*	@class examples.basic.ViaSetter
*
*	@requires Backbone
**/
export default class ViaSetter extends Backbone.View {

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
	*	@constructor
	*	@param [attrs] {Object} attributes
	*	@param [view] {Backbone.View} view
	*	@return examples.basic.ViaSetter
	**/
	constructor(attrs = {}, view) {
		super(attrs);
		return this;
	}

	/**
	*	Render View
	*	@public
	*	@method render
	*	@return examples.basic.ViaSetter
	**/
	render() {
		super();
		this.view.hello();
		return this;
	}

	/**
	*	Sets View
	*	@HERE...
	*	@public
	*	@property view
	*	@type Backbone.View
	**/
	set view(basicView) {
		this.basicView = basicView;
	}

}
