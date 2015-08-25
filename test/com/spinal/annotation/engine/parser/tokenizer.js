/**
*	Tokenizer test
*	@author Patricio Ferreira <3dimentionar@gmail.com>
**/

import expect from 'expect.js';
import Tokenizer from '../../../../../../src/com/spinal/annotation/engine/parser/tokenizer';

describe('com.spinal.annotation.engine.parser.Tokenizer', function() {

	describe('#constructor', function() {

		it('Should instanciate Tokenizer', function() {

			var test = new Tokenizer("Test Data");
			expect(test).to.be.ok();

		});

	});

});
