/**
*	Es6Reader test
*	@author Patricio Ferreira <3dimentionar@gmail.com>
**/

var Es6Reader = require(process.env.LIB_PATH + 'com/boneyard/annotation/engine/reader/es6'),
	Tokenizer = require(process.env.LIB_PATH + 'com/boneyard/annotation/engine/parser/tokenizer');

describe('com.boneyard.annotation.engine.reader.Es6Reader', function() {

	before(function() {
		this.tokenizer = new Tokenizer();
		this.reader = null;
	});

	after(function() {
		delete this.tokenizer;
		delete this.reader;
	});

	describe('#constructor', function() {

		it('Should return an instance of an Es6Reader', function() {
			this.reader = new Es6Reader(this.tokenizer);
			expect(this.reader).to.be.a(Es6Reader);
			expect(this.reader.tokenizer).to.be.a(Tokenizer);
		});

	});

	describe('#read()', function() {

		it('Should read annotations from content', function() {



		});

	});


});
