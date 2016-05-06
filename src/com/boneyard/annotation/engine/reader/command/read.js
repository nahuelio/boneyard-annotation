/**
*	@module com.boneyard.annotation.engine.reader.command
*	@author Patricio Ferreira <3dimentionar@gmail.com>
**/

import MacroCommand from '../../../util/command/macro';

/**
*	Class Read
*	@namespace com.boneyard.annotation.engine.reader.command
*	@class com.boneyard.annotation.engine.reader.command.Read
*	@extends com.boneyard.annotation.util.command.MacroCommand
*
*	@requires com.boneyard.annotation.util.command.MacroCommand
*	@requires com.boneyard.annotation.engine.factory.SyntaxFactory
**/
class Read extends MacroCommand {

	/**
	*	Executes Read
	*	@public
	*	@chainable
	*	@override
	*	@method execute
	*	@param [...args] {Object} arguments to be passed to the operation
	*	@return com.boneyard.annotation.engine.reader.command.Read
	**/
	execute(...args) {
		super.execute(...args);
		return this.emit('command:read:execute', this);
	}

}

export default Read;
