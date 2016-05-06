/**
*	@module com.boneyard.annotation.engine.reader.command
*	@author Patricio Ferreira <3dimentionar@gmail.com>
**/

import MacroCommand from '../../../util/command/macro';
import q from '../../../util/query';

/**
*	Class Query
*	@namespace com.boneyard.annotation.engine.reader.command
*	@class com.boneyard.annotation.engine.reader.command.Query
*	@extends com.boneyard.annotation.util.command.MacroCommand
*
*	@requires com.boneyard.annotation.util.command.MacroCommand
*	@requires com.boneyard.annotation.engine.factory.SyntaxFactory
**/
class Query extends MacroCommand {

	/**
	*	Executes query
	*	@public
	*	@chainable
	*	@override
	*	@method execute
	*	@param [...args] {Object} arguments to be passed to the operation
	*	@return com.boneyard.annotation.engine.reader.command.Query
	**/
	execute(...args) {
		super.execute(q, ...args);
		return this.emit('command:query:execute', this);
	}

}

export default Query;
