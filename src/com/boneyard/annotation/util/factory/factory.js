/**
*	@module com.boneyard.annotation.util
*	@author Patricio Ferreira <3dimentionar@gmail.com>
**/
import fs from 'fs-extra';
import _ from 'underscore';
import _s from 'underscore.string';
import {resolve} from 'path';
import Logger from './logger';

/**
*	Factory Class
*	@namespace com.boneyard.annotation.util
*	@class com.boneyard.annotation.util.Factory
*
*	@requires fs-extra
*	@requires underscore
*	@requires underscore.string
*	@requires path.resolve
*	@requires com.boneyard.annotation.util.Logger
**/
class Factory {

	/**
	*	Constructor
	*	@constructor
	*	@return com.boneyard.annotation.util.Factory
	**/
	constructor(ns) {
		this.factories = new Map();
		this.namespace = ns;
		return this;
	}

	/**
	*	Retrieves namespace
	*	@public
	*	@property namespace
	*	@type String
	**/
	get namespace() {
		return this._namespace;
	}

	/**
	*	Sets a namespace in wich the factory will pull the factory classes
	*	@public
	*	@method namespace
	*	@param [ns] {String} namespace
	**/
	set namespace(ns = './') {
		this._namespace = resolve(__dirname, ns);
	}

	/**
	*	Register a new factory by a given a path to the class file.
	*	@public
	*	@throws Error
	*	@method register
	*	@param path {String} file path to the resource
	*	@return com.boneyard.annotation.util.Factory
	**/
	register(path = '') {
		if(path === '' || this.exists(path)) return this;
		try {
			var fullpath = `${this.namespace}/${path}`;
			this.factories.set(path, require(fullpath));
		} catch(ex) {
			console.error(ex.message);
		}
		return this;
	}

	/**
	*	Unregisters an existing factory by a given path name.
	*	@public
	*	@chainable
	*	@method unregister
	*	@param path {String} path name
	*	@return com.boneyard.annotation.util.Factory
	**/
	unregister(path = '') {
		if(!this.exists(path)) return this;
		this.factories.delete(path);
		return this;
	}

	/**
	*	Returns true if a factory exists given the path name, otherwise returns false
	*	@public
	*	@method exists
	*	@param [path] {String} path
	*	@return Boolean
	**/
	exists(path = '') {
		return this.factories.has(path);
	}

	/**
	*	Retrieves existing factory given a path name, otherwise if is not found, returns null
	*	@public
	*	@method get
	*	@param path {String} path name
	*	@return Class
	**/
	get(path) {
		return this.factories.get(path);
	}

	/**
	*	Creates and returns an instance of a registered factory given a path name by passing optional
	*	arguments to the constructor. If the factory doesn't exists it returns null.
	*	@public
	*	@method create
	*	@param path {String} path name
	*	@param [...args] {Arguments} optional arguments to pass to the constructor
	*	@return Object
	**/
	create(path, ...args) {
		if(!this.exists(path)) return null;
		let FactoryClass = this.get(path);
		return new FactoryClass(...args);
	}

	/**
	*	Serialize Factory into JSON
	*	@public
	*	@method serialize
	*	@return Object
	**/
	serialize() {
		let out = {};
		this.factories.forEach((v, k) => { out[k] = v; });
		return out;
	}

}

export default Factory;
