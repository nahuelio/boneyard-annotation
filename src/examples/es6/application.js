/**
*	Es6 Examples - Application Bootstrap
*	@module examples.es6
*	@author Patricio Ferreira <3dimentionar@gmail.com>
*
*	@plugin({ name: "html", config: "$bone!plugins.html", specs: ["application"] })
*	@plugin({ name: "themes", config: "$bone!plugins.themes", specs: ["application"] })
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
*	@spec({ id: "main", path: "specs/application", include: ["header", "footer", "model"] })
*	@bone({ id: "application", specs: ["main"] })
*	@action({ bone: "application", method: "render", spec: "application", params: [] })
*/
class Application extends Container {

	/**
	*	Initialize
	*	@public
	*	@method initialize
	*	@wire({ id: "header", on: "attrs.views" })
	*	@wire({ id: "footer", on: "attrs.views" })
	*	@wire({ id: "content", on: "attrs.views" })
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
