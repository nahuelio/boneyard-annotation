/**
*	Es6 Examples - Header
*	@module examples.es6.view.header
*	@author Patricio Ferreira <3dimentionar@gmail.com>
*/
import Container from 'ui/container';

/**
*	Class Header
*	@namespace examples.es6.view.header
*	@class examples.es6.view.header.Header
*	@extends ui.Container
*
*	@requires ui.Container
*
*	@Spec({ id: "header" })
*	@Bone({ id: "header", spec: "header" })
*/
class Header extends Container {

	/**
	*	Initialize
	*	@public
	*	@method initialize
	*	@return examples.es6.view.header.Header
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
		return 'Header';
	}

}

export default Boneyard.namespace('examples.es6.view.header.Header', Header);
