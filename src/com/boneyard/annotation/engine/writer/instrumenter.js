/**
*	@module com.boneyard.annotation.writer
*	@author Patricio Ferreira <3dimentionar@gmail.com>
**/

import {resolve} from 'path';
import _ from 'underscore';
import _s from 'underscore.string';
import {EventEmitter} from 'events';
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
	*	Setup all annotations of all specs to be processed by this instrumenter
	*	@public
	*	@method all
	*	@param files {Map} source files
	*	@return Array
	**/
	all(files) {
		return _.compact(_.flatten(Array.from(files, (a) => { return a; })));
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
				bone.wires = this.wires(bone, annotations);
				return bone;
			});
			spec.actions = this.actions(spec, annotations);
			return spec;
		});
	}

	/**
	*	Filters out spec annotations from annotations list
	*	@public
	*	@method specs
	*	@param annotations {array} list of annotations
	*	@return Array
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
		return _.filter(annotations, (a) => { return (a.name === 'wire' && _.contains(a.bones, bone.id)); });
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
