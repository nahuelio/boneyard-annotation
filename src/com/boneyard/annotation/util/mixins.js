/**
*	@module com.boneyard.annotation.util
*	@author Patricio Ferreira <3dimentionar@gmail.com>
**/

import _ from 'underscore';

_.mixin({

	/**
	*	Clean up expression from comments blocks, white spaces and tabs
	*	@static
	*	@method clean
	*	@param expr {String} expression reference
	*	@return String
	**/
	clean(expr = "") {
		return expr.replace(/[\*|\\|\s|\t]+/gi, '');
	}

});
