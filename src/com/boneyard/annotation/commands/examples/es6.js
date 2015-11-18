/**
*	@module com.boneyard.annotation.commands.examples
*	@author Patricio Ferreira <3dimentionar@gmail.com>
**/
import fs from 'fs-extra';
import {resolve} from 'path';
import _ from 'underscore';
import Bower from 'bower';
import Babel from 'babel-core';
import Logger from '../../util/logger';

/**
*	Class Es6Examples
*	@namespace com.boneyard.annotation.commands.examples
*	@class com.boneyard.annotation.commands.examples.Es6Examples
*
*	@requires fs-extra
*	@requires resolve
*	@requires underscore
*	@requires bower
*	@requires babel-core
*	@requires com.boneyard.annotation.util.Logger
*	@requires com.boneyard.annotation.util.Logger
**/
class Es6Examples {

	/**
	*	Constructor
	*	@constructor
	*	@param examples {com.boneyard.annotation.commands.Examples} examples command reference
	*	@return com.boneyard.annotation.commands.examples.Es6Examples
	**/
	constructor(examples) {
		this.examples = examples;
		this.ns = 'es6';
		return this;
	}

	/**
	*	Run Es6 full deployment
	*	@public
	*	@method run
	*	@param callback {Function} callback reference
	*	@return com.boneyard.annotation.commands.examples.Es6Examples
	**/
	run: function(callback) {
		Logger.out(`[${this.ns} Examples] Start Deploy...`, 'c');
		return this.clean().install(callback);
	}

	/**
	*	Clean up deployment path
	*	@public
	*	@method clean
	*	@return com.boneyard.annotation.commands.examples.Es6Examples
	**/
	clean: function() {
		fs.removeSync(this.baseUrl + '/libraries');
		fs.removeSync(this.deployPath);
		return this;
	}

	/**
	*	Install Dependencies
	*	@public
	*	@method install
	*	@return com.boneyard.annotation.commands.examples.Es6Examples
	**/
	install(callback) {
		Logger.out(`[${this.ns} Examples] Installing Dependencies...`, 'c');
		Bower.commands.install(this.examples.dependencies, null, { cwd: this.baseUrl, directory: 'libraries' })
			.on('end', _.bind(this.deploy, this, callback));
		return this;
	}

	/**
	*	Deploy Es6 examples into the target directory
	*	@public
	*	@method deploy
	*	@return com.boneyard.annotation.commands.examples.Es6Examples
	**/
	deploy(callback) {
		// TODO: Use Babel-core to transpile and copy final ES6 structure into deployPath
		Logger.out(`[${this.ns} Examples] Deploy Completed.`, 'c');
		return this;
	}

	/**
	*	Install Babel Goodies (Helpers and Polyfill)
	*	@public
	*	@method babel
	*	@return com.boneyard.annotation.commands.Examples
	**/
	installBabelHelpers() {
		this.babelDependencies.forEach(d => {
			fs.copySync(d.path + d.file, this.libraries + '/babel/' + d.file)
		});
		return this;
	}

	/**
	*	Retrieves Es6 baseUrl
	*	@public
	*	@property baseUrl
	*	@type String
	**/
	get baseUrl() {
		return this.examples.baseUrl + '/' + this.ns;
	}

	/**
	*	Retrieves Es6 deploy path
	*	@public
	*	@property deplotPath
	*	@type String
	**/
	get deployPath() {
		return this.baseUrl + '-dist';
	}

	/**
	*	Retrieves babel dependency helpers
	*	@public
	*	@property bowerDependencies
	*	@type Array
	**/
	get babelDependencies() {
		let babelcorePath = '/node_modules/babel/node_modules/babel-core/';
		return [
			{ file: 'browser-polyfill.min.js', path: (this.examples.rootDir + babelcorePath) },
			{ file: 'external-helpers.min.js', path: (this.examples.rootDir + babelcorePath) }
		];
	}

}

export default Es6Examples;
