/**
*	Parser test
*	@author Patricio Ferreira <3dimentionar@gmail.com>
**/

var Parser = require(process.env.LIB_PATH + 'com/spinal/annotation/engine/parser/parser'),
	Es6Reader = require(process.env.LIB_PATH + 'com/spinal/annotation/engine/reader/es6'),
	Es5Reader = require(process.env.LIB_PATH + 'com/spinal/annotation/engine/reader/es5');

describe.only('com.spinal.annotation.engine.parser.Parser', function() {

	before(function() {
		this.config = {
			cwd: path.resolve(rootDir, 'src/examples'),
			target: '**/*.js',
			nodir: true
		};
		this.reader = Es5Reader.new();
	});

	describe('#constructor', function() {

		it('Should return an instance of Parser with parameters', function() {
			let parser = new Parser(this.config, this.reader);
			expect(parser).to.be.ok();
			expect(parser.config).to.be.ok();
			expect(parser.reader).to.be.ok();

			expect(parser.config.cwd).to.be(this.config.cwd);
			expect(parser.reader).to.be.an(Es5Reader);
		});

		it('Should throw an Error: if no parameters are passed to the constructor', function() {
			expect(function() { new Parser(); }).to.throwException(function(e) {
				expect(e.message).to.be('Parser requires an instance of a reader in order to work');
			});
		});

	});

	describe('#parse', function() {

		it('#beforeParse should throw an Error: parser.config.cwd or parser.config.target are not defined', function() {

			// No Config
			expect(function() {
				Parser.from().parse();
			}).to.throwException(function(e) {
				expect(e.message).to.be("Parser {{config}} requires parameter 'cwd' and 'target' in order to work.");
			});

			// Only config.cwd
			expect(function() {
				Parser.from({ cwd: 'some/path/to/source' }).parse();
			}).to.throwException(function(e) {
				expect(e.message).to.be("Parser {{config}} requires parameter 'cwd' and 'target' in order to work.");
			});

			// Only config.target
			expect(function() {
				Parser.from({ target: 'some/pattern/**/*.js' }).parse();
			}).to.throwException(function(e) {
				expect(e.message).to.be("Parser {{config}} requires parameter 'cwd' and 'target' in order to work.");
			});

		});

		it('#beforeParser should set default empty array ([]) for config.ignore if parameter not passed', function() {
			let parser = Parser.from(this.config).parse();
			expect(parser.config).to.be.ok();
			expect(parser.config.ignore).to.be.empty();
		});

	});

	describe('static#from', function() {

		it('Should return an instance of Parser with parameters', function() {
			let parser = Parser.from(this.config, 'es5');
			expect(parser).to.be.ok();
			expect(parser.config).to.be.ok();
			expect(parser.reader).to.be.ok();

			expect(parser.config.cwd).to.be(this.config.cwd);
			expect(parser.reader).to.be.an(Es5Reader);
		});

		it('Should return an instance of Parser with default properties', function() {
			let parser = Parser.from();
			expect(parser).to.be.ok();
			expect(parser.config).to.be.ok();
			expect(parser.config).to.be.empty();
			expect(parser.reader).to.be.ok();

			expect(parser.reader).to.be.an(Es6Reader);
		});

	});

});
