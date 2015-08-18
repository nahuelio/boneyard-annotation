/**
*   Karma Configuration for Spinal Annotation
*	@author Patricio Ferreira <3dimentionar@gmail.com>
**/
module.exports = function(config) {

    config.set({

        basePath: 'test',

        frameworks: ['mocha'],

        files: ['src/**/*.js', 'test/**/*.js'],

        exclude: [],

        preprocessors: { 'src/*.js': ['coverage'] },

        reporters: ['progress', 'coverage'],

        coverageReporter: { type : 'html', dir : 'coverage/' },

        port: 9876,

        colors: true,

        logLevel: config.LOG_INFO,

        autoWatch: true,

        browsers: [],

        singleRun: false
    });

};
