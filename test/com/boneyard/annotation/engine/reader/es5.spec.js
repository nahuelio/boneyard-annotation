/**
*	Es5Reader test
*	@author Patricio Ferreira <3dimentionar@gmail.com>
**/

var Parser = require(process.env.LIB_PATH + 'com/boneyard/annotation/engine/parser/parser'),
	Es5Reader = require(process.env.LIB_PATH + 'com/boneyard/annotation/engine/reader/es5'),
	Tokenizer = require(process.env.LIB_PATH + 'com/boneyard/annotation/engine/parser/tokenizer');

describe.only('com.boneyard.annotation.engine.reader.Es5Reader', function() {

	var config, parser, reader;

	before(function() {
		config = {
			cwd: path.resolve(rootDir, 'src/examples/es5'),
			target: '**/*.js',
			nodir: true
		};
		parser = Parser.from(config, 'es5');
		Logger.environment = Logger.environments.dev;
	});

	after(function() {

	});

	describe('#read()', function() {

		it('Should read es5 examples directory', function() {
			let result = parser.parse();
		});

	});

});
