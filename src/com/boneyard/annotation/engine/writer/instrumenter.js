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
		return this.registerAll('spec.tpl', 'bone.tpl', 'action.tpl', 'plugin.tpl');
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
	*	Registers a list of template inside the factory
	*	@public
	*	@method registerAll
	*	@param paths {Array} array of template paths
	*	@return com.boneyard.annotation.engine.writer.Instrumenter
	**/
	registerAll(paths = []) {
		if(!paths || !_.isArray(paths) || !this.factory.exists(paths)) return this;
		paths.forEach((p) => { this.factory.register(p); });
		return this;
	}

	/**
	*	Filters out all annotations on all files read.
	*	@public
	*	@method all
	*	@param files {Map} source files
	*	@return Array
	**/
	all(files) {
		return _.flatten(Array.from(files, (a, f) => { return a; }));
	}

	/**
	*	Generator Strategy that defines instrumentation order on all annotations pulled by the writer.
	*	@public
	*	@method instrument
	*	@param files {Map} source files
	*	@return Iterator
	**/
	*instrument(files = []) {
		let annotations = this.all(files);
		yield this.ignore(annotations);
		yield this.specs(annotations);
		yield this.plugins(annotations);
		yield this.bones(annotations);
		yield this.actions(annotations);
	}

	/**
	*	Filters out ignore annotations from annotations list
	*	@public
	*	@method ignore
	*	@param annotations {array} list of annotations
	*	@return Array
	**/
	ignore(annotations) {
		return _.filter(annotations, (a) => { return (a.name === 'ignore'); });
	}

	/**
	*	Registers templateFilters out spec annotations from annotations list
	*	@public
	*	@property specs
	*	@type Array
	**/
	specs(annotations) {
		return _.filter(annotations, (a) => { return (a.name === 'spec'); });
	}

	/**
	*	Filters out bones annotations from annotations list
	*	@public
	*	@property bones
	*	@type Array
	**/
	bones(annotations) {
		return _.filter(annotations, (a) => { return _.contains(['bone', 'json', 'wire'], a.name); });
	}

	/**
	*	Filters out actions annotations from annotations list
	*	@public
	*	@property actions
	*	@type Array
	**/
	actions(annotations) {
		return _.filter(annotations, (a) => { return _.contains(['action', 'listenTo'], a.name); });
	}

	/**
	*	Filters out plugins annotations from annotations list
	*	@public
	*	@property plugins
	*	@type Array
	**/
	plugins(annotations) {
		return _.filter(annotations, (a) => { return (a.name === 'plugin'); });
	}

}

export default Instrumenter
