/**
*	@module com.boneyard.annotation.writer
*	@author Patricio Ferreira <3dimentionar@gmail.com>
**/

import {resolve} from 'path';
import _ from 'underscore';
import _s from 'underscore.string';
import {EventEmitter} from 'events';
import SpecInstrument from './instrument/spec';
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
*	@requires com.boneyard.annotation.engine.writer.Instrumenter
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
		return _.compact(_.flatten(Array.from(files, (a) => { return a; })));
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
		return this.toFile(this.all(files).forEach((annotations) => { return this.specs(annotations); }));
	}

	/**
	*	Filters out spec annotations from annotations list
	*	@public
	*	@method specs
	*	@param annotations {array} list of annotations
	*	@return Array
	**/
	specs(annotations) {
		return _.filter(annotations, (a) => { return (a.name === 'spec'); }).map((s) => {
			spec.plugins = this.plugins(spec, annotations);
			//spec.injects = this.injects(spec, annotations);
			spec.bones = this.bones(spec, annotations);
			spec.actions = this.actions(spec, annotations);
			return spec;
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

	/**
	*	Filters out inject annotations from annotations list by spec
	*	@public
	*	@param spec {com.boneyard.annotation.support.Spec} current spec
	*	@property injects
	*	@type Array
	**/
	injects(spec, annotations) {
		return _.filter(annotations, (a) => { return (a.name === 'plugin' && spec.id === a.spec); });
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
			return (_.contains(['bone', 'json', 'inject'], a.name) && spec.id === a.spec);
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
