/**
*	@module com.boneyard.annotation.reader
*	@author Patricio Ferreira <3dimentionar@gmail.com>
**/

import _s from 'underscore.string';
import esprima from 'esprima';
import q from '../../util/query';
import Reader from './reader';

/**
*	Class Es6Reader
*	@namespace com.boneyard.annotation.reader
*	@class com.boneyard.annotation.reader.Es6Reader
*	@extends com.boneyard.annotation.reader.Reader
*
*	@requires underscore.string
*	@requires esprima
*	@requires json-query
*	@requires com.boneyard.annotation.reader.Reader
**/
class Es6Reader extends Reader {

	/**
	*	Constructor
	*	@constructor
	*	@param [...args] {Arguments} constructor arguments
	*	@return com.boneyard.annotation.reader.Es6Reader
	**/
	constructor(...args) {
		super(...args);
		this._program = this.astFactory.create('program.js');
		return this;
	}

	/**
	*	Asset Content Parsing Strategy
	*	@public
	*	@override
	*	@method parse
	*	@param asset {Object} asset reference
	*	@return Object
	**/
	parse(asset) {
		//q.set(esprima.parse(asset.content, this.options));
		//console.log(q('body.type'));
		//.forEach((n) => { this.program.add(this.filename(asset, n)); });
		return asset;
	}

	test() {
		q.set({
		  people: [
		    {name: 'Matt', country: 'NZ'},
		    {name: 'Pete', country: 'AU'},
		    {name: 'Mikey', country: 'NZ'}
		  ]
		});
		console.log(q('people[].name'));
	}

	/**
	*	Retrieves asset relative filename path to the source directory
	*	@public
	*	@method filename
	*	@param asset {Object} asset reference
	*	@return String
	**/
	filename(asset) {
		return _s.strRight(asset.path, this.settings.basePath);
	}

}

export default Es6Reader;
