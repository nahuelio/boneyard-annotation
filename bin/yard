#!/usr/bin/env node

/**
*	Boneyard Annotation CLI Tool
*	@author Patricio Ferreira <3dimentionar@gmail.com>
**/

var fs = require('fs-extra'),
	resolve = require('path').resolve,
	_ = require('underscore'),
	Command = require('commander').Command,
	program = require('commander'),
	chalk = require('chalk'),
	pkg = require('../package.json'),
	es6 = require('babel-register'),
	basePath = resolve(__dirname, '../src/com/boneyard/annotation/commands'),
	Runner = require(basePath + '/runner').default;

var year = new Date().getFullYear(),
	info = _.template(fs.readFileSync(basePath + '/info/yard.info', 'utf8')),
	help = _.template(fs.readFileSync(basePath + '/info/help.info', 'utf8'));

/**
*	CLI Information
**/
var version = _.bind(function() { return chalk.cyan(info(_.extend(pkg, { year: year }))); }, this);

/**
*	Help Override
**/
Command.prototype.helpInformation = _.bind(function() {
	console.log(version());
	console.log(help({ chalk: chalk }));
	return '';
}, this);

/**
*	Yard Command
**/
program
	.version(version())
	.option('-c, --config <path>', 'Path to your configuration file')
	.parse(process.argv)

if(program.config) {
	Runner.new(fs.readJsonSync(program.config));
}
