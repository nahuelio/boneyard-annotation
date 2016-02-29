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
		this._settings = _.extend({}, this.default, ((cfg.yard) ? cfg.yard : cfg));
		Logger.environment = (this.settings.env) ? Logger.environments[this.settings.env] : Logger.environments.prod;
		return this;
	}

	/**
	*	Run
	*	@public
	*	@method run
	*	@return com.boneyard.annotation.commands.Runner
	**/
	run() {
		this._engine = new Engine(this);
		this.engine.on('engine:start', this.onStart).on('engine:end', this.onEnd);
		this.engine.run();
		return this;
	}

	/**
	*	Engine Start Handler
	*	@public
	*	@method onStart
	*	@param
	*	@return com.boneyard.annotation.commands.Runner
	**/
	onStart() {
		Logger.out('Yard Settings: \n', 'm');
		_.each(this.settings, function(v, k) {
			Logger.out(`\t${k}: ${JSON.stringify(v)}`, 'y');
		});
		Logger.out('\nYarding started...\n', 'c');
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
		Logger.out('Yarding Completed\n', 'c');
		return this;
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
			ignore: [],
			esversion: 6,
			minify: false,
			env: Logger.environments.dev
		};
	}

	/**
	*	Static Runner
	*	@static
	*	@method run
	*	@param [cfg] {Object} Runner config
	*	@return com.boneyard.annotation.Scanner
	**/
	static new(cfg = this.default) {
		return new Runner(cfg).run();
	}

}

export default Runner;
