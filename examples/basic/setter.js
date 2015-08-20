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
