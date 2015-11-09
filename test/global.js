global.path = require('path');
global._ = require('underscore');
global.expect = require('expect.js');
global.sinon = require('sinon');
global.rootDir = path.resolve(__dirname, '../');
global.Logger = require(process.env.LIB_PATH + 'com/boneyard/annotation/util/logger');
Logger.environment = Logger.environments.test;
