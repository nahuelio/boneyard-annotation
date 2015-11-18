/**
*	Boneyard Configuration - Es6 Examples
*	@author Patricio Ferreira <3dimentionar@gmail.com>
*/
requirejs.config({

	baseUrl: '/',

	paths: {
		'babel': 'libraries/babel',
		'boneyard-ioc': 'libraries/boneyard/dist/boneyard-ioc',
		'boneyard-util': 'libraries/boneyard/dist/boneyard-util',
		'boneyard-ui': 'libraries/boneyard/dist/boneyard-ui',
		'boneyard-themes': 'libraries/boneyard/dist/themes'
	},

	shim: {
		'boneyard-util': ['babel/browser-polyfill.min', 'babel/external-helpers.min']
	}

});
