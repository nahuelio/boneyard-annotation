/**
*	@module com.boneyard.annotation.commands
*	@author Patricio Ferreira <3dimentionar@gmail.com>
**/

import Scanner from '../scanner';

/**
*	Class Runner
*	@namespace com.boneyard.annotation.commands
*	@class com.boneyard.annotation.commands.Runner
*
*	@requires com.boneyard.annotation.Scanner
**/
class Runner {

	/**
	*	@constructor
	*	@param reader {String} reader id (support either, 'es5' or 'es6')
	*	@param source {String} source path
	*	@param [exclude] {Array} list of file patterns to exclude
	*	@return com.boneyard.annotation.commands.Runner
	**/
	constructor(reader = 'es6', source, exclude) {
		this.source = source;
		this.exclude = exclude;
		this.scanner = new Scanner(this, reader).scan();
		return this;
	}

	/**
	*	Retrieves config properties
	*	@public
	*	@property config
	*	@type Object
	**/
	get config() {
		return {
			cwd: this.source.substring(0, this.source.lastIndexOf('/')),
			target: this.source.substring(this.source.lastIndexOf('/'), this.source.length),
			ignore: ['libraries/**/*.*', 'main.js'],
			nodir: true
		};
	}

	/**
	*	Static Scanner Run
	*	@static
	*	@method run
	*	@param reader {String} Reader Support
	*	@param source {String} source path to be analyzed
	*	@param exclude {Array} list of files/patterns to be excluded
	*	@return com.boneyard.annotation.Scanner
	**/
	static new(reader = 'es6', source = './examples', exclude = []) {
		return new Runner(reader, source, exclude);
	}

}

export default Runner;
