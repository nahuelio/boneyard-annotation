/**
*	Spinal IoC annotation Require Config
*	@author Patricio Ferreira <3dimentionar@gmail.com>
**/
requirejs.config({

	baseUrl: '/',

	paths: {
		babel: 'libraries/babel',
		bootstrap: 'libraries/bootstrap/dist/js/bootstrap.min',
		jquery: 'libraries/jquery/dist/jquery.min',
		backbone: 'libraries/backbone/backbone-min',
		underscore: 'libraries/underscore/underscore-min'
	},

	shim: {
		jquery: ['underscore'],
		bootstrap: ['jquery'],
		backbone: ['bootstrap', 'babel/browser-polyfill.min', 'babel/external-helpers.min']
	}

});

require(['common/application'], function(Application) { return Application.bootstrap(); })
