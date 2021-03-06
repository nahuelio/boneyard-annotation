/**
*   Karma Configuration for Boneyard Annotation
*	@author Patricio Ferreira <3dimentionar@gmail.com>
**/
module.exports = function(config) {

    config.set({

        basePath: './',

        frameworks: ['mocha', 'expect', 'requirejs'],

        files: [
            'node_modules/karma-babel-preprocessor/node_modules/babel-core/browser-polyfill.js',
            './src/examples/**/*.js',
            './test/examples/**/*.js'
        ],

        exclude: [],

        preprocessors: {
            './src/examples/**/*.js': ['babel', 'coverage'],
            './test/examples/**/*.js': ['babel']
        },

        reporters: ['nyan', 'coverage'],

        babelPreprocessor: {
            options: {
                sourceMap: 'inline'
            },
            filename: function (file) {
                return file.originalPath.replace(/\.js$/, '.es5.js');
            },
            sourceFileName: function (file) {
                return file.originalPath;
            }
        },

        coverageReporter: {
            reporters: [
                { type: 'html', dir: 'coverage/' },
                { type: 'lcov', dir: 'coverage/' }
            ]
        },

        port: 9876,

        colors: true,

        logLevel: config.LOG_ERROR,

        autoWatch: true,

        browsers: ['PhantomJS'],

        singleRun: false
    });

};
