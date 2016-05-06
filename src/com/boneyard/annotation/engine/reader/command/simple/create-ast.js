/**
*	@module com.boneyard.annotation.engine.reader.command.simple
*	@author Patricio Ferreira <3dimentionar@gmail.com>
**/

import SimpleCommand from '../../../../util/command/simple';
import ASTFactory from '../../../factory/ast';

/**
*	Class CreateAST
*	@namespace com.boneyard.annotation.engine.reader.command.simple
*	@class com.boneyard.annotation.engine.reader.command.simple.CreateAST
*	@extends com.boneyard.annotation.util.command.SimpleCommand
*
*	@requires com.boneyard.annotation.util.command.SimpleCommand
*	@requires com.boneyard.annotation.engine.factory.ASTFactory
**/
class CreateAST extends SimpleCommand {

	/**
	*	Executes create ASTElement
	*	@public
	*	@chainable
	*	@override
	*	@method execute
	*	@param [...args] {Object} arguments to be passed to the operation
	*	@return com.boneyard.annotation.engine.ast.ASTElement
	**/
	execute(...args) {
		let ast = CreateAST._factory.create(...args);
		this.emit('command:create-annotation:execute', this);
		return ast;
	}

}

CreateAST._factory = new ASTFactory();

export default CreateAST;
