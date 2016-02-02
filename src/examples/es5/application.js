/**
*	Es5 Examples - Application Bootstrap
*	@module examples.es5
*	@author Patricio Ferreira <3dimentionar@gmail.com>
*
*	@plugin({ name: "html", config: "$bone!plugins.html", specs: ["main"] })
*	@plugin({ name: "themes", config: "$bone!plugins.themes", specs: ["main"] })
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
	*	@spec({ id: "main", path: "specs/application", include: ["header", "footer", "model"] })
	*	@bone({ id: "application", specs: ["main"], singleton: true })
	*	@action({ bone: "application", method: "render", spec: "application", params: [] })
	**/
	var Application = Boneyard.namespace('examples.es5.Application', Container.inherit({

		/**
		*	Constructor
		*	@constructor
		*	@wire({ id: "header", on: "attrs.views" })
		*	@wire({ id: "content", on: "attrs.views" })
		*	@wire({ id: "footer", on: "attrs.views" })
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
