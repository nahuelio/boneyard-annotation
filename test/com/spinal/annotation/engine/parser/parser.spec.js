/**
*	Parser test
*	@author Patricio Ferreira <3dimentionar@gmail.com>
**/

var Parser = require(process.env.LIB_PATH + 'com/spinal/annotation/engine/parser/parser');

describe('com.spinal.annotation.engine.parser.Parser', function() {

	before(function() {
		this.config = {
			cwd: path.resolve(rootDir, 'src/examples'),
			target: '**/*.js',
			nodir: true
		};

		this.readerInstanceMock = {
			read: function(content = "") {
				return ['/**', '*	@annotation()', '**/'];
			}
		};

		this.readerClassMock = {
			new: _.bind(function() {
				return this.readerInstanceMock;
			}, this)
		};

		mockery.enable();
		mockery.registerMock('../reader/es6', this.readerClassMock);
		mockery.registerMock('../reader/es5', this.readerClassMock);
	});

	after(function() {
		mockery.deregisterAll();
		mockery.disable();
	});

	describe('#constructor', function() {

		it('Should return an instance of Parser with parameters', function() {
			let parser = new Parser(this.config, this.readerInstanceMock);
			expect(parser).to.be.ok();
			expect(parser.config).to.be.ok();
			expect(parser.reader).to.be.ok();

			expect(parser.config.cwd).to.be(this.config.cwd);
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
			let parser = Parser.from({ cwd: rootDir, target: '*.noext' }).parse();
			expect(parser.config).to.be.ok();
			expect(parser.config.ignore).to.be.empty();
		});

		it('#beforeParser should have a ignore list set by argument to the Parser constructor', function() {
			let parser = Parser.from({ cwd: rootDir, target: '*.noext', ignore: ['**/*.js'] }).parse();
			expect(parser.config).to.be.ok();
			expect(parser.config.ignore).not.to.be.empty();
			expect(parser.config.ignore).to.have.length(1);
		});

		it('Should parse a list of files', function(done) {
			let parser = Parser.from(this.config);
			parser.on(Parser.Events.read, _.bind(function(file) {
				expect(file).to.be.ok();
				expect((file.indexOf('.js') !== -1)).to.be(true);
				parser.removeAllListeners(Parser.Events.read);
				done();
			}));
			parser.parse();
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
