/**
*	Parser test
*	@author Patricio Ferreira <3dimentionar@gmail.com>
**/

var Parser = require(process.env.LIB_PATH + 'com/boneyard/annotation/engine/parser/parser'),
	Es5Reader = require(process.env.LIB_PATH + 'com/boneyard/annotation/engine/reader/es5'),
	Es6Reader = require(process.env.LIB_PATH + 'com/boneyard/annotation/engine/reader/es6');

describe('com.boneyard.annotation.engine.parser.Parser', function() {

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
		});

		it('Should throw an Error: if no parameters are passed to the constructor', function() {
			expect(function() {
				new Parser();
			}).to.throwException(function(e) {
				expect(e).to.be.ok();
			});
		});

	});

	describe('#beforeParse', function() {

		it('Should throw an Error: parser.config.cwd or parser.config.target are not defined', function() {

			var parserNoConfig = Parser.from(),
				parserOnlyCwd = Parser.from({ cwd: 'some/path/to/source' }),
				parserOnlyTarget = Parser.from({ target: 'some/pattern/**/*.js' });

			var noConfig = sinon.spy(parserNoConfig, 'beforeParse'),
				onlyCwd = sinon.spy(parserOnlyCwd, 'beforeParse'),
				onlyTarget = sinon.spy(parserOnlyTarget, 'beforeParse');

			expect(function() {
				parserNoConfig.beforeParse();
			}).to.throwException(function(e) {
				expect(noConfig.threw()).to.be(true);
			});

			expect(function() {
				parserOnlyCwd.beforeParse()
			}).to.throwException(function(e) {
				expect(onlyCwd.threw()).to.be(true);
			});

			expect(function() {
				parserOnlyTarget.beforeParse();
			}).to.throwException(function(e) {
				expect(onlyTarget.threw()).to.be(true);
			});

			noConfig.restore();
			onlyCwd.restore();
			onlyTarget.restore();

		});

		it('Should set default empty array ([]) for config.ignore if parameter not passed', function() {
			let parser = Parser.from({ cwd: rootDir, target: '*.noext' }).beforeParse();
			expect(parser.config).to.be.ok();
			expect(parser.config.ignore).to.be.empty();
		});

		it('Should have a ignore list set by argument to the Parser constructor', function() {
			let parser = Parser.from({ cwd: rootDir, target: '*.noext', ignore: ['**/*.js'] }).beforeParse();
			expect(parser.config).to.be.ok();
			expect(parser.config.ignore).not.to.be.empty();
			expect(parser.config.ignore).to.have.length(1);
		});

	});

	describe('#parse', function() {

		it('Should parse a list of files', function() {
			let parser = Parser.from(this.config);
			let stubReader = sinon.stub(parser.reader, 'read').returns([]);

			parser.on(Parser.Events.read, _.bind(function(file) {
				expect(file).to.be.ok();
				expect((file.indexOf('.js') !== -1)).to.be(true);
			}));
			parser.parse();

			expect(stubReader.called).to.be(true);

			stubReader.restore();
			parser.removeAllListeners(Parser.Events.read);
		});

	});

	describe('static#from', function() {

		it('Should return an instance of Parser with parameters', function() {
			let parser = Parser.from(this.config, 'es5');
			expect(parser).to.be.ok();
			expect(parser.config).to.be.ok();
			expect(parser.reader).to.be.ok();

			expect(parser.config.cwd).to.be(this.config.cwd);
		});

		it('Should return an instance of Parser with default properties', function() {
			let parser = Parser.from();
			expect(parser).to.be.ok();
			expect(parser.config).to.be.ok();
			expect(parser.config).to.be.empty();
			expect(parser.reader).to.be.ok();
		});

	});

});
