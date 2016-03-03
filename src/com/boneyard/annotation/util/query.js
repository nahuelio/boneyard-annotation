/**
*	@module com.boneyard.annotation.util
*	@author Patricio Ferreira <3dimentionar@gmail.com>
**/

import _ from 'underscore';
import q from 'json-query';

const wrap = function(query = '') { return q(query, { data: wrap.json }); };
const set = function(json = {}) { wrap.json = json; };
const get = function() { return wrap.json; };
_.extend(wrap, { set: set, get: get });

export default wrap;
