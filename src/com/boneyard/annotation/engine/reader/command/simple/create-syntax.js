/**
*	@module com.boneyard.annotation.engine.reader.command.simple
*	@author Patricio Ferreira <3dimentionar@gmail.com>
**/

import SimpleCommand from '../../../../util/command/simple';
import SyntaxFactory from '../../../factory/syntax';

/**
*	Class CreateSyntax
*	@namespace com.boneyard.annotation.engine.reader.command.simple
*	@class com.boneyard.annotation.engine.reader.command.simple.CreateSyntax
*	@extends com.boneyard.annotation.util.command.SimpleCommand
*
*	@requires com.boneyard.annotation.util.command.SimpleCommand
*	@requires com.boneyard.annotation.engine.factory.SyntaxFactory
**/
class CreateSyntax extends SimpleCommand {

	/**
	*	Executes Create Syntax Visitor
	*	@public
	*	@chainable
	*	@override
	*	@method execute
	*	@param [...args] {Object} arguments to be passed to the operation
	*	@return com.boneyard.annotation.engine.idiom.Syntax
	**/
	execute(...args) {
		let syntax = CreateSyntax._factory.create(...args);
		this.emit('command:create-syntax:execute', this);
		return syntax;
	}

}

CreateSyntax._factory = new SyntaxFactory();

export default CreateSyntax;
