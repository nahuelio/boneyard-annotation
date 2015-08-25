/**
*	Spinal IoC Annotation module
*	@module com.spinal.annotation.commands
*	@author Patricio Ferreira <3dimentionar@gmail.com>
**/

import Scanner from '../scanner';

/**
*	Class Runner
*	@namespace com.spinal.annotation.commands
*	@class com.spinal.annotation.commands.Runner
*
*	@requires com.spinal.annotation.Scanner
**/
class Runner {

	/**
	*	@constructor
	*	@param source {String} source path
	*	@param [exclude] {Array} list of file patterns to exclude
	*	@return com.spinal.annotation.commands.Runner
	**/
	constructor(source, exclude) {
		this.source = source;
		this.exclude = exclude;
		return this;
	}

	/**
	*	Scan Source path
	*	@public
	*	@method scan
	*	@return com.spinal.annotation.commands.Runner
	**/
	scan() {
		this.scanner = new Scanner(this);
		this.scanner.on(Scanner.Events.complete, this.onScannerComplete, this)
			.on(Scanner.Events.bone, this.onScannerBone, this)
			.on(Scanner.Events.inject, this.onScannerInject, this)
			.parse();
		return this;
	}

	/**
	*	Scanner Bone Handler
	*	@public
	*	@method onScannerBone
	*	@param bone {com.spinal.annotation.support.Bone} bone reference
	*	@return com.spinal.annotation.commands.Runner
	**/
	onScannerBone(bone) {
		// TODO
		return this;
	}

	/**
	*	Scanner Injection Handler
	*	@public
	*	@method onScannerInject
	*	@param bone {com.spinal.annotation.support.Bone} bone reference
	*	@param info {Object} injection information
	*	@return com.spinal.annotation.commands.Runner
	**/
	onScannerInject(bone, info) {
		// TODO
		return this;
	}

	/**
	*	Scanner Complete Handler
	*	@public
	*	@method onScannerComplete
	*	@param scanner {com.spinal.annotation.Scanner} scanner reference
	*	@return com.spinal.annotation.commands.Runner
	**/
	onScannerComplete() {
		// TODO
		return this;
	}

	/**
	*	Static Analyzer run
	*	@static
	*	@method run
	*	@param source {String} source path to be analyzed
	*	@param exclude {Array} list of files/patterns to be excluded
	*	@return com.spinal.annotation.commands.Runner
	**/
	static run(source = './examples', exclude = []) {
		return new Runner(source, exclude).scan();
	}

}

export default Runner.run;
