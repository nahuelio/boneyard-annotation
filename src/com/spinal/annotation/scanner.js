/**
*	Annotation Scanner
*	@module com.spinal.annotation
*	@author Patricio Ferreira <3dimentionar@gmail.com>
**/

import fs from 'fs-extra';
import {resolve} from 'path';
import {EventEmitter} from 'events';
import Glob from 'glob';
import _ from 'underscore';
import Parser from 'violin-annotations';
import ES6Reader from 'violin-annotations/src/reader/Es6Reader';

/**
*	Class Scanner
*	@namespace com.spinal.annotation
*	@class com.spinal.annotation.Scanner
*
*	@requires fs-extra
*	@requires path
*	@requires events.EventEmitter
*	@requires underscore
*	@requires glob
*	@requires violin-annotations.Parser
*	@requires violin-annotations.src.reader.Es6Reader
**/
export default class Scanner extends EventEmitter {

	/**
	*	@constructor
	*	@param [attrs] {Object} attributes
	*	@return com.spinal.annotation.Scanner
	**/
	constructor(runner) {
		super();
		this.runner = runner;
		this.parser = new Parser(null, ES6Reader);
		return this.register();
	}

	/**
	*	Register Supported Annotations into this parser
	*	@public
	*	@method register
	*	@return com.spinal.annotation.Scanner
	**/
	register() {
		console.log('Supported Annotations\n');
		Scanner.Annotations.forEach(a => {
			console.log(`\t@${a}`);
			this.parser.getRegistry().registerAnnotationFile(resolve(__dirname, './support', (a + '.js')));
		});
		return this;
	}

	/**
	*	Returns true if path is a file, otherwise false
	*	@public
	*	@method isFile
	*	@param path {String} path to be evaluated
	*	@return Boolean
	**/
	isFile(path = "") {
		return fs.lstatSync(path).isFile();
	}

	/**
	*	Returns true if path is a folder, otherwise false
	*	@public
	*	@method isFolder
	*	@param path {String} path to be evaluated
	*	@return Boolean
	**/
	isFolder(path = "") {
		return fs.lstatSync(path).isDirectory();
	}

	/**
	*	Parse Source path
	*	@public
	*	@method parse
	*	@return com.spinal.annotation.Scanner
	**/
	parse() {
		console.log('\nScanning annotations...\n');
		if(this.isFile(this.runner.source)) this.file(this.runner.source);
		if(this.isFolder(this.runner.source)) this.batch(this.allowedMatches, this.rootDir);
		return this;
	}

	/**
	*	Batch Files found in source path
	*	@public
	*	@method batch
	*	@return com.spinal.annotation.Scanner
	**/
	batch(patterns, basePath) {
		Glob.sync('**/*.js', { cwd: this.runner.source, nodir: true, ignore: this.ignoreList }).forEach(f => {
			this.file(resolve(this.runner.source, f), f);
		});
	}

	/**
	*	Parse File
	*	@public
	*	@method file
	*	@param path {String} source path
	*	@return com.spinal.annotation.Scanner
	**/
	file(path, filename) {
		console.log(`File ${path}:\n`);
		this.parser.parseFile(path, _.bind(this.onFile, this, filename));
		return this;
	}

	/**
	*	File Found Handler
	*	@public
	*	@method onFile
	*	@param [err] {String} Error if any
	*	@param annotations {Array} annotations found
	*	@return com.spinal.annotation.Scanner
	**/
	onFile(filename, err, annotations) {
		if(err) {
			console.log(err);
			process.exit(1);
		}
		console.log(filename, ' =>', annotations);
	}

	/**
	*	Ignore List
	*	@public
	*	@property ignoreList
	*	@type Array
	**/
	get ignoreList() {
		return ['libraries/**/*.*', 'main.js'];
	}

	/**
	*	Events
	*	@static
	*	@property Annotations
	*	@return Array
	**/
	static get Events() {
		return {
			complete: 'com:spinal:annotation:scanner:complete',
			bone: 'com:spinal:annotation:scanner:bone',
			inject: 'com:spinal:annotation:scanner:inject'
		};
	}

	/**
	*	Annotations List supported by this Scanner
	*	@static
	*	@property Annotations
	*	@return Array
	**/
	static get Annotations() {
		return [
			'bone',
			'scan',
			'wire'
		];
	}

}
