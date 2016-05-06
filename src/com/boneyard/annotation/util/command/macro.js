/**
*	@module com.boneyard.annotation.util.command
*	@author Patricio Ferreira <3dimentionar@gmail.com>
**/
import SimpleCommand from './simple';

/**
*	Class MacroCommand
*	@namespace com.boneyard.annotation.util.command
*	@class com.boneyard.annotation.util.command.MacroCommand
*	@extends com.boneyard.annotation.util.command.SimpleCommand
*
*	@requires com.boneyard.annotation.util.command.SimpleCommand
**/
class MacroCommand extends SimpleCommand {

	/**
	*	@constructor
	*	@param [attrs] {Object} attributes
	*	@return com.boneyard.annotation.util.command.MacroCommand
	**/
	constructor(attrs = {}) {
		super();
		this.subcommands = new Set();
		return this;
	}

	/**
	*	Add sub command
	*	@public
	*	@chainable
	*	@method add
	*	@param command {com.boneyard.annotation.util.command.SimpleCommand} command to add
	*	@return com.boneyard.annotation.util.command.MacroCommand
	**/
	add(command) {
		if(!this.exists(command)) {
			this.subcommands.add(command);
		}
		return this;
	}

	/**
	*	Remove sub command
	*	@public
	*	@chainable
	*	@method add
	*	@param command {com.boneyard.annotation.util.command.SimpleCommand} command to remove
	*	@return com.boneyard.annotation.util.command.MacroCommand
	**/
	remove(command) {
		if(this.exists(command)) {
			this.subcommands.delete(command);
		}
		return this;
	}

	/**
	*	Returns true if a given command exists on this macro command
	*	@public
	*	@method exists
	*	@param command {com.boneyard.annotation.util.command.SimpleCommand} command to evaluate
	*	@return Boolean
	**/
	exists(command) {
		return this.subcommands.has(command);
	}

	/**
	*	Clears sub commands
	*	@public
	*	@chainable
	*	@method reset
	*	@return com.boneyard.annotation.util.command.MacroCommand
	**/
	reset() {
		this.subcommands.clear();
		return this;
	}

	/**
	*	Command Execute Strategy
	*	@public
	*	@chainable
	*	@method execute
	*	@return com.boneyard.annotation.util.command.MacroCommand
	**/
	execute() {
		this.subcommands.forEach((c) => { c.execute(); });
		return this;
	}

}

export default MacroCommand;
