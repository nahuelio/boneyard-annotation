/**
*	@module com.boneyard.annotation.writer
*	@author Patricio Ferreira <3dimentionar@gmail.com>
**/

import {resolve} from 'path';
import _ from 'underscore';
import _s from 'underscore.string';
import {EventEmitter} from 'events';
import Instrumenter from './instrumenter';
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
		super();
		this.instrumenter = new Instrumenter();
		this.blacklist = [];
		return this;
	}

	/**
	*	Sets instrumenter
	*	@public
	*	@property instrumenter
	*	@type com.boneyard.annotation.engine.writer.Instrumenter
	**/
	set instrumenter(instrumenter) {
		this._instrumenter = instrumenter;
	}

	/**
	*	Retrieves Writer instrumenter
	*	@public
	*	@property instrumenter
	*	@type com.boneyard.annotation.engine.writer.Instrumenter
	**/
	get instrumenter() {
		return this._instrumenter;
	}

	/**
	*	Returns true if the annotation found in a file was blacklisted to not parse annotations
	*	@public
	*	@method isIgnore
	*	@param annotation {Object} annotation metadata
	*	@return Boolean
	**/
	isIgnore(annotation) {
		return _.contains(this.blacklist, annotation.file);
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
		for(let list of this.instrumenter.instrument(files)) {
			list.annotations.forEach((a) => { this[list.type](a); });
		}
		return this;
	}

	/**
	*	Flags a set of annotations found in the current file to ignore in the final output.
	*	@public
	*	@method onIgnore
	*	@param annotation {com.boneyard.annotation.engine.annotation.Annotation} annotation reference
	*	@return com.boneyard.annotation.writer.Writer
	**/
	ignore(annotation) {
		let meta = annotation.serialize();
		Logger.out(`Blacklist detected: ${meta.ignore.file}`, 'r');
		this.blacklist.push(meta.ignore.file);
		return this;
	}

	/**
	*	Builds and store a string representation of a spec template inside the spec map
	*	@public
	*	@method onSpec
	*	@param annotation {com.boneyard.annotation.engine.annotation.Annotation} annotation reference
	*	@return com.boneyard.annotation.writer.Writer
	**/
	spec(annotation) {
		if(this.isIgnore(annotation)) return this;
		let meta = _.omit(annotation.serialize(), 'context');
		Logger.out(`Writing @spec: `, 'c');
		Logger.out(`${JSON.stringify(meta)}`, 'y');
		return this;
	}

	/**
	*	Builds and retrieves string representation of a bone template.
	*	@public
	*	@method onBone
	*	@param annotation {com.boneyard.annotation.engine.annotation.Annotation} annotation reference
	*	@return com.boneyard.annotation.writer.Writer
	**/
	bone(annotation) {
		if(this.isIgnore(annotation)) return this;
		let meta = _.omit(annotation.serialize(), 'context');
		Logger.out(`Writing @bone: `, 'c');
		Logger.out(`${JSON.stringify(meta)}`, 'y');
		return this;
	}

	/**
	*	Builds and retrieves string representation of a json template.
	*	@public
	*	@method onJson
	*	@param annotation {com.boneyard.annotation.engine.annotation.Annotation} annotation reference
	*	@return com.boneyard.annotation.writer.Writer
	**/
	json(annotation) {
		if(this.isIgnore(annotation)) return this;
		let meta = _.omit(annotation.serialize(), 'context');
		Logger.out(`Writing @json: `, 'c');
		Logger.out(`${JSON.stringify(meta)}`, 'y');
		return this;
	}

	/**
	*	Builds and retrieves string representation of a json template.
	*	@public
	*	@method onWire
	*	@param annotation {com.boneyard.annotation.engine.annotation.Annotation} annotation reference
	*	@return com.boneyard.annotation.writer.Writer
	**/
	wire(annotation) {
		if(this.isIgnore(annotation)) return this;
		let meta = _.omit(annotation.serialize(), 'context');
		Logger.out(`Writing @wire: `, 'c');
		Logger.out(`${JSON.stringify(meta)}`, 'y');
		return this;
	}

	/**
	*	Builds and retrieves string representation of a action template.
	*	@public
	*	@method onAction
	*	@param annotation {com.boneyard.annotation.engine.annotation.Annotation} annotation reference
	*	@return com.boneyard.annotation.writer.Writer
	**/
	action(annotation) {
		if(this.isIgnore(annotation)) return this;
		let meta = _.omit(annotation.serialize(), 'context');
		Logger.out(`Writing @action: `, 'c');
		Logger.out(`${JSON.stringify(meta)}`, 'y');
		return this;
	}

	/**
	*	Builds and retrieves string representation of a listenTo template.
	*	@public
	*	@method onListenTo
	*	@param annotation {com.boneyard.annotation.engine.annotation.Annotation} annotation reference
	*	@return com.boneyard.annotation.writer.Writer
	**/
	listenTo(annotation) {
		if(this.isIgnore(annotation)) return this;
		let meta = _.omit(annotation.serialize(), 'context');
		Logger.out(`Writing @listenTo: `, 'c');
		Logger.out(`${JSON.stringify(meta)}`, 'y');
		return this;
	}

	/**
	*	Builds and retrieves string representation of a plugin template.
	*	@public
	*	@method onPlugin
	*	@param annotation {com.boneyard.annotation.engine.annotation.Annotation} annotation reference
	*	@return com.boneyard.annotation.writer.Writer
	**/
	plugin(annotation) {
		if(this.isIgnore(annotation)) return this;
		let meta = _.omit(annotation.serialize(), 'context');
		Logger.out(`Writing @plugin: `, 'c');
		Logger.out(`${JSON.stringify(meta)}`, 'y');
		return this;
	}

	/**
	*	Writes out final spec template into a file.
	*	@public
	*	@method toFile
	*	@param spec {String} string representation of a final spec
	*	@return com.boneyard.annotation.writer.Writer
	**/
	toFile() {
		// TODO
		return this;
	}

}

export default Writer;
