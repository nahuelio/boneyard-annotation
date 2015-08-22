/**
*	Basic Examples - Injection via constructor and setter
*	@module examples.basic
*	@author Patricio Ferreira <3dimentionar@gmail.com>
*/

import Backbone from 'libs/backbone';

/**
*	Class All
*	@namespace examples.basic
*	@class examples.basic.All
*
*	@requires Backbone
*/
export default class All extends Backbone.View {

	/**
	*	@constructor
	*	@HERE...
	*	@param [attrs] {Object} attributes
	*	@param [view] {Backbone.View} view
	*	@return examples.basic.All
	*/
	constructor(attrs = {}, view) {
		super(attrs);
		return this;
	}

	/**
	*	Render View
	*	@public
	*	@method render
	*	@return examples.basic.All
	*/
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
	*/
	get className() {
		return 'via-all';
	}

	/**
	*	Sets View
	*	@HERE...
	*	@public
	*	@property view
	*	@type Backbone.View
	*/
	set view(basicView) {
		this.basicView = basicView;
	}

}
