/**
*	@module com.boneyard.annotation.util
*	@author Patricio Ferreira <3dimentionar@gmail.com>
**/

import fs from 'fs-extra';
import _ from 'underscore';
import _s from 'underscore.string';

_.mixin({

	/**
	*	Returns true if a given object is not null nor undefined
	*	@public
	*	@method defined
	*	@param o {Object} object reference
	*	@return Boolean
	**/
	defined(o) {
		return (!_.isUndefined(o) && !_.isNull(o));
	},

	/**
	*	Clean up expression from comments blocks, white spaces and tabs
	*	@static
	*	@method clean
	*	@param expr {String} expression reference
	*	@return String
	**/
	clean(expr = "") {
		return expr.replace(/[\*|\\|\s|\t]+/gi, '');
	},

	/**
	*	Clean up empty lines from a given String
	*	@static
	*	@method cleanEmptyLines
	*	@param str {String} input string
	*	@return String
	**/
	cleanEmptyLines(str = "") {
		return str.replace(/^\s*[\r\n]/gm, '');
	},

	/**
	*	Convert a String in dot notation format into a JSON object
	*	@static
	*	@method strToJSON
	*	@param expr {String} dot notation
	*	@return Object
	**/
	strToJSON: function(expr) {
		if(!expr || !_.isString(expr) || expr === '') return {};
		var p = {}, o = p, ps = expr.split('.');
		for(var i = 0; i < ps.length; i++) {
			p[ps[i]] = {}; p = p[ps[i]];
			if(i === (ps.length-1)) p = null;
		}
		return o;
	},

	/**
	*	Assing object to path Strategy
	*	@static
	*	@method namespace
	*	@param path {String} path
	*	@param o {Object} object
	*	@param [ctx] {Object} context
	*	@return Function
	**/
	ns: function(path, o, ctx) {
		if(!path || !_.isString(path) || !o)
			throw new Error('_.ns() requires a namespace (in dot notation) and a function (or object)');
		var parts = path.split('.'), part = (ctx) ? ctx : {};
		var obj, name, ps = parts.length;
		for(var i = 0; i < ps; i++) {
			obj = part; name = parts[i];
			part = (part[name]) ? part[name] : (part[name] = {});
		}
		return (obj[name] = o);
	}

});

/**
*	Template aggregation parsing added to require node strategy
**/
require.extensions['.tpl'] = function(module, filename) {
    module.exports = fs.readFileSync(filename, 'utf8');
};
