/**
*	Es5 Examples - Header
*	@module examples.es5.view.header
*	@author Patricio Ferreira <3dimentionar@gmail.com>
*/
define(['ui/container'], function(Container) {

	/**
	*	Class Header
	*	@namespace examples.es5.view.header
	*	@class examples.es5.view.header.Header
	*	@extends ui.Container
	*
	*	@requires ui.Container
	*
	*	@spec({ id: "header" })
	*	@bone({ id: "header", spec: "header" })
	*/
	var Header = Boneyard.namespace('examples.es5.view.header.Header', Container.inherit({

		/**
		*	Initialize
		*	@public
		*	@method initialize
		*	@return examples.es5.view.header.Header
		*/
		initialize: function() {
			return Header.__super__.initialize.apply(this, arguments);
		}

	}, {

		/**
		*	@static
		*	@property NAME
		*	@type String
		**/
		NAME: 'Header'

	}));

	return Header;

});
