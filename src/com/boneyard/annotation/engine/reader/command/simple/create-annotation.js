/**
*	@module com.boneyard.annotation.engine.reader.command.simple
*	@author Patricio Ferreira <3dimentionar@gmail.com>
**/

import SimpleCommand from '../../../../util/command/simple';
import AnnotationFactory from '../../../factory/annotation';

/**
*	Class CreateAnnotation
*	@namespace com.boneyard.annotation.engine.reader.command.simple
*	@class com.boneyard.annotation.engine.reader.command.simple.CreateAnnotation
*	@extends com.boneyard.annotation.util.command.SimpleCommand
*
*	@requires com.boneyard.annotation.util.command.SimpleCommand
*	@requires com.boneyard.annotation.engine.factory.AnnotationFactory
**/
class CreateAnnotation extends SimpleCommand {

	/**
	*	Execute create annotation
	*	@public
	*	@chainable
	*	@override
	*	@method execute
	*	@param [...args] {Object} arguments to be passed to the operation
	*	@return com.boneyard.annotation.engine.support.Annotation
	**/
	execute(...args) {
		let annotation = CreateAnnotation._factory.create(...args);
		this.emit('command:create-annotation:execute', this);
		return annotation;
	}

}

CreateAnnotation._factory = new AnnotationFactory();

export default CreateAnnotation;
