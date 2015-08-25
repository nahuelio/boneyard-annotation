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
class ViaConstructor extends Container {

	/**
	*	@constructor
	*	@wire(bone = "Container", method = "constructor", name = "container")
	*	@param [attrs] {Object} attributes
	*	@return examples.basic.ViaConstructor
	*/
	constructor(attrs = {}, container) {
		super(attrs);
		return this.add(container);
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

export default ViaConstructor;
