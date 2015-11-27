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
	*	@spec({ id: "specs/common/footer" })
	*	@bone({ id: "footer", spec: "specs/common/footer" })
	*/
	var Footer = Boneyard.namespace('examples.es5.view.footer.Footer', Container.inherit({

		/**
		*	Initialize
		*	@public
		*	@method initialize
		*	@return examples.es5.view.footer.Footer
		*/
		initialize: function() {
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
