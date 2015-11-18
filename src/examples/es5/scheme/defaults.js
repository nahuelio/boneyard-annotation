/**
*	Es5 Examples - Scheme
*	@module examples.es5.scheme
*	@author Patricio Ferreira <3dimentionar@gmail.com>
*/
defined([], function() {

	/**
	*	Model Scheme
	*	@Json({ id: "scheme", spec: "model" })
	**/
	var Scheme = {

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

	return Scheme;

});
