/**
*	Es5 Examples - Application Bootstrap
*	@module examples.es5
*	@author Patricio Ferreira <3dimentionar@gmail.com>
*
*	@plugin({ name: "html", config: "$bone!plugins.html", spec: "application" })
*	@plugin({ name: "themes", config: "$bone!plugins.themes", spec: "application" })
*/
define(['ui/container'], function(Container) {

	/**
	*	Class Application
	*	@namespace examples.es5
	*	@class examples.es5.Application
	*	@extends ui.Container
	*
	*	@requires ui.Container
	*
	*	@spec({ id: "application", include: ["header", "footer", "model"] })
	*	@bone({ id: "application", spec: "application", module: "examples.es5.application" })
	*	@action({ bone: "application", method: "render", spec: "application" })
	**/
	var Application = Boneyard.namespace('examples.es5.Application', Container.inherit({

		/**
		*	Constructor
		*	@constructor
		*	@wire({ bones: ["header", "content", "footer"], on: "attrs", name: "views" })
		*	@param attrs {Object} constructor attributes
		*	@return examples.es5.Application
		**/
		constructor: function(attrs) {
			return Application.apply(this, arguments);
		}

	}, {

		/**
		*	@static
		*	@property NAME
		*	@type String
		**/
		NAME: 'Application',

		/**
		*	Static Application Bootstrap
		*	@static
		*	@method bootstrap
		*	@return examples.es5.Application
		**/
		bootstrap: function() {
			return new Application({ el: 'div#main' }).render();
		}

	}));

	return Application;

});
