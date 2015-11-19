/**
*	Es5 Examples - Model
*	@module examples.es5.model
*	@author Patricio Ferreira <3dimentionar@gmail.com>
*/
define(['backbone'], function(Backbone) {

	/**
	*	Class Model
	*	@namespace examples.es5.model
	*	@class examples.es5.model.Model
	*	@extends Backbone.Model
	*
	*	@requires Backbone.Model
	*
	*	@spec({ id: "model" })
	*	@bone({ id: "model", spec: "model" })
	*/
	var Model = Boneyard.namespace('examples.es5.model.Model', Model.inherit({

		/**
		*	Defaults
		*	@public
		*	@wire({ id: "defaults" })
		*	@property defaults
		*	@type Object
		**/
		defaults: {},

		/**
		*	Initialize
		*	@public
		*	@method initialize
		*	@return examples.es5.model.Model
		*/
		initialize: function() {
			return Model.__super__.initialize.apply(this, arguments);
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
