/**
*	Es5 Examples - Content
*	@module examples.es5.view
*	@author Patricio Ferreira <3dimentionar@gmail.com>
*/
define(['ui/container'], function(Container) {

	/**
	*	Class Content
	*	@namespace examples.es5.view
	*	@class examples.es5.view.Content
	*	@extends ui.Container
	*
	*	@requires ui.Container
	*
	*	@bone({ id: "content", specs: ["main"] })
	*/
	var Content = Boneyard.namespace('examples.es5.view.Content', Container.inherit({

		/**
		*	Model
		*	@public
		*	@wire({ id: 'model' })
		*	@property model
		*	@type Backbone.Model
		**/
		model: null,

		/**
		*	Initialize
		*	@public
		*	@wire({ id: "title", on: "attrs.views" })
		*	@method initialize
		*	@return examples.es5.view.Content
		*/
		constructor: function(attrs) {
			return Content.__super__.initialize.apply(this, arguments);
		},

		/**
		*	Update View
		*	@public
		*	@override
		*	@method update
		*	@listenTo({ spec: "application", events: "change", from: "model" })
		*	@param model {Backbone.Model} model reference
		*	@return examples.es5.view.Content
		**/
		update: function(model) {
			Content.__super__.update.apply(this, arguments);
			// TODO
			return this;
		}

	}, {

		/**
		*	@static
		*	@property NAME
		*	@type String
		**/
		NAME: 'Content'

	}));

	return Content;

});
