/**
*	@module com.boneyard.annotation.util.command
*	@author Patricio Ferreira <3dimentionar@gmail.com>
**/
import {EventEmitter} from 'events';

/**
*	Class SimpleCommand
*	@namespace com.boneyard.annotation.util.command
*	@class com.boneyard.annotation.util.command.SimpleCommand
*	@extends events.EventEmitter
*
*	@requires events.EventEmitter
**/
class SimpleCommand extends EventEmitter {

	/**
	*	@constructor
	*	@param [attrs] {Object} attributes
	*	@return com.boneyard.annotation.util.command.SimpleCommand
	**/
	constructor(attrs = {}) {
		super();
		return this;
	}

	/**
	*	Command Execute Strategy
	*	@public
	*	@method execute
	*	@param [...args] {Object} arguments to be passed to the operation
	*	@return com.boneyard.annotation.util.command.SimpleCommand
	**/
	execute(...args) {}

}

export default SimpleCommand;
