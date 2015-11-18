/**
*	Es5 Examples - Application Bootstrap
*	@module examples.es5
*	@author Patricio Ferreira <3dimentionar@gmail.com>
*	@Scan({ packages = ["model", "view"] })
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
	*	@Spec({ id: "application", include: ["header", "footer"] })
	*	@Bone({ id: "application", spec: "application" })
	*/
	var Application = Boneyard.namespace('examples.es5.Application', Container.inherit({

		/**
		*	Initialize
		*	@method initialize
		*	@return examples.es5.Application
		*/
		initialize: function() {
			return Application.__super__.initialize.apply(this, arguments);
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
		*/
		bootstrap: function() {
			return new Application({ el: 'div#main' }).render();
		}

	}));

	return Application;

});
