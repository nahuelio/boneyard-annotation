/**
*	Annotation test
*	@author Patricio Ferreira <3dimentionar@gmail.com>
**/

var Annotation = require(process.env.LIB_PATH + 'com/spinal/annotation/support/annotation');

describe('com.spinal.annotation.support.Annotation', function() {

	before(function() {
		this.token = `*	@wire({ key: "value" })`;
	});

	describe('#constructor(attrs)', function() {

		it('Should instanciate', function() {
			this.annotation = new Annotation();
			expect(this.annotation).to.be.ok();
		});

	});

	describe('static#Symbol', function() {

		it('Should be a @ character', function() {
			expect(Annotation.Symbol).to.be('@');
		});

	})

});
