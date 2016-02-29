/**
*	@module com.boneyard.annotation.engine
*	@author Patricio Ferreira <3dimentionar@gmail.com>
**/

import _ from 'underscore';
import _s from 'underscore.string';
import  {EventEmitter} from 'events';

/**
*	Class Engine
*	@namespace com.boneyard.annotation.engine
*	@class com.boneyard.annotation.engine.Engine
*	@extends events.EventEmitter
*
*	@requires underscore
*	@requires underscore.string
*	@requires events.EventEmitter
**/
class Engine extends EventEmitter {

	/**
	*	@constructor
	*	@param [runner] {Object} engine's runner
	*	@return com.boneyard.annotation.engine.Engine
	**/
	constructor(runner) {
		super();
		this._runner = runner;
		this._reader = this.createReader(settings);
		this._writer = this.createWriter(settings);
		return this;
	}

	/**
	*	Reader Factory
	*	@public
	*	@method createReader
	*	@param [...args] {Object} arguments to pass to the reader constructor
	*	@return com.boneyard.annotation.engine.reader.Reader
	**/
	createReader(...args) {
		try {
			return new require(resolve('../engine/reader/es', this.esversion))(...args);
		} catch(ex) {
			process.exit();
		}
	}

	/**
	*	Writer Factory
	*	@public
	*	@method createWriter
	*	@param [...args] {Object} arguments to pass to the writer constructor
	*	@return com.boneyard.annotation.engine.writer.Writer
	**/
	createWriter(...args) {
		try {
			return new require('../engine/writer/writer')(...args);
		} catch(ex) {
			process.exit();
		}
	}

	/**
	*	Retrieves Reader
	*	@public
	*	@property reader
	*	@type com.boneyard.annotation.engine.reader.Reader
	**/
	get reader() {
		return this._reader;
	}

	/**
	*	Retrieves Writer
	*	@public
	*	@property writer
	*	@type com.boneyard.annotation.engine.writer.Writer
	**/
	get writer() {
		return this._reader;
	}

	/**
	*	Retrieves Writer
	*	@public
	*	@property runner
	*	@type com.boneyard.annotation.commands.Runner
	**/
	get runner() {
		return this._runner;
	}

}

export default Engine;
