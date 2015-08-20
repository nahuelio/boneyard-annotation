/**
*	Spinal IoC Annotation module
*	@module com.spinal.annotation.cli
*	@author Patricio Ferreira <3dimentionar@gmail.com>
**/
import fs from 'fs-extra';
import {resolve} from 'path';
import _ from 'underscore';
import Bower from 'bower';
import Connect from 'connect';
import StaticServe from 'serve-static';
import colors from 'colors';

/**
*	Class Examples
*	@namespace com.spinal.annotation.cli
*	@class com.spinal.annotation.cli.Examples
*
*	@requires fs-extra
*	@requires resolve
*	@requires underscore
*	@requires bower
*	@requires connect
*	@requires server-static
*	@requires colors
**/
class Examples {

	/**
	*	@constructor
	*	@param port {Number} port number
	*	@param program {Object} program reference
	*	@return com.spinal.annotation.cli.Examples
	**/
	constructor(port, program) {
		this.port = port;
		this.program = program;
		return this.initialize().clean().install(_.bind(this.spinUp, this));
	}

	/**
	*	initialize
	*	@public
	*	@method initialize
	*	@return com.spinal.annotation.cli.Examples
	**/
	initialize() {
		console.log(this.program.version().magenta);
		return this;
	}

	/**
	*	Clean Installed Dependencies
	*	@public
	*	@method clean
	*	@return com.spinal.annotation.cli.Examples
	**/
	clean() {
		fs.removeSync(this.libraries);
		return this;
	}

	/**
	*	Install Dependencies via bower
	*	@public
	*	@method install
	*	@param callback {Function} callback
	*	@return com.spinal.annotation.cli.Examples
	**/
	install(callback = function() {}) {
		console.log('Installing Dependencies...'.cyan);
		Bower.commands.install(this.bowerDependencies, null, { cwd: this.baseUrl, directory: 'libraries' })
			.on('end', _.bind(this.babel, this, callback));
		return this;
	}

	/**
	*	Install Babel Goodies (Helpers and Polyfill)
	*	@public
	*	@method babel
	*	@return com.spinal.annotation.cli.Examples
	**/
	babel(callback) {
		if(fs.existsSync(this.rootDir + '/node_modules')) {
			this.babelDependencies.forEach(d => {
				fs.copySync(d.path + d.file, this.libraries + '/babel/' + d.file)
			});
		}
		callback();
		return this;
	}

	/**
	*	Spins Up HTTP Server
	*	@public
	*	@method spinUp
	*	@return Connect
	**/
	spinUp() {
		console.log(`Server localhost listening on port ${this.port}...`.cyan);
		Connect().use(StaticServe(this.baseUrl)).listen(this.port);
		return this;
	}

	/**
	*	@public
	*	@property bowerDependencies
	*	@type Array
	**/
	get bowerDependencies() {
		return [
			'git@github.com:jrburke/requirejs-bower.git#2.1.20',
			'bootstrap#3.3.5',
			'jquery#2.1.4',
			'backbone#1.2.2',
			'underscore#1.8.3'
		];
	}

	/**
	*	@public
	*	@property bowerDependencies
	*	@type Array
	**/
	get babelDependencies() {
		let babelcorePath = '/node_modules/babel/node_modules/babel-core/';
		return [
			{ file: 'browser-polyfill.min.js', path: (this.rootDir + babelcorePath) },
			{ file: 'external-helpers.min.js', path: (this.rootDir + babelcorePath) }
		];
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
	*	@property libraries
	*	@type String
	**/
	get libraries() {
		return (this.baseUrl + '/libraries');
	}

	/**
	*	@public
	*	@property rootDir
	*	@type String
	**/
	get rootDir() {
		return resolve(__dirname, '../../../../../');
	}

	/**
	*	Static Examples run
	*	@static
	*	@method run
	*	@param port {Number} Port Number
	*	@param program {Object} program reference
	*	@return com.spinal.annotation.cli.Examples
	**/
	static run(port = 9393, program) {
		return new Examples(port, program);
	}

}

export default Examples.run;
