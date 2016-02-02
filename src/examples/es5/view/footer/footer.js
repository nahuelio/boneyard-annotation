/**
*	Es5 Examples - Footer
*	@module examples.es5.view.footer
*	@author Patricio Ferreira <3dimentionar@gmail.com>
*/
define(['ui/container'], function(Container) {

	/**
	*	Class Footer
	*	@namespace examples.es5.view.footer
	*	@class examples.es5.view.footer.Footer
	*	@extends ui.Container
	*
	*	@requires ui.Container
	*
	*	@spec({ id: "footer", path: "specs/common/footer" })
	*	@bone({ id: "footer", specs: ["footer"], singleton: true })
	*	@component({ id: "copyright", path: "ui/basic/paragraph", specs: ['footer'], params: [{ content: "Boneyard &copy; 2016" }] })
	*/
	var Footer = Boneyard.namespace('examples.es5.view.footer.Footer', Container.inherit({

		/**
		*	Initialize
		*	@public
		*	@wire({ id: "copyright", on: "attrs.views" })
		*	@method initialize
		*	@return examples.es5.view.footer.Footer
		*/
		constructor: function(attrs) {
			return Footer.__super__.initialize.apply(this, arguments);
		}

	}, {

		/**
		*	@static
		*	@property NAME
		*	@type String
		**/
		NAME: 'Footer'

	}));

	return Footer;

});
