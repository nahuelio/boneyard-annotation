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
	*	Default Write strategy using annotations read by the parser reader
	*	@public
	*	@method write
	*	@param files {Map} files collection reference
	*	@return com.boneyard.annotation.writer.Writer
	**/
	write(files) {
		if(files.size === 0) return this;
		this.instrumenter.instrument(files).forEach((spec) => { this.toFile(spec.write(spec.serialize())); });
		return this;
	}

	/**
	*	Writes out final spec template into a file.
	*	@public
	*	@method toFile
	*	@param template {String} string representation of a final spec
	*	@return com.boneyard.annotation.writer.Writer
	**/
	toFile(template) {
		Logger.out(`${template}`, 'y');
		// TODO Export to file
		return this;
	}

}

export default Writer;
