/**
*	@module com.boneyard.annotation.engine
*	@author Patricio Ferreira <3dimentionar@gmail.com>
**/

import {resolve} from 'path';
import _ from 'underscore';
import _s from 'underscore.string';
import  {EventEmitter} from 'events';
import Logger from '../util/logger';

/**
*	Class Engine
*	@namespace com.boneyard.annotation.engine
*	@class com.boneyard.annotation.engine.Engine
*	@extends events.EventEmitter
*
*	@requires path.resolve
*	@requires underscore
*	@requires underscore.string
*	@requires events.EventEmitter
*	@requires com.boneyard.annotation.util.Logger;
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
		return this.createReader().createWriter();
	}

	/**
	*	Run
	*	@public
	*	@method run
	*	@return com.boneyard.annotation.engine.Engine
	**/
	run() {
		this.emit('engine:start');
		this.reader.scan();
		return this;
	}

	/**
	*	Reader Factory
	*	@public
	*	@method createReader
	*	@return com.boneyard.annotation.engine.Engine
	**/
	createReader() {
		try {
			let Reader = require(resolve(__dirname, '../engine/reader/es' + this.settings.esversion.toString()));
			this._reader = new Reader(this);
			this._reader.on('reader:complete', _.bind(this.onReaderComplete, this));
			return this;
		} catch(ex) {
			Logger.error(`StackTrace: ${ex.stack}`);
			process.exit(1);
		}
	}

	/**
	*	Writer Factory
	*	@public
	*	@method createWriter
	*	@return com.boneyard.annotation.engine.Engine
	**/
	createWriter(...args) {
		try {
			//let Writer = new require('../engine/writer/writer');
			//this._writer = new Writer(this);
			//this._writer.on('writer:complete', _.bind(this.onWriterComplete, this));
			return this;
		} catch(ex) {
			Logger.error(`StackTrace: ${ex.stack}`);
			process.exit(1);
		}
	}

	/**
	*	Reader Complete Handler
	*	@public
	*	@method onReaderComplete
	*	@return com.boneyard.annotation.engine.Engine
	**/
	onReaderComplete(scannedFiles, ignoredFiles) {
		Logger.out(`Results:\n`, 'm');
		Logger.out(`\t${scannedFiles.length} Files Scanned`, 'g');
		Logger.out(`\t${ignoredFiles.length} Files Ignored\n`, 'r');
		//this.writer.writeAll();
		return this.onWriterComplete();
	}

	/**
	*	Writer Complete Handler
	*	@public
	*	@method onWriterComplete
	*	@return com.boneyard.annotation.engine.Engine
	**/
	onWriterComplete() {
		this.emit('engine:end');
		return this;
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
	*	Retrieves Runner
	*	@public
	*	@property runner
	*	@type com.boneyard.annotation.commands.Runner
	**/
	get runner() {
		return this._runner;
	}

	/**
	*	Retrieves Runner's settings
	*	@public
	*	@property settings
	*	@type Object
	**/
	get settings() {
		return this.runner.settings;
	}

}

export default Engine;
