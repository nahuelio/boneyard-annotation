/**
*	Es6 Examples - Elements
*	@module examples.es6.model
*	@author Patricio Ferreira <3dimentionar@gmail.com>
*	@ignore()
*/
import Backbone from 'backbone';

/**
*	Class Elements
*	@namespace examples.es6.model
*	@class examples.es6.model.Elements
*	@extends Backbone.Collection
*
*	@requires Backbone.Collection
*
*	@bone({ id: "elements", spec: "specs/model/model" })
*/
class Elements extends Backbone.Collection {

	/**
	*	Constructor
	*	@constructor
	*	@method initialize
	*	@return examples.es6.model.Elements
	*/
	constructor(...args) {
		return super(...args);
	}

	/**
	*	@static
	*	@property NAME
	*	@type String
	**/
	static get NAME() {
		return 'Elements';
	}

}

export default Boneyard.namespace('examples.es6.model.Elements', Elements);
