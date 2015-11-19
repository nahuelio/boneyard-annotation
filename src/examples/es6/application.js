/**
*	Es6 Examples - Application Bootstrap
*	@module examples.es6
*	@author Patricio Ferreira <3dimentionar@gmail.com>
*
*	@scan({ packages = ["config", "model", "view"] })
*	@plugin({ name: "html", config: "$bone!plugins.html" })
*	@plugin({ name: "themes", config: "$bone!plugins.themes" })
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
*	@spec({ id: "application", include: ["header", "footer", "model"] })
*	@bone({ id: "application", spec: "application" })
*/
class Application extends Container {

	/**
	*	Initialize
	*	@public
	*	@method initialize
	*	@wire({ bones: "header,footer", on: "attrs", name: "views" })
	*	@param attrs {Object} constructor attributes
	*	@return examples.es6.Application
	*/
	constructor(attrs) {
		return super(attrs);
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
