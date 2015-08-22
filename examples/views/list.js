/**
*	Examples List View
*	@module examples.views
*	@author Patricio Ferreira <3dimentionar@gmail.com>
*/

import Container from 'views/container';
import ListTemplate from 'text!partials/list.html';

/**
*	Class List
*	@namespace examples.views
*	@class examples.views.List
*	@bone(id = 'list')
*
*	@requires examples.views.Container
*	@requires examples.partials.ListTemplate
*/
export default class List extends Container {

	/**
	*	@constructor
	*	@param [attrs] {Object} attributes
	*	@return examples.views.List
	*/
	constructor(attrs = {}) {
		return super(attrs);
	}

	/**
	*	Template
	*	@public
	*	@method template
	*	@param [model] {Object} model reference
	*	@return String
	*/
	template(model) {
		return model.map((v, k) => { return ListTemplate });
	}

	/**
	*	Tag Name
	*	@public
	*	@property tagName
	*	@type String
	*/
	get tagName() {
		return 'ul';
	}

	/**
	*	Class Name
	*	@public
	*	@property className
	*	@type String
	*/
	get className() {
		return 'list-group';
	}

}
