/**
*	Utils module
*	@module com.spinal.annotation.util
*	@author Patricio Ferreira <3dimentionar@gmail.com>
**/

import _ from 'underscore';

/**
*	Class Logger
*	@namespace com.spinal.annotation.util
*	@class com.spinal.annotation.util.Logger
*
*	@requires underscore
**/
class Logger  {

	/**
	*	Constructor
	*	@constructor
	*	@param [attrs] {Object} attributes
	*	@throws {Error} Cannot instanciate Logger Class. All properties and method are static.
	**/
	constructor() {
		throw new Error('Cannot instanciate Logger Class. All properties and methods are static.');
	}

	/**
	*	Sets environment
	*	@static
	*	@property environment
	*	@type String
	**/
	static set environment(env) {
		Logger.env = env;
	}

	/**
	*	Supported environments
	*	@static
	*	@property environments
	*	@type Object
	**/
	static get environments() {
		return {
			dev: 'development',
			test: 'test',
			prod: 'production'
		}
	}

	/**
	*	Supported Table of colors
	*	@static
	*	@property colors
	*	@type Object
	**/
	static get colors() {
		return {
			s: '\x1b[0m', // standard
			y: '\x1b[1;33m', // yellow
			m: '\x1b[1;35m', // magenta
			c: '\x1b[1;36m', // cyan
			r: '\x1b[1;31m', // red
			g: '\x1b[1;32m', // green
		}
	}

	/**
	*	Outputs a given string to the standard output as a warning (yellow color)
	*	@static
	*	@method warn
	*	@param [str] {String} string to output
	*	@return String
	**/
	static warn(str) {
		return Logger.out(str, 'y');
	}

	/**
	*	Outputs a given string to the standard output as an error (red color)
	*	@static
	*	@method error
	*	@param [str] {String} string to output
	*	@return String
	**/
	static error(str) {
		return Logger.out(str, 'r');
	}

	/**
	*	Outputs a given string to the standard output as a standard output (green color)
	*	@static
	*	@method log
	*	@param [str] {String} string to output
	*	@return String
	**/
	static log(str) {
		return Logger.out(str, 's');
	}

	/**
	*	Outputs a given string to the standard output by optionally providing a color.
	*	@static
	*	@method out
	*	@param [str] {String} string to output
	*	@param [color] {String} color shortcut - See {{#crossLink "com.spinal.annotation.util.Logger/colors:property"}}{{/crossLink}}
	*	@return String
	**/
	static out(str, color) {
		let output = null;
		if(str && Logger.env === Logger.environments.dev) {
			color = (color && Logger.colors[color]) ? Logger.colors[color] : Logger.colors['s'];
			output = color + str + Logger.colors.s;
			console.log(output);
		}
		return output;
	}

}

// Default
Logger.env = Logger.environments.prod;

export default Logger;
