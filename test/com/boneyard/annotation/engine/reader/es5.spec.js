/**
*	Es5Reader test
*	@author Patricio Ferreira <3dimentionar@gmail.com>
**/

var Es5Reader = require(process.env.LIB_PATH + 'com/boneyard/annotation/engine/reader/es5'),
	Tokenizer = require(process.env.LIB_PATH + 'com/boneyard/annotation/engine/parser/tokenizer');

describe.only('com.boneyard.annotation.engine.reader.Es5Reader', function() {

	var reader, tokenizer, applicationPath, application;

	before(function() {
		reader = null;
		tokenizer = new Tokenizer();
		applicationPath = process.env.LIB_PATH + 'examples/es5/application.js';
		application = fs.readFileSync(applicationPath).toString('utf-8');
	});

	describe('#constructor', function() {

		it('Should return an instance of Es5Reader', function() {
			reader = new Es5Reader(tokenizer);
			expect(reader).to.be.a(Es5Reader);
			expect(reader.tokenizer).to.be.a(Tokenizer);
		});

	});

	describe('#read()', function() {

		it('Should read es5 examples directory', function() {
			let result = reader.read(applicationPath, application);
		});

	});

});
