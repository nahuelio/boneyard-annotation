/**
*	Annotation test
*	@author Patricio Ferreira <3dimentionar@gmail.com>
**/

var Annotation = require(process.env.LIB_PATH + 'com/spinal/annotation/support/annotation');

describe('com.spinal.annotation.support.Annotation', function() {

	before(function() {
		this.annotation = `*	@wire({ key: "value" })`;
	});

	describe('#constructor(attrs)', function() {

		it('Should instanciate', function() {
			this.annotation = new Annotation();
			expect(this.annotation).to.be.ok();
		});

	});

	describe('#expression(expr)', function() {

		it('Should extract the expression', function() {

		});

		it('Should return null when extracting an empty expression', function() {

		});

	});

	describe('static#name(expr)', function() {

	});

	describe('static#Symbol', function() {

		it('Should be a @ character', function() {
			expect(Annotation.Symbol).to.be('@');
		});

	})

});
