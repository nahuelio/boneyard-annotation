#!/usr/bin/env node

/**
*	Boneyard Annotation CLI Tool
*	@author Patricio Ferreira <3dimentionar@gmail.com>
**/

var commandsDir = '../src/com/boneyard/annotation/commands/',
	fs = require('fs-extra'),
	_ = require('underscore'),
	program = require('commander'),
	pkg = require('../package.json'),
	es6 = require('babel/register');

var info = _.template(fs.readFileSync(commandsDir + 'info/yard.info', 'utf-8'));
	help = _.template(fs.readFileSync(commandsDir + 'info/help.info', 'utf-8'));

/**
*	Version Command
**/
program.on('-v', _.bind(function() {
	console.log(info(_.extend(pkg, { today: new Date() })));
}, this));

/**
*	Yard Command
**/
program.action(_.bind(function(configPath, program) {
	var json = readJSON(configPath);
	require(commandsDir + 'runner').new(json);
}, this));

/**
*	Help Command
**/
program.on('--help', _.bind(function() {
	console.log(help());
}, this));

/**
*	Program Argument Parsing
**/
program.parse(process.argv);
