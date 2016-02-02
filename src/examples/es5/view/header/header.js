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
	*	@spec({ id: "header", path: "specs/common/header" })
	*	@bone({ id: "header", specs: ["header"], singleton: true })
	*	@component({ id: "title", path: "ui/basic/header", specs: ['header'], params: [{ heading: 2, title: "Header" }] })
	*/
	var Header = Boneyard.namespace('examples.es5.view.header.Header', Container.inherit({

		/**
		*	Initialize
		*	@public
		*	@wire({ id: "title", on: "attrs.views" })
		*	@method initialize
		*	@return examples.es5.view.header.Header
		*/
		constructor: function(attrs) {
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
