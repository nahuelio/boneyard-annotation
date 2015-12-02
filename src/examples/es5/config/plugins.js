/**
*	Es5 Examples - Plugins Configuration
*	@module examples.es5.config
*	@author Patricio Ferreira <3dimentionar@gmail.com>
*/
define([], function() {

	/**
	*	Plugins Configuration
	*	@public
	*	@json({ id: "plugins", spec: "specs/application" })
	*	@property plugins
	*	@type Object
	**/
	var Configuration = {

		/**
		*	HTML Plugin
		*	@public
		*	@property html
		*	@type Object
		**/
		html: {
			config: { basePath: 'text!partials' },
			common: { path: 'common', lazyload: true }
		},

		/**
		*	Themes Plugin
		*	@public
		*	@property themes
		*	@type Object
		**/
		themes: {
			config: { basePath: 'themes', bootstrap: true, defaultTheme: true },
			boneyard: { path: 'silver', default: true }
		}

	};

	return Configuration;

});
