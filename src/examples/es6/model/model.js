/**
*	Es6 Examples - Model
*	@module examples.es6.model
*	@author Patricio Ferreira <3dimentionar@gmail.com>
*/
import Backbone from 'backbone';

/**
*	Class Model
*	@namespace examples.es6.model
*	@class examples.es6.model.Model
*	@extends Backbone.Model
*
*	@requires Backbone.Model
*
*	@bone({ id: "model", specs: ["model"] })
*/
class Model extends Backbone.Model {

	/**
	*	Initialize
	*	@public
	*	@method initialize
	*	@return examples.es6.model.Model
	*/
	initialize(...args) {
		return super.initialize(...args);
	}

	/**
	*	Defaults
	*	@public
	*	@wire({ id: "defaults", on: "defaults" })
	*	@property defaults
	*	@type Object
	**/
	set _defaults(defaults) {
		this.defaults = defaults;
	}

	/**
	*	@static
	*	@property NAME
	*	@type String
	**/
	static get NAME() {
		return 'Model';
	}

}

export default Boneyard.namespace('examples.es6.model.Model', Model);
