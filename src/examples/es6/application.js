/**
*	Es6 Examples - Application Bootstrap
*	@module examples.es6
*	@author Patricio Ferreira <3dimentionar@gmail.com>
*	@Scan({ packages = ["model", "view"] })
*/
import Container from 'ui/container';

/**
*	Class Application
*	@namespace examples.es6
*	@class examples.es6.Application
*	@extends ui.Container
*
*	@requires ui.Container
*
*	@Spec({ id: "application", include: ["header", "footer"] })
*	@Bone({ id: "application", spec: "application" })
*/
class Application extends Container {

	/**
	*	Initialize
	*	@public
	*	@method initialize
	*	@return examples.es6.Application
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
		return 'Application';
	}

	/**
	*	Static Application Bootstrap
	*	@static
	*	@method bootstrap
	*	@return examples.es6.Application
	*/
	static bootstrap() {
		return new Application({ el: 'div#main' }).render();
	}

}

export default Boneyard.namespace('examples.es6.Application', Application);
