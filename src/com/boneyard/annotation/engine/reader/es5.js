/**
*	@module com.boneyard.annotation.reader
*	@author Patricio Ferreira <3dimentionar@gmail.com>
**/

import Reader from './reader';

/**
*	Class Es5Reader
*	@namespace com.boneyard.annotation.reader
*	@class com.boneyard.annotation.reader.Es5Reader
*	@extends com.boneyard.annotation.reader.Reader
*
*	@requires com.boneyard.annotation.reader.Reader
**/
class Es5Reader extends Reader {

	/**
	*	Constructor
	*	@constructor
	*	@param [...args] {Arguments} constructor arguments
	*	@return com.boneyard.annotation.reader.Es5Reader
	**/
	constructor(...args) {
		return super(...args);
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
		//console.log(esprima.parse(asset.content, this.options));
		return asset;
	}

}

export default Es5Reader;
