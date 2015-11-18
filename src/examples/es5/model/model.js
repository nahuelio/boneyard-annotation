/**
*	Es5 Examples - Model
*	@module examples.es5.model
*	@author Patricio Ferreira <3dimentionar@gmail.com>
*/
defined(['backbone'], function(Backbone) {

	/**
	*	Class Model
	*	@namespace examples.es5.model
	*	@class examples.es5.model.Model
	*	@extends Backbone.Model
	*
	*	@requires Backbone.Model
	*
	*	@Spec({ id: "model" })
	*	@Bone({ id: "model", spec: "model" })
	*/
	var Model = Boneyard.namespace('examples.es5.model.Model', Model.inherit({

		/**
		*	Defaults
		*	@public
		*	@property defaults
		*	@type Object
		*
		*	Scope: Field
		*	@Wire({ id: 'scheme' })
		**/
		defaults: {},

		/**
		*	Initialize
		*	@public
		*	@method initialize
		*	@return examples.es5.model.Model
		*/
		initialize(...args) {
			return super.initialize(...args);
		}

	}, {

		/**
		*	@static
		*	@property NAME
		*	@type String
		**/
		NAME: 'Model'

	}));

	return Model;

});
