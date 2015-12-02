/**
*	Es5 Examples - Elements
*	@module examples.es5.model
*	@author Patricio Ferreira <3dimentionar@gmail.com>
*	@ignore()
*/
define(['backbone'], function(Backbone) {

	/**
	*	Class Elements
	*	@namespace examples.es5.model
	*	@class examples.es5.model.Elements
	*	@extends Backbone.Collection
	*
	*	@requires Backbone.Collection
	*
	*	@bone({ id: "elements", spec: "specs/model/model" })
	*/
	var Elements = Boneyard.namespace('examples.es5.model.Elements', Backbone.Collection.inherit({

		/**
		*	Initialize
		*	@public
		*	@method initialize
		*	@return examples.es5.model.Elements
		*/
		initialize: function() {
			return Elements.__super__.initialize.apply(this, arguments);
		}

	}, {

		/**
		*	@static
		*	@property NAME
		*	@type String
		**/
		NAME: 'Elements'

	}));

	return Elements;

});
