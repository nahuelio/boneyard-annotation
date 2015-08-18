/**
*	Spinal IoC Annotation module
*	@module com.spinal.annotation
*	@author Patricio Ferreira <3dimentionar@gmail.com>
**/
import {Annotation, Target} from 'violin-annotations';

/**
*	Class Runner
*	@namespace com.spinal.annotation
*	@class com.spinal.annotation.Runner
*
*	@requires violin-annotations.Annotation
*	@requires violin-annotations.Target
**/
class Runner {

	/**
	*	@constructor
	*	@param source {String} source path
	*	@param [exclude] {Array} list of file patterns to exclude
	*	@return com.spinal.annotation.Runner
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
	*	@return com.spinal.annotation.Runner
	**/
	scan() {
		console.log(this.source, this.exclude);
		return this;
	}

	/**
	*	Static Analyzer run
	*	@static
	*	@method run
	*	@param source {String} source path to be analyzed
	*	@param exclude {Array} list of files/patterns to be excluded
	*	@return com.spinal.annotation.Runner
	**/
	static run(source = './src', exclude = []) {
		return new Runner(source, exclude).scan();
	}

}

export default Runner.run;
