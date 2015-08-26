/**
*	Parser Tools module
*	@module com.spinal.annotation.engine.parser
*	@author Patricio Ferreira <3dimentionar@gmail.com>
**/

import _ from 'underscore';
import {EventEmitter} from 'events';

/**
*	Class Parser
*	@namespace com.spinal.annotation.engine.parser
*	@class com.spinal.annotation.engine.parser.Parser
*
*	@requires underscore
*	@requires events.EventEmitter
**/
class Parser extends EventEmitter {

	/**
	*	Constructor
	*	@constructor
	*	@param [attrs] {Object} attributes
	*	@return com.spinal.annotation.engine.parser.Parser
	**/
	constructor(attrs = {}) {
		super();
		return this;
	}

}

export default Parser;
