/**
*	@module com.boneyard.annotation.writer
*	@author Patricio Ferreira <3dimentionar@gmail.com>
**/

import {resolve} from 'path';
import _ from 'underscore';
import _s from 'underscore.string';
import {EventEmitter} from 'events';
import instrumenter from './instrumenter';
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
		this._instrumenter = new Instrumenter();
		return this;
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
		return this.annotation(this.instrumenter(files));
	}

	/**
	*	Writes Annotation
	*	@public
	*	@method annotation
	*	@param iterator {Iterator}
	*	@return com.boneyard.annotation.writer.Writer
	**/
	annotation(iterator) {
		// TODO
	}

	/**
	*	Builds and store a string representation of a spec template inside the spec map
	*	@public
	*	@method onSpec
	*	@param annotation {com.boneyard.annotation.engine.annotation.Annotation} annotation reference
	*	@return com.boneyard.annotation.writer.Writer
	**/
	onSpec(annotation) {
		Logger.out(`Writing @spec ${JSON.stringify(annotation.serialize())}`, 'c');
		return this;
	}

	/**
	*	Builds and retrieves string representation of a bone template.
	*	@public
	*	@method onBone
	*	@param annotation {com.boneyard.annotation.engine.annotation.Annotation} annotation reference
	*	@return com.boneyard.annotation.writer.Writer
	**/
	onBone(annotation) {
		Logger.out(`Writing @bone: ${JSON.stringify(annotation.serialize())}`, 'c');
		return this;
	}

	/**
	*	Builds and retrieves string representation of a json template.
	*	@public
	*	@method onJson
	*	@param annotation {com.boneyard.annotation.engine.annotation.Annotation} annotation reference
	*	@return com.boneyard.annotation.writer.Writer
	**/
	onJson(annotation) {
		Logger.out(`Writing @json ${JSON.stringify(annotation.serialize())}`, 'c');
		return this;
	}

	/**
	*	Builds and retrieves string representation of a json template.
	*	@public
	*	@method onWire
	*	@param annotation {com.boneyard.annotation.engine.annotation.Annotation} annotation reference
	*	@return com.boneyard.annotation.writer.Writer
	**/
	onWire(annotation) {
		Logger.out(`Writing @wire ${JSON.stringify(annotation.serialize())}`, 'c');
		return this;
	}

	/**
	*	Builds and retrieves string representation of a action template.
	*	@public
	*	@method onAction
	*	@param annotation {com.boneyard.annotation.engine.annotation.Annotation} annotation reference
	*	@return com.boneyard.annotation.writer.Writer
	**/
	onAction(annotation) {``
		Logger.out(`Writing @action ${JSON.stringify(annotation.serialize())}`, 'c');
		return this;
	}

	/**
	*	Builds and retrieves string representation of a listenTo template.
	*	@public
	*	@method onListenTo
	*	@param annotation {com.boneyard.annotation.engine.annotation.Annotation} annotation reference
	*	@return com.boneyard.annotation.writer.Writer
	**/
	onListenTo(annotation) {
		Logger.out(`Writing @listenTo ${JSON.stringify(annotation.serialize())}`, 'c');
		return this;
	}

	/**
	*	Builds and retrieves string representation of a plugin template.
	*	@public
	*	@method onPlugin
	*	@param annotation {com.boneyard.annotation.engine.annotation.Annotation} annotation reference
	*	@return com.boneyard.annotation.writer.Writer
	**/
	onPlugin(annotation) {
		Logger.out(`Writing @plugin ${JSON.stringify(annotation.serialize())}`, 'c');
		return this;
	}

	/**
	*	Flags a set of annotations found in the current file to ignore in the final output.
	*	@public
	*	@method onIgnore
	*	@param annotation {com.boneyard.annotation.engine.annotation.Annotation} annotation reference
	*	@return com.boneyard.annotation.writer.Writer
	**/
	onIgnore(annotation) {
		Logger.out(`Checking @ignore ${JSON.stringify(annotation.serialize())}`, 'c');
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
