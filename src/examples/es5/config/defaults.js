/**
*	Es5 Examples - Defaults
*	@module examples.es5.config
*	@author Patricio Ferreira <3dimentionar@gmail.com>
*/
define([], function() {

	/**
	*	Defaults
	*	@public
	*	@json({ id: "defaults", specs: ["model"] })
	*	@property Defaults
	*	@type Object
	**/
	var Defaults = {

		/**
		*	Title
		*	@public
		*	@property title
		*	@type String
		**/
		title: "Hello World",

		/**
		*	Content
		*	@public
		*	@property content
		*	@type String
		**/
		content: "Boneyard Annotation"

	};

	return Defaults;

});
