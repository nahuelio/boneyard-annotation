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
	*	Filters out all annotations on all files read except annotations blacklisted
	*	@public
	*	@method all
	*	@param files {Map} source files
	*	@return Array
	**/
	all(files) {
		return _.compact(_.flatten(Array.from(files, (a, f) => { return !a.ignored ? a : null; })));
	}

	/**
	*	Generator Strategy that defines instrumentation order on all annotations pulled by the writer.
	*	@public
	*	@method instrument
	*	@param files {Map} source files
	*	@return Iterator
	**/
	instrument(files = []) {
		let annotations = this.all(files);
		return this.specs(annotations).map((spec) => {
			spec.plugins = this.plugins(spec, annotations);
			spec.bones = this.bones(spec, annotations).map((bone) => {
				bone.wire = this.wires(bone, annotations);
				return bone;
			});
			spec.actions = this.actions(spec, annotations);
			return spec;
		});
	}

	/**
	*	Filters out spec annotations from annotations list
	*	@public
	*	@property specs
	*	@type Array
	**/
	specs(annotations) {
		return _.filter(annotations, (a) => { return (a.name === 'spec'); });
	}

	/**
	*	Filters out bone annotations from annotations list by spec
	*	@public
	*	@method bones
	*	@param spec {com.boneyard.annotation.support.Spec} current spec
	*	@param annotations {array} list of annotations
	*	@return Array
	**/
	bones(spec, annotations) {
		return _.filter(annotations, (a) => {
			return (_.contains(['bone', 'json'], a.name) && spec.id === a.spec);
		});
	}

	/**
	*	Filters out wire annotations from annotations list by bone
	*	@public
	*	@method wires
	*	@param bone {com.boneyard.annotation.support.Bone} current bone
	*	@param annotations {array} list of annotations
	*	@return Array
	**/
	wires(bone, annotations) {
		return _.filter(annotations, (a) => { return (a.name === 'wire' && a.id === bone.id); });
	}

	/**
	*	Filters out actions annotations from annotations list by spec
	*	@public
	*	@param spec {com.boneyard.annotation.support.Spec} current spec
	*	@property actions
	*	@type Array
	**/
	actions(spec, annotations) {
		return _.filter(annotations, (a) => {
			return (_.contains(['action', 'listenTo'], a.name) && spec.id === a.spec);
		});
	}

	/**
	*	Filters out plugins annotations from annotations list by spec
	*	@public
	*	@param spec {com.boneyard.annotation.support.Spec} current spec
	*	@property plugins
	*	@type Array
	**/
	plugins(spec, annotations) {
		return _.filter(annotations, (a) => { return (a.name === 'plugin' && spec.id === a.spec); });
	}

}

export default Instrumenter
