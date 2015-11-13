/**
*	Examples Container View
*	@module examples.views
*	@author Patricio Ferreira <3dimentionar@gmail.com>
*/

import {View} from 'backbone';

/**
*	Class Container
*	@namespace examples.views
*	@class examples.views.Container
*	@bone(id = "Container")
*
*	@requires Backbone
*/
class Container extends View {

	/**
	*	Constructor
	*	@constructor
	*	@param [attrs] {Object} attributes
	*	@return examples.views.Container
	*/
	constructor(attrs = {}) {
		super(attrs);
		this.id = (attrs.id) ? attrs.id : this.cid;
		return this.properties(attrs);
	}

	/**
	*	Properties
	*	@public
	*	@chainable
	*	@method properties
	*	@return examples.views.Container
	*/
	properties(attrs) {
		if(this.parent) this.parent.$el.append(this.el);
		return _.extend(this, { views: [] }, _.omit(attrs, _.keys(_.omit(this, _.functions(this)))));
	}

	/**
	*	Adds a new view or a collection of views inside this container
	*	@public
	*	@method add
	*	@param [...views] {Backbone.View} view or views to be added
	*	@return examples.views.Container
	*/
	add(...views) {
		this.views = this.views.concat(views);
		return this;
	}

	remove(index) {
		// TODO
	}

	/**
	*	Retrieves the view at a given index inside the collection
	*	@public
	*	@method at
	*	@param at {Number} index
	*	@return Backbone.View
	*/
	at(index) {
		return (index < this.views.length) ? this.views[index] : null;
	}

	/**
	*	Returns true if the view exists, otherwise false
	*	@public
	*	@method exists
	*	@return Boolean
	*/
	exists(id) {
		// return this.find();
	}

	/**
	*	Find View by a given id
	*	@public
	*	@method find
	*	@param id {String} view id
	*	@return Backbone.View
	*/
	find(id = "") {
		return this.findBy(_.bind(function(v) { return (v.id === id); }, this));
	}

	/**
	*	Find Views by Custom predicate
	*	@public
	*	@method findBy
	*	@param predicate {Function} predicate function
	*	@return
	*/
	findBy(predicate) {
		if(!predicate) return [];
		return _.compact(this.views.map(v => { return predicate(v) ? v : null }));
	}

	/**
	*	Default Before Render Handler
	*	@public
	*	@chainable
	*	@method beforeRender
	*	@return examples.views.Container
	*/
	beforeRender() {
		this.clear();
		return this.trigger(Container.Events.beforeRender, this);
	}

	/**
	*	Default Data Interpolation
	*	@public
	*	@method data
	*	@param [params] {Object} optional params
	*	@return Object
	*/
	data(params = {}) {
		return (this.model) ? _.extend(params, this.model.toJSON()) : params;
	}

	/**
	*	Projects Model into a template and renders the result into this container
	*	@public
	*	@chainable
	*	@method project
	*	@param [options] {Object} projection's options
	*	@param [params] {Object} optional params
	*	@return examples.views.Container
	*/
	project(options = {}, params) {
		if(this.template) this.$el[options.method](this.template(this.data(params)));
		return this;
	}

	/**
	*	Render View
	*	@public
	*	@chainable
	*	@method render
	*	@param [options] {Array} render options
	*	@param [params] {Object} optional params
	*	@return examples.views.Container
	*/
	render(options = { method: Container.Method.append }, params) {
		this.beforeRender();
		this.project(options, params);
		this.views.forEach(v => { v.render(options, params) });
		return this.trigger(Container.Events.render, this).afterRender();
	}

	/**
	*	Default After Render Handler
	*	@public
	*	@chainable
	*	@method afterRender
	*	@return examples.views.Container
	*/
	afterRender() {
		return this.trigger(Container.Events.afterRender, this).delegateEvents();
	}

	/**
	*	Clear View
	*	@public
	*	@chainable
	*	@method clear
	*	@return
	*/
	clear() {
		this.$el.children().remove();
		return this.undelegateEvents();
	}

	/**
	*	Class Name
	*	@public
	*	@property className
	*	@type String
	*/
	get className() {
		return 'container';
	}

	/**
	*	Events
	*	@static
	*	@property Events
	*	@type Object
	*/
	static get Events() {
		return {
			beforeRender: 'examples:views:container:beforeRender',
			render: 'examples:views:container:render',
			afterRender: 'examples:views:container:afterRender'
		};
	}

	/**
	*	Render Methods
	*	@static
	*	@property Method
	*	@type Object
	*/
	static get Method() {
		return {
			append: 'append',
			prepend: 'prepend',
			html: 'html',
			text: 'text'
		};
	}

}

export default Container;
