/**
*	Basic Examples - Injection via constructor
*	@module examples.basic
*	@author Patricio Ferreira <3dimentionar@gmail.com>
*/

import Container from 'views/container';

/**
*	Class ViaConstructor
*	@namespace examples.basic
*	@class examples.basic.ViaConstructor
*	@extends examples.views.Container
*
*	@requires examples.views.Container
*/
export default class ViaConstructor extends Container {

	/**
	*	@constructor
	*	@autowired
	*	@param [attrs] {Object} attributes
	*	@param [component] {examples.views.Component} Component View
	*	@return examples.basic.ViaConstructor
	*/
	constructor(attrs = {}, component) {
		super(attrs);
		return this.add(component);
	}

	/**
	*	Class Name
	*	@public
	*	@property className
	*	@type String
	*/
	get className() {
		return 'via-constructor';
	}

}
