/**
*	@module com.boneyard.annotation.engine
*	@author Patricio Ferreira <3dimentionar@gmail.com>
**/

import {resolve} from 'path';
import _ from 'underscore';
import _s from 'underscore.string';
import  {EventEmitter} from 'events';
import Reader from './reader/reader';
//import Writer from './writer/writer';
import Logger from '../util/logger/logger';

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
*	@requires com.boneyard.annotation.engine.reader.Reader
*	@requires com.boneyard.annotation.engine.writer.Writer
*	@requires com.boneyard.annotation.util.logger.Logger
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
		this._reader = new Reader(this);
		//this._writer = new Writer(this);
		return this.attachEvents();
	}

	/**
	*	Attach Events
	*	@public
	*	@method attachEVents
	*	@return com.boneyard.annotation.engine.Engine
	**/
	attachEvents() {
		this._reader
			.on('reader:asset', _.bind(this.onReaderAsset, this))
			.on('reader:complete', _.bind(this.onReaderComplete, this));
		// this._writer
		// 	.on('wirter:asset', _.bind(this.onWriterAsset, this))
		// 	.on('writer:complete', _.bind(this.onWriterComplete, this));
		return this;
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
	*	Reader Asset Read Handler
	*	@public
	*	@method onReaderAsset
	*	@param asset {Object} current asset being parsed
	*	@return com.boneyard.annotation.engine.Engine
	**/
	onReaderAsset(asset) {
		Logger.out(`[${_s.strRight(asset.path, this.settings.basePath)}]`, 'g');
		return this;
	}

	/**
	*	Reader Complete Handler
	*	@public
	*	@method onReaderComplete
	*	@return com.boneyard.annotation.engine.Engine
	**/
	onReaderComplete(scannedFiles, ignoredFiles) {
		Logger.out(`\nResults:\n`, 'm');
		Logger.out(`\t${scannedFiles.length} Files Scanned.`, 'g');
		Logger.out(`\t${ignoredFiles.length} Files Ignored.\n`, 'r');
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
