/**
*	Annotation Scanner
*	@module com.spinal.annotation
*	@author Patricio Ferreira <3dimentionar@gmail.com>
**/

import {EventEmitter} from 'events';
import _ from 'underscore';
import Parser from './engine/parser/parser';

/**
*	Class Scanner
*	@namespace com.spinal.annotation
*	@class com.spinal.annotation.Scanner
*
*	@requires events.EventEmitter
*	@requires underscore
*	@requires com.spinal.annotation.engine.Parser
**/
class Scanner extends EventEmitter {

	/**
	*	@constructor
	*	@param runner {com.spinal.annotation.commands.Runner} runner
	*	@return com.spinal.annotation.Scanner
	**/
	constructor(runner, reader) {
		super();
		this.runner = runner;
		this.parser = Parser.from(this.runner.config, reader)
			.once(Parser.Events.start, this.onStart)
			.once(Parser.Events.end, this.onEnd);
		return this;
	}

	/**
	*	Default Scanner Start Handler
	*	@public
	*	@method onStart
	*	@param parser {com.spinal.annotation.engine.Parser}
	*	@return com.spinal.annotation.Scanner
	**/
	onStart(parser) {
		this.output('\033[1;36mConfiguration Detected\033[0m', config);
		return parser.on(Parser.Events.read, this.onRead);
	}

	/**
	*	Scans using the parser
	*	@public
	*	@method scan
	*	@return com.spinal.annotation.Scanner
	**/
	scan() {
		this.parser.parse();
		return this;
	}

	/**
	*	Default Scanner Read Handler
	*	@public
	*	@method onRead
	*	@param file {Object} file reference
	*	@return com.spinal.annotation.Scanner
	**/
	onRead(file) {
		console.log(`File ${file.name}:\n`);
		return this;
	}

	/**
	*	Default Scanner End Handler
	*	@public
	*	@method onEnd
	*	@param parser {com.spinal.annotation.engine.Parser}
	*	@return com.spinal.annotation.Scanner
	**/
	onEnd() {
		this.output(`\033[1;36m[DONE]\033[0m`);
		return this;
	}

	/**
	*	Outputs to the stdout the configuration Detected
	*	@public
	*	@method output
	*	@param title {String} title
	*	@param summary {Object} Config key value pairs options
	*	@return com.spinal.annotation.Scanner
	**/
	output(title, summary = {}) {
		console.log(`${title}\n`);
		_.each(summary, function(v, k) { console.log(`\t${k}: ${v}\n`); }, this);
		return this;
	}

}

export default Scanner;
