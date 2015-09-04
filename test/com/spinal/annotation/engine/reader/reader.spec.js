/**
*	Reader test
*	@author Patricio Ferreira <3dimentionar@gmail.com>
**/

var Reader = require(process.env.LIB_PATH + 'com/spinal/annotation/engine/reader/reader'),
	Annotation = require(process.env.LIB_PATH + 'com/spinal/annotation/support/annotation'),
	Tokenizer = require(process.env.LIB_PATH + 'com/spinal/annotation/engine/parser/tokenizer');

describe('com.spinal.annotation.engine.reader.Reader', function() {

	before(function() {
		this.tokenizer = new Tokenizer();
		this.result = ['/**', '// @annotation0', '*	@annotation1()', '**/', '// @annotation2({ key: "value", flag: false })', '@annotation3()'];
		this.resultSet = new Set(this.result);
		this.stubReset = sinon.stub(this.tokenizer, 'reset').returns(this.tokenizer);
	});

	after(function() {
		this.stubReset.restore();
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

		// Returns false because only 1 condition is met
		it('Should still return false: when token is only a string',  function() {
			let reader = new Reader(this.tokenizer);
			expect(reader.isValid("")).to.be(false);
		});

		// Returns false because only 2 conditions are met
		it('Should still return false: when token is only a string and not an empty string ("")', function() {
			let reader = new Reader(this.tokenizer);
			expect(reader.isValid("something")).to.be(false);
		});

		// Returns false because only 3 conditions are met
		it('Should still return false: when token is only a string, not empty and contains a Annotation.Symbol', function() {
			let reader = new Reader(this.tokenizer);
			expect(reader.isValid("@something")).to.be(false);
		});

		// Returns true because all 4 conditions are met
		it('Should return true: when token is string, not empty, contains Annotation.Symbol and it is inside a comment block', function() {
			let reader = new Reader(this.tokenizer);
			expect(reader.isValid("* @something")).to.be(true); // multiple line comment block
			expect(reader.isValid("// @something")).to.be(true); // single line comment block
		});

	});

	describe('#read', function() {

		it('Should read annotations from content', function() {
			let reader = new Reader(this.tokenizer);
			let stubTokenize = sinon.stub(this.tokenizer, 'tokenize').returns([]);
			let result = reader.read([...this.resultSet].join(''));

			expect(result).to.be.a(Reader);

			result = reader.read();
			expect(result).to.be.a(Reader);

			stubTokenize.restore();
		});

	});

	describe('#onToken', function() {

		it('Should be called on every token found by the internal tokenizer', function() {
			let stubTokenize = sinon.stub(this.tokenizer, 'tokenize', _.bind(function() {
				this.result.forEach((token) => { this.tokenizer.emit(Tokenizer.Events.next, token); });
			}, this));

			let reader = new Reader(this.tokenizer);
			let stubGetAnnotationMetadata = sinon.stub(reader, 'getAnnotationMetadata', Annotation.metadata);
			let stubGetAnnotation = sinon.stub(reader, 'getAnnotation', function(metadata) { return new Annotation(metadata); });
			let result = reader.read([...this.resultSet].join(''));

			expect(result.annotations).to.be.ok();
			expect(result.annotations).to.be.a(Map);
			expect(result.annotations.size).to.be(3);

			result.annotations.forEach((v, k) => {
				expect(k).to.be.a('string');
				expect(k).to.contain('annotation');
				expect(v).to.be.an(Annotation);
				expect(v.name).to.be.ok();
				expect(v.token).to.be.ok();
			});

			stubTokenize.restore();
			stubGetAnnotation.restore();
			stubGetAnnotationMetadata.restore();
		});

	});

	describe('#getAnnotation', function() {

		it('Should retrieve an instance of an annotation', function() {
			let reader = new Reader(this.tokenizer);
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

	describe('static#new', function() {

		it('Should retrieve an instance of a Reader (static constructor)', function() {

		});

	});

});
