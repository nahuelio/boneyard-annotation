/**
*	@module com.boneyard.annotation.writer
*	@author Patricio Ferreira <3dimentionar@gmail.com>
**/

import {resolve} from 'path';
import _ from 'underscore';
import _s from 'underscore.string';
import {EventEmitter} from 'events';
import Factory from '../../util/factory';
import Logger from '../../util/logger';

/**
*	Class Instrumenter
*	@namespace com.boneyard.annotation.writer
*	@class com.boneyard.annotation.writer.Instrumenter
*
*	@requires path
*	@requires underscore
*	@requires underscore.string
*	@requires events.EventEmitter
*	@requires com.boneyard.annotation.util.Factory
*	@requires com.boneyard.annotation.util.Logger
**/
class Instrumenter extends EventEmitter {

	/**
	*	Constructor
	*	@constructor
	*	@return com.boneyard.annotation.writer.Instrumenter
	**/
	constructor(writer) {
		super();
		this._writer = writer;
		this._factory = new Factory(resolve(__dirname, './templates'));
		return this;
	}

	/**
	*	Retrieves writer used by this instrumenter
	*	@public
	*	@property writer
	*	@type com.boneyard.annotation.engine.writer.Writer
	**/
	get writer() {
		return this._writer;
	}

	/**
	*	Retrieves Writer Factory
	*	@public
	*	@property factory
	*	@type com.boneyard.annotation.util.Factory
	**/
	get factory() {
		return this._factory;
	}

	/**
	*	Registers Factory template
	*	@public
	*	@method register
	*	@param path {String} template path
	*	@return com.boneyard.annotation.engine.writer.Instrumenter
	**/
	register(path = "") {
		if(!path || path === "" || !this.factory.exists(path)) return this;
		this.factory.register(path);
		return this;
	}

	/**
	*	Generator Strategy that defines instrumentation order on all annotations pulled by the writer.
	*	@public
	*	@method instrument
	*	@param files {Array} source files
	*	@return Iterator
	**/
	instrument* (files = []) {
		yield this.ignore(files);
		yield this.specs(files);
		yield this.plugins(files);
		yield this.bones(files);
		yield this.actions(files);
	}

	/**
	*	Filters out ignore annotations from annotations list
	*	@public
	*	@property ignore
	*	@type Array
	**/
	ignore(files) {
		// TODO: Just @ignore
	}

	/**
	*	Filters out spec annotations from annotations list
	*	@public
	*	@property specs
	*	@type Array
	**/
	specs(files) {
		this.register('spec.tpl');
		// TODO: Just @spec
	}

	/**
	*	Filters out bones annotations from annotations list
	*	@public
	*	@property bones
	*	@type Array
	**/
	bones() {
		this.register('bone.tpl');
		// TODO: @json, @bone and @wire
	}

	/**
	*	Filters out actions annotations from annotations list
	*	@public
	*	@property actions
	*	@type Array
	**/
	actions(files) {
		this.register('action.tpl');
		// TODO: @action and @listenTo
	}

	/**
	*	Filters out plugins annotations from annotations list
	*	@public
	*	@property plugins
	*	@type Array
	**/
	plugins(files) {
		// TODO: Just @plugin
	}

}

export default Instrumenter
