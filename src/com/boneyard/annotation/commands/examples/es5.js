/**
*	@module com.boneyard.annotation.commands.examples
*	@author Patricio Ferreira <3dimentionar@gmail.com>
**/
import fs from 'fs-extra';
import {resolve} from 'path';
import _ from 'underscore';
import Bower from 'bower';
import Logger from '../../util/logger';

/**
*	Class Es5Examples
*	@namespace com.boneyard.annotation.commands.examples
*	@class com.boneyard.annotation.commands.examples.Es5Examples
*
*	@requires fs-extra
*	@requires resolve
*	@requires underscore
*	@requires bower
*	@requires com.boneyard.annotation.util.Logger
*	@requires com.boneyard.annotation.util.Logger
**/
class Es5Examples {

	/**
	*	Constructor
	*	@constructor
	*	@param examples {com.boneyard.annotation.commands.Examples} examples command reference
	*	@return com.boneyard.annotation.commands.examples.Es5Examples
	**/
	constructor(examples) {
		this.examples = examples;
		this.ns = 'es5';
		return this;
	}

	/**
	*	Run Es5 full deployment
	*	@public
	*	@method run
	*	@param callback {Function} callback reference
	*	@return com.boneyard.annotation.commands.examples.Es5Examples
	**/
	run(callback) {
		Logger.out(`[${this.ns} Examples] Start Deploy...`, 'c');
		return this.clean().install(callback);
	}

	/**
	*	Clean up deployment path
	*	@public
	*	@method clean
	*	@return com.boneyard.annotation.commands.examples.Es5Examples
	**/
	clean() {
		fs.removeSync(this.baseUrl + '/libraries');
		fs.removeSync(this.deployPath);
		return this;
	}

	/**
	*	Install Dependencies
	*	@public
	*	@method install
	*	@return com.boneyard.annotation.commands.examples.Es5Examples
	**/
	install(callback) {
		Logger.out(`[${this.ns} Examples] Installing Dependencies...`, 'c');
		Bower.commands.install(this.examples.dependencies, null, { cwd: this.baseUrl, directory: 'libraries' })
			.on('end', _.bind(this.deploy, this, callback));
		return this;
	}

	/**
	*	Deploy Es5 examples into the target directory
	*	@public
	*	@method deploy
	*	@return com.boneyard.annotation.commands.examples.Es5Examples
	**/
	deploy(callback) {
		// TODO: Copy ES5 structure into deployPath
		Logger.out(`[${this.ns} Examples] Deploy Completed.`, 'c');
		return this;
	}

	/**
	*	Deploy Themes into deploypath
	*	@public
	*	@method themes
	*	@return com.boneyard.annotation.commands.examples.Es5Examples
	**/
	themes() {
		// TODO
		return this;
	}

	/**
	*	Deploy Templates into deploypath
	*	@public
	*	@method themes
	*	@return com.boneyard.annotation.commands.examples.Es5Examples
	**/
	templates() {
		// TODO
		return this;
	}

	/**
	*	Retrieves Es5 baseUrl
	*	@public
	*	@property baseUrl
	*	@type String
	**/
	get baseUrl() {
		return this.examples.baseUrl + '/' + this.ns;
	}

	/**
	*	Retrieves Es5 deploy path
	*	@public
	*	@property deplotPath
	*	@type String
	**/
	get deployPath() {
		return this.baseUrl + '-dist';
	}

}

export default Es5Examples;
