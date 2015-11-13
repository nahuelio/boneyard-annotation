/**
*	@module com.boneyard.annotation.commands
*	@author Patricio Ferreira <3dimentionar@gmail.com>
**/
import fs from 'fs-extra';
import {resolve} from 'path';
import _ from 'underscore';
import Bower from 'bower';
import Connect from 'connect';
import BabelConnect from 'babel-connect';
import StaticServe from 'serve-static';
import Logger from '../util/logger';

/**
*	Class Examples
*	@namespace com.boneyard.annotation.commands
*	@class com.boneyard.annotation.commands.Examples
*
*	@requires fs-extra
*	@requires resolve
*	@requires underscore
*	@requires bower
*	@requires connect
*	@requires babel-connect
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
		return this.initialize().clean().install(_.bind(this.spinUp, this));
	}

	/**
	*	Initialize
	*	@public
	*	@method initialize
	*	@return com.boneyard.annotation.commands.Examples
	**/
	initialize() {
		Logger.out(this.program.version());
		return this;
	}

	/**
	*	Clean Installed Dependencies
	*	@public
	*	@method clean
	*	@return com.boneyard.annotation.commands.Examples
	**/
	clean() {
		fs.removeSync(this.libraries);
		fs.removeSync((this.rootDir + '/dist'));
		return this;
	}

	/**
	*	Install Dependencies via bower
	*	@public
	*	@method install
	*	@param callback {Function} callback
	*	@return com.boneyard.annotation.commands.Examples
	**/
	install(callback = function() {}) {
		Logger.out('Installing Dependencies...', 'c');
		Bower.commands.install(this.bowerDependencies, null, { cwd: this.baseUrl, directory: 'libraries' })
			.on('end', _.bind(this.babel, this, callback));
		return this;
	}

	/**
	*	Install Babel Goodies (Helpers and Polyfill)
	*	@public
	*	@method babel
	*	@return com.boneyard.annotation.commands.Examples
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
		Logger.out(`Server localhost listening on port ${this.port}...`, 'm');
		Connect()
			.use(BabelConnect(this.babelConnect))
			.use(StaticServe((this.rootDir + '/dist')))
			.use(StaticServe(this.baseUrl))
			.listen(this.port);
		return this;
	}

	/**
	*	@public
	*	@property bowerDependencies
	*	@type Array
	**/
	get bowerDependencies() {
		return ['boneyard#0.1.x'];
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
	*	Babel Connect Configuration
	*	@public
	*	@property babelConnect
	*	@type Object
	**/
	get babelConnect() {
		return {
			options: {
				modules: 'amd',
				externalHelpers: true
			},
			src: this.baseUrl,
			dest: (this.rootDir + '/dist'),
			ignore: [/libraries/, 'main.js']
		};
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
	static run(port = 9393, program) {
		return new Examples(port, program);
	}

}

export default Examples.run;
