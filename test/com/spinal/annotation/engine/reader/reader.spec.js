/**
*	Reader test
*	@author Patricio Ferreira <3dimentionar@gmail.com>
**/

var Reader = require(process.env.LIB_PATH + 'com/spinal/annotation/engine/reader/reader'),
	Tokenizer = require(process.env.LIB_PATH + 'com/spinal/annotation/engine/parser/tokenizer');

describe('com.spinal.annotation.engine.reader.Reader', function() {

	before(function() {
		this.tokenizer = new Tokenizer();
		this.result = ['/**', '*	@annotation()', '**/', ''];
		this.stubReset = sinon.stub(this.tokenizer, 'reset').returns(this.tokenizer);
		this.stubTokenize = sinon.stub(this.tokenizer, 'tokenize').returns(this.result);
	});

	after(function() {
		this.stubReset.restore();
		this.stubTokenize.restore();
	});

	describe('#constructor', function() {

		it('Should return a new instance of a Reader', function() {
			let reader = new Reader(this.tokenizer);
			expect(reader).to.be.ok();
			expect(reader.tokenizer).to.be.ok();
			expect(reader.annotations).to.be.ok();
			expect(reader.annotations.size).to.be(0);
			expect(reader.factory).to.be.ok();
		});

	});

	describe('#isValid', function() {

		it('Should return true if token is !== "" or if Annotation.Symbol was found in token', function() {

		});

	});

	describe('#read', function() {

		it('Should read annotations from content', function() {
			let reader = new Reader(this.tokenizer);
			let result = reader.read(this.result.join(''));
			expect(result).to.be.an(Array);
			expect(result).to.have.length(4);

			result = reader.read();
			expect(result).to.be.an(Array);
		});

	});

	describe('#onToken', function() {

		it('Should be called on every token found by the internal tokenizer', function() {
			let reader = new Reader(this.tokenizer);

		});

	});

	describe('#getAnnotation', function() {

		it('Should retrieve an instance of an annotation', function() {

		});

		it('Should NOT retrieve an instance of an annotation that its not supported', function() {

		});

	});

	describe('#getAnnotationName', function() {

		it('Should retrieve annotation name if found', function() {

		});

		it('Should return null if none of the annotations supported are found', function() {

		});

	});

	describe('#getAnnotationParameters', function() {

		it('Should retrieve annotation parameters if any exist', function() {

		});

		it('Should return null if no parameters were declared', function() {

		});

	});

	describe('#getAnnotationContext', function() {

		it('Should retrieve annotation context if annotation strategy requires it', function() {

		});

		it('Should return null if context are not part of the annotation strategy', function() {

		});

	});

	describe('static#new', function() {

		it('Should retrieve an instance of a Reader (static constructor)', function() {

		});

	});

});
