/**
*	@module com.boneyard.annotation.commands
*	@author Patricio Ferreira <3dimentionar@gmail.com>
**/
import fs from 'fs-extra';
import {resolve} from 'path';
import _ from 'underscore';
import async from 'async';
import Connect from 'connect';
import StaticServe from 'serve-static';
import Logger from '../util/logger';

import Es5Examples from './examples/es5';
import Es6Examples from './examples/es6';

/**
*	Class Examples
*	@namespace com.boneyard.annotation.commands
*	@class com.boneyard.annotation.commands.Examples
*
*	@requires fs-extra
*	@requires resolve
*	@requires underscore
*	@requires async
*	@requires bower
*	@requires connect
*	@requires server-static
*	@requires com.boneyard.annotation.util.Logger
**/
class Examples {

	/**
	*	@constructor
	*	@param port {Number} port number
	*	@param program {Object} program reference
	*	@return com.boneyard.annotation.commands.Examples
	**/
	constructor(port, program) {
		this.port = port;
		this.program = program;
		return this.initialize();
	}

	/**
	*	Initialize
	*	@public
	*	@method initialize
	*	@return com.boneyard.annotation.commands.Examples
	**/
	initialize() {
		Logger.out(this.program.version());
		this.es5 = new Es5Examples(this);
		this.es6 = new Es6Examples(this);
		return this.deploy();
	}

	/**
	*	All Examples deployment
	*	@public
	*	@method deploy
	*	@return com.boneyard.annotation.commands.Examples
	**/
	deploy() {
		async.series([this.es5.run, this.es6.run], _.bind(this.spinUp, this));
		return this;
	}

	/**
	*	Spins Up HTTP Server
	*	@public
	*	@method spinUp
	*	@return Connect
	**/
	spinUp() {
		Logger.out(`Server localhost listening on port ${this.port}...`, 'm');
		Connect().use(StaticServe(this.baseUrl)).listen(this.port);
		return this;
	}

	/**
	*	Bower Dependencies
	*	@public
	*	@property dependencies
	*	@type Array
	**/
	get dependencies() {
		return ['boneyard#0.1.x'];
	}

	/**
	*	@public
	*	@property baseUrl
	*	@type String
	**/
	get baseUrl() {
		return (this.rootDir + '/examples');
	}

	/**
	*	@public
	*	@property rootDir
	*	@type String
	**/
	get rootDir() {
		return resolve(__dirname, '../../../../');
	}

	/**
	*	Static Examples run
	*	@static
	*	@method run
	*	@param port {Number} Port Number
	*	@param program {Object} program reference
	*	@return com.boneyard.annotation.commands.Examples
	**/
	static run(port = 9595, program) {
		return new Examples(port, program);
	}

}

export default Examples.run;
