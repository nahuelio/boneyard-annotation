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
*	Class Writer
*	@namespace com.boneyard.annotation.writer
*	@class com.boneyard.annotation.writer.Writer
*
*	@requires path
*	@requires underscore
*	@requires underscore.string
*	@requires events.EventEmitter
*	@requires com.boneyard.annotation.util.Factory
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
		this._factory = new Factory();
		this._specs = new Map();
		return this;
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
	*	Retrieves Writer spec collection
	*	@public
	*	@property specs
	*	@type Map
	**/
	get specs() {
		return this._specs;
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
		for(let [file, annotations] of files) {
			annotations.forEach((a) => this.annotation(a));
		}
		return this;
	}

	/**
	*	Writes Annotation
	*	@public
	*	@method annotation
	*	@param annotation {com.boneyard.annotation.engine.annotation.Annotation} annotation reference
	*	@return com.boneyard.annotation.writer.Writer
	**/
	annotation(annotation) {
		return this['on' + _s.capitalize(annotation.name)](annotation);
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
	*	Comment
	**/
	onIgnore(annotation) {
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
