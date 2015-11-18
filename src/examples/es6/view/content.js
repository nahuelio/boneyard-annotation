/**
*	Es6 Examples - Content
*	@module examples.es6.view
*	@author Patricio Ferreira <3dimentionar@gmail.com>
*/
import Container from 'ui/container';

/**
*	Class Content
*	@namespace examples.es6.view
*	@class examples.es6.view.Content
*	@extends ui.Container
*
*	@requires ui.Container
*
*	@Bone({ id: "content", spec: "application" })
*/
class Content extends Container {

	/**
	*	Initialize
	*	@public
	*	@method initialize
	*	@return examples.es6.view.Content
	*/
	initialize(...args) {
		return super.initialize(...args);
	}

	/**
	*	@static
	*	@property NAME
	*	@type String
	**/
	static get NAME() {
		return 'Content';
	}

}

export default Boneyard.namespace('examples.es6.view.Content', Content);
