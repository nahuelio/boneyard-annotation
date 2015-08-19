#!/usr/bin/env node

/**
*	Spinal IOC Annotation CLI Tool
*	@author Patricio Ferreira <3dimentionar@gmail.com>
**/

var program = require('commander'),
	pkg = require('../package.json'),
	_ = require('underscore');

program
	.version('Sioc@' + pkg.version + ' - Spinal IoC Annotation based CLI Tool\n')
	.usage('<options> [sourcepath]')
	.arguments('[sourcepath]')
	.action(_.bind(function(sourcepath) { program.source = sourcepath; }, this))
	.option('-e, --exclude <paths...>', 'List of files/patterns to exclude from the parser', function(paths) {
		return paths.split(',');
	})
	.on('--help', function() {
		console.log('\tExamples:\n');
		console.log('\tsioc -e src/excludeme/**/*.js,src/other.js ./src/**/*.js');
		console.log('\n');
	}).parse(process.argv);

require('babel/register');
require('../src/com/spinal/annotation/run')(program.source, program.exclude);
