/**
*	@module com.boneyard.annotation.engine.writer.instrument
*	@author Patricio Ferreira <3dimentionar@gmail.com>
**/
import _ from 'underscore';
import _s from 'underscore.string';
import Instrument from './instrument';

/**
*	Class WireInstrument
*	@namespace com.boneyard.annotation.engine.writer.instrument
*	@class com.boneyard.annotation.engine.writer.instrument.WireInstrument
*	@extends com.boneyard.annotation.engine.writer.instrument.Instrument
*
*	@requires underscore
*	@requires underscore.string
*	@requires com.boneyard.annotation.engine.writer.instrument.Instrument
**/
class WireInstrument extends Instrument {

	/**
	*	Constructor
	*	@constructor
	*	@param annotation {com.boneyard.annotation.engine.annotation.Annotation} annotation reference
	*	@return com.boneyard.annotation.engine.writer.instrument.WireInstrument
	**/
	constructor(annotation) {
		return super(annotation);
	}

	/**
	*	Resolves Wire locations
	*	@public
	*	@method resolve
	*	@param specs {Array} list of all spec instrumenters
	*	@return Array
	**/
	resolve(specs) {
		var bone;
		for(let s of specs) {
			bone = s.findBoneByWire(this.get());
			if(bone) { this.get().foundIn = bone; break; }
		}
		return bone;
	}

	/**
	*	Resolves Wiring by inspecting the specs and finding the bones.
	*	@public
	*	@method wire
	*	@param specs {Array} list of all spec instrumenters
	*	@return Array
	**/
	wire(specs) {
		this.resolve(specs).inject(this);
	}

	/**
	*	Serialization
	*	@public
	*	@override
	*	@method serialize
	*	@return Object
	**/
	serialize() {
		return super.serialize();
	}

	/**
	*	Class Name
	*	@static
	*	@property NAME
	*	@type String
	**/
	static get NAME() {
		return 'WireInstrument';
	}

}

export default WireInstrument;
