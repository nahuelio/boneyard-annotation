/**
*	@module com.boneyard.annotation.util
*	@author Patricio Ferreira <3dimentionar@gmail.com>
**/

import _ from 'underscore';
import jsl from 'jsonselect';

export default {

	/**
	*   Parses and "compiles" the selector, then matches it against the object
	*   argument.  Matches are returned in an array.  Throws an error when
	*   there's a problem parsing the selector.
	*	@public
	*	@method match
	*	@param sel {String} selector
	*	@param arr {Array} values to replace no selector expressions
	*	@return Array
	**/
	match: function(sel, arr) {
		return jsl.match(sel, arr, jsl.__json);
	},

	/**
	*	Like match, but rather than returning an array, invokes the provided
	*   callback once per match as the matches are discovered.
	*	@public
	*	@method forEach
	*	@param sel {String} selector
	*	@param arr {Array} values to replace on selector expressions
	*	@param callback {Function} callback to be called on every match
	**/
	forEach: function(sel, arr, callback) {
		return jsl.forEach(sel, arr, jsl.__json, callback);
	},

	/**
	*	Retrieve JSON Object
	*	@public
	*	@method set
	*	@param [json] {Object} json object used to query
	**/
	set: function(json = {}) {
		jsl.__json = json;
		return this;
	},

	/**
	*	Retrieve JSON Object
	*	@public
	*	@method get
	*	@return Object
	**/
	get: function() {
		return jsl.__json;
	}

};
