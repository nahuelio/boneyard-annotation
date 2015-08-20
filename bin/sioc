#!/usr/bin/env node

/**
*	Spinal IOC Annotation CLI Tool
*	@author Patricio Ferreira <3dimentionar@gmail.com>
**/

var program = require('commander'),
	_ = require('underscore'),
	pkg = require('../package.json'),
	colors = require('colors'),
	es6 = require('babel/register');

/**
*	Version
**/
program
	.version(('Sioc@' + pkg.version + ' - Spinal IoC Annotation based CLI Tool\n').magenta)
	.usage('[command] [options]');

/**
*	Command: Build
**/
program
	.command('build [source]')
	.description('Scans, analyzes and build dependency injection given a source dir (or an specific file that uses @scan annotations)'.cyan)
	.option('-e, --exclude <paths...>', 'Exclude files using patterns from the scanner'.yellow, function(paths) {
		return paths.split(',');
	})
	.action(_.bind(function(source, program) {
		require('../src/com/spinal/annotation/cli/run')(source, program.exclude, program);
	}, this));

/**
*	Command: Examples
**/
program
	.command('examples [port]')
	.description('Spins up a simple http server to check examples results'.cyan)
	.action(_.bind(function(command, port) {
		require('../src/com/spinal/annotation/cli/examples')((arguments.length === 3) ? port : undefined, program);
	}, this));

/**
*	Program Help
**/
program
	.on('--help', _.bind(function() {
		console.log('\tCommand Build usage example:\n'.yellow);
		console.log('\t\tsioc build ./src/**/*.js -e src/excludeme/**/*.js,src/other.js'.cyan);
		console.log('\n');
		console.log('\tCommand Examples usage:\n'.yellow);
		console.log('\t\tsioc examples -p 9393'.cyan);
		console.log('\n');
	}, this)).parse(process.argv);
