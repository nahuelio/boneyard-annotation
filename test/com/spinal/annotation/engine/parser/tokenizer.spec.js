/**
*	Tokenizer test
*	@author Patricio Ferreira <3dimentionar@gmail.com>
**/

var Tokenizer = require(process.env.LIB_PATH + 'com/spinal/annotation/engine/parser/tokenizer');

describe('com.spinal.annotation.engine.parser.Tokenizer', function() {

	before(function() {
		this.tokenizer = new Tokenizer();
		this.sample = `/**
			* @annotation(param = ["value"])
			*	@Another(param = { key: "value" })
			**/
			class MyClass extends BaseClass {
			}`;
	});

	describe('#constructor', function() {

		it('Should instanciate Tokenizer', function() {
			expect(new Tokenizer(this.sample)).to.be.ok();
		});

	});

	describe('#tokenize', function() {

		it('Should tokenize sample data', function() {
			let result = this.tokenizer.reset(this.sample).tokenize();
			expect(result).to.be.an(Array);
			expect(result.length).above(1);
		});

		it('Should return length 0 when tokenizing empty input', function() {
			let result = this.tokenizer.reset().tokenize();
			expect(result).to.be.an(Array);
			expect(result.length).to.be(0);
		});

	});

	describe('#remove', function() {

		it('Should remove token at specific position', function(done) {
			this.tokenizer.reset(this.sample)
				.on(Tokenizer.Events.next, _.bind(function(token) {
					if(token.indexOf('Another') !== -1) {
						let removed = this.tokenizer.remove();
						expect(removed).to.be(token);
						this.tokenizer.removeAllListeners(Tokenizer.Events.next);
						done();
					}
				}, this)).tokenize();
		});

		it('Should NOT remove an existing token if token list is empty', function() {
			this.tokenizer.reset();
			expect(this.tokenizer.remove()).not.ok();
		});

	});

});
