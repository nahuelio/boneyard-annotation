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
	*	@Bone({ id: "content", spec: "application" })
	*/
	var Content = Boneyard.namespace('examples.es5.view.Content', Container.inherit({

		/**
		*	Initialize
		*	@public
		*	@method initialize
		*	@return examples.es5.view.Container
		*/
		initialize() {
			return Content.__super__.initialize.apply(this, arguments);
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
