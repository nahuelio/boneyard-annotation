/**
*	Es6 Examples - Application Bootstrap
*	@module examples.es6
*	@author Patricio Ferreira <3dimentionar@gmail.com>
*
*	@plugin({ name: "html", config: "$bone!plugins.html", spec: "specs/application" })
*	@plugin({ name: "themes", config: "$bone!plugins.themes", spec: "specs/application" })
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
*	@spec({ id: "specs/application", include: ["specs/common/header", "specs/common/footer", "specs/model/model"] })
*	@bone({ id: "application", spec: "specs/application" })
*	@action({ bone: "application", method: "render", spec: "specs/application" })
*/
class Application extends Container {

	/**
	*	Initialize
	*	@public
	*	@method initialize
	*	@wire({ bones: ["header", "content", "footer"], on: "attrs", name: "views" })
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
