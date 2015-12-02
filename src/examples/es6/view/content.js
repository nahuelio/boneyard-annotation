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
*	@bone({ id: "content", spec: "specs/application" })
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
	*	Model Setter
	*	@public
	*	@wire({ bones: ["model"], on: "model" })
	*	@property model
	*	@type Backbone.Model
	**/
	set _model(model) {
		this.model = model;
	}

	/**
	*	Update View
	*	@public
	*	@override
	*	@method update
	*	@listenTo({ spec: "specs/application", events: "change", from: "model", handler: "update" })
	*	@param model {Backbone.Model} model reference
	*	@return examples.es6.view.Content
	**/
	update(...args) {
		super.update(...args);
		// TODO
		return this;
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
