/**
*	@module com.boneyard.annotation.commands
*	@author Patricio Ferreira <3dimentionar@gmail.com>
**/

import fs from 'fs-extra';
import {resolve} from 'path';
import _ from 'underscore';
import {EventEmitter} from 'events';
import Engine from '../engine/engine';
import Logger from '../util/logger';

/**
*	Class Runner
*	@namespace com.boneyard.annotation.commands
*	@class com.boneyard.annotation.commands.Runner
*	@extends events.EventEmitter
*
*	@requires fs-extra
*	@requires path.resolve
*	@requires underscore
*	@requires events.EventEmitter
*	@requires com.boneyard.annotation.engine.Engine
**/
class Runner extends EventEmitter {

	/**
	*	@constructor
	*	@param [cfg] {Object} Runner config
	*	@return com.boneyard.annotation.commands.Runner
	**/
	constructor(cfg = {}) {
		super();
		this._settings = _.extend({}, this.default, cfg);
		Logger.environment = (this.settings.env) ? this.settings.env : Logger.environments.prod;
		return this;
	}

	/**
	*	Run
	*	@public
	*	@method run
	*	@return com.boneyard.annotation.commands.Runner
	**/
	run() {
		this._engine = new Engine(this.settings);
		this.engine.on('engine:start', this.onStart)
			.on('engine:end', this.onEnd);
		return this.engine.start();
	}

	/**
	*	Engine Start Handler
	*	@public
	*	@method onStart
	*	@param
	*	@return com.boneyard.annotation.commands.Runner
	**/
	onStart() {
		Logger.out(`Yard`)
		return this;
	}

	/**
	*	Engine End Handler
	*	@public
	*	@method onEnd
	*	@param
	*	@return com.boneyard.annotation.commands.Runner
	**/
	onEnd() {
		return this;
	}

	/**
	*	Write to the stout settings
	*	@public
	*	@method info
	**/
	info() {
		Logger.out(
			`Yard@
			`
		);
	}

	/**
	*	Retrieves Runner's Settings
	*	@public
	*	@property settings
	*	@type Object
	**/
	get settings() {
		return this._settings;
	}

	/**
	*	Retrieves Runner's Engine
	*	@public
	*	@property engine
	*	@type com.boneyard.annotation.engine.Engine
	**/
	get engine() {
		return this._engine;
	}

	/**
	*	Retrieves default settings
	*	@public
	*	@property default
	*	@type Object
	**/
	get default() {
		return {
			cwd: this.source.substring(0, this.source.lastIndexOf('/')),
			target: this.source.substring(this.source.lastIndexOf('/'), this.source.length),
			ignore: ['libraries/**/*.*', 'main.js'],
			nodir: true
		};
	}

	/**
	*	Static Runner
	*	@static
	*	@method run
	*	@param [cfg] {Object} Runner config
	*	@return com.boneyard.annotation.Scanner
	**/
	static new(cfg = { esversion = 6, source = './examples', target: './dist', exclude = [] }) {
		return new Runner(cfg).run();
	}

}

export default Runner;
