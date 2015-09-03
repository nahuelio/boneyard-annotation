/**
*	Annotation Scanner
*	@module com.spinal.annotation
*	@author Patricio Ferreira <3dimentionar@gmail.com>
**/

import {EventEmitter} from 'events';
import _ from 'underscore';
import Parser from './engine/parser/parser';
import Logger from './util/logger';

/**
*	Class Scanner
*	@namespace com.spinal.annotation
*	@class com.spinal.annotation.Scanner
*
*	@requires events.EventEmitter
*	@requires underscore
*	@requires com.spinal.annotation.engine.Parser
*	@requires com.spinal.annotation.util.Logger
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
		this.parser = Parser.from(this.runner.config, reader);
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
		this.output('Configuration Detected', parser.config);
		return parser.on(Parser.Events.read, _.bind(this.onRead, this));
	}

	/**
	*	Scans using the parser
	*	@public
	*	@method scan
	*	@return com.spinal.annotation.Scanner
	**/
	scan() {
		this.parser
			.once(Parser.Events.start, _.bind(this.onStart, this))
			.once(Parser.Events.end, _.bind(this.onEnd, this))
			.parse();
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
		this.output(`File ${file.name}:\n`);
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
		this.output('[DONE]');
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
		Logger.out(`${title}\n`, 'c');
		_.each(summary, function(v, k) { Logger.out(`\t${k}: ${v}\n`, 'y'); }, this);
		return this;
	}

}

export default Scanner;
