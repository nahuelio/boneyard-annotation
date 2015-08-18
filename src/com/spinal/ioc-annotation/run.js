/**
*	Spinal IoC Annotation module
*	@module com.spinal.ioc-annotation
*	@author Patricio Ferreira <3dimentionar@gmail.com>
**/
import {Annotation, Target} from 'violin-annotations';

/**
*	Class Runner
*	@namespace com.spinal.ioc-annotation
*	@class com.spinal.ioc-annotation.Runner
*
*	@requires violin-annotations.Annotation
*	@requires violin-annotations.Target
**/
class Runner {

	/**
	*	@constructor
	*	@param source {String} source path
	*	@param [exclude] {Array} list of file patterns to exclude
	*	@return com.spinal.ioc-annotation.Runner
	**/
	constructor(source, exclude) {
		this.source = source;
		this.exclude = exclude;
		return this;
	}

	/**
	*	Analyze Source path
	*	@public
	*	@method analyze
	*	@return com.spinal.ioc-annotation.Runner
	**/
	analyze() {
		console.log(this.source, this.exclude);
		return this;
	}

	/**
	*	Static Analyzer run
	*	@static
	*	@method run
	*	@param source {String} source path to be analyzed
	*	@param exclude {Array} list of files/patterns to be excluded
	*	@return com.spinal.ioc-annotation.Runner
	**/
	static run(source = './src', exclude = []) {
		return new Runner(source, exclude).analyze();
	}

}

export default Runner.run;
