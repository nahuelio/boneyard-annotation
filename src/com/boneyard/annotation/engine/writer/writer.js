/**
*	@module com.boneyard.annotation.writer
*	@author Patricio Ferreira <3dimentionar@gmail.com>
**/

import {resolve} from 'path';
import _ from 'underscore';
import _s from 'underscore.string';
import {EventEmitter} from 'events';
import SpecInstrument from './instrument/spec';
import PluginInstrument from './instrument/plugin';
import BoneInstrument from './instrument/bone';
import ActionInstrument from './instrument/action';
import Logger from '../../util/logger';

/**
*	Class Writer
*	@namespace com.boneyard.annotation.writer
*	@class com.boneyard.annotation.writer.Writer
*
*	@requires path
*	@requires underscore
*	@requires underscore.string
*	@requires events.EventEmitter
*	@requires com.boneyard.annotation.engine.writer.instrument.SpecInstrument
*	@requires com.boneyard.annotation.engine.writer.instrument.PluginInstrument
*	@requires com.boneyard.annotation.engine.writer.instrument.BoneInstrument
*	@requires com.boneyard.annotation.engine.writer.instrument.ActionInstrument
*	@requires com.boneyard.annotation.util.Logger
**/
class Writer extends EventEmitter {

	/**
	*	Constructor
	*	@constructor
	*	@return com.boneyard.annotation.writer.Writer
	**/
	constructor(...args) {
		return super(...args);
	}

	/**
	*	Retrieves all annotations of all specs to be processed by instrumenters
	*	@public
	*	@method all
	*	@param files {Map} source files
	*	@return Array
	**/
	all(files) {
		return _.compact(_.flatten(Array.from(files, (a) => { return a[1]; })));
	}

	/**
	*	Default Write strategy using annotations read by the parser reader
	*	@public
	*	@method write
	*	@param files {Map} files collection reference
	*	@return com.boneyard.annotation.writer.Writer
	**/
	write(files) {
		if(files.size === 0) return this;
		let annotations = this.all(files);
		return this.toFile(_.compact(annotations.map((a) => {
			return (a.name === 'spec') ? this.specs(a, annotations) : false;
		})));
	}

	/**
	*	Filters out spec annotations from annotations list and returns a list of Spec instrumenters
	*	@public
	*	@method specs
	*	@param spec {com.boneyard.annotation.support.Spec} spec annotation reference
	*	@param annotations {array} list of annotations
	*	@return Array
	**/
	specs(spec, annotations) {
		let instrument = new SpecInstrument(spec);
		instrument.plugins = this.plugins(instrument, annotations);
		instrument.bones = this.bones(instrument, annotations);
		instrument.actions = this.actions(instrument, annotations);
		return this.wires(instrument, annotations);
	}

	/**
	*	Filters out plugins annotations from annotations list by spec instrumenter and
	*	returns a list of Plugin Instrumenters
	*	@public
	*	@method plugins
	*	@param spec {com.boneyard.annotation.engine.writer.instrument.SpecInstrument} current spec instrumenter
	*	@param annotations {array} list of annotations
	*	@return Array
	**/
	plugins(spec, annotations) {
		return _.compact(_.map(annotations, (a) => {
			return (a.name === 'plugin' && spec.has(a)) ?
				new PluginInstrument(spec, a) : false;
		}));
	}

	/**
	*	Filters out bone annotations from annotations list by spec instrumenter and
	*	returns a list of Bone Instrumenters
	*	@public
	*	@method bones
	*	@param spec {com.boneyard.annotation.engine.writer.instrument.SpecInstrument} current spec instrumenter
	*	@param annotations {array} list of annotations
	*	@return Array
	**/
	bones(spec, annotations) {
		return _.compact(_.map(annotations, (a) => {
			return (_.contains(['bone', 'json', 'component'], a.name) && spec.has(a)) ?
				new BoneInstrument(spec, a) : false;
		}));
	}

	/**
	*	Filters out wire annotations from annotations list by spec bone instrumenters and returns
	*	@public
	*	@method wires
	*	@param spec {com.boneyard.annotation.engine.writer.instrument.SpecInstrument} current spec instrumenter
	*	@param annotations {array} list of annotations
	*	@return Array
	**/
	wires(spec, annotations) {
		annotations.forEach((a) => {
			if(a.name === 'wire') {
				let bone = spec.findBone(a);
				if(_.defined(bone)) bone.wire(a);
			}
		});
		return specInstrument;
	}

	/**
	*	Filters out actions annotations from annotations list by spec instrumenter and
	*	returns a list of Action Instrumenters
	*	@public
	*	@method actions
	*	@param spec {com.boneyard.annotation.engine.writer.instrument.SpecInstrument} current spec instrumenter
	*	@param annotations {array} list of annotations
	*	@return Array
	**/
	actions(spec, annotations) {
		return _.compact(_.map(annotations, (a) => {
			return (_.contains(['action', 'listenTo'], a.name) && spec.has(a)) ?
				new ActionInstrument(spec, a) : false;
		}));
	}

	/**
	*	Writes out final spec template into a file.
	*	@public
	*	@method toFile
	*	@param instruments {Array} list of instruments to export
	*	@return com.boneyard.annotation.writer.Writer
	**/
	toFile(instruments = []) {
		if(instruments.length === 0) return this;
		instruments.forEach((instrument) => {
			Logger.out(`${_.cleanEmptyLines(instrument.write())}`, 'y');
			// Export to File
		});
		return this;
	}

}

export default Writer;
