/**
*	Scanner test
*	@author Patricio Ferreira <3dimentionar@gmail.com>
**/

var EventEmitter = require('events').EventEmitter,
	Scanner = require(process.env.LIB_PATH + 'com/spinal/annotation/scanner'),
	Runner = require(process.env.LIB_PATH + 'com/spinal/annotation/commands/runner'),
	Es5Reader = require(process.env.LIB_PATH + 'com/spinal/annotation/engine/reader/es5'),
	Es6Reader = require(process.env.LIB_PATH + 'com/spinal/annotation/engine/reader/es6');

describe('com.spinal.annotation.Scanner', function() {

	before(function() {
		this.runnerMock = {
			config: {
				cwd: rootDir,
				target: 'src/examples/**/*.js',
				ignore: ['libraries/**/*.*', 'main.js'],
				nodir: true
			}
		};
	});

	describe('#constructor', function() {

		it('Should Return an instance of a Scanner', function() {
			let scanner = new Scanner(this.runnerMock);
			expect(scanner).to.be.ok();
			expect(scanner).to.be.an(Scanner);
			expect(scanner.parser).to.be.ok();
			expect(scanner.parser.reader).to.be.an(Es6Reader);

			scanner = new Scanner(this.runnerMock, 'es5');
			expect(scanner).to.be.ok();
			expect(scanner).to.be.an(Scanner);
			expect(scanner.parser).to.be.ok();
			expect(scanner.parser.reader).to.be.an(Es5Reader);
		});

	});

	describe('#onStart', function() {

		it('Should be first called on scan process triggers', function() {
			let scanner = new Scanner(this.runnerMock);
			let onStart = sinon.spy(scanner, 'onStart');
			let stubRead = sinon.stub(scanner.parser.reader, 'read').returns(['filename.js']);
			onStart.withArgs(scanner.parser);
			scanner.scan();

			expect(onStart.calledOnce).to.be(true);

			stubRead.restore();
			scanner.onStart.restore();
		});

	});

	describe('#scan', function() {

		it('Should scan sourcepath by using a parser instance', function() {
			let scanner = new Scanner(this.runnerMock);
			let stubParse = sinon.stub(scanner.parser, 'parse').returns(scanner.parser);
			let stubRead = sinon.stub(scanner.parser.reader, 'read').returns(['filename.js']);
			scanner.scan();

			expect(stubParse.called).to.be(true);

			stubRead.restore();
			scanner.parser.parse.restore();
		});

	});

	describe('#onRead', function() {

		it('Should be called on every file read from parser', function() {
			let scanner = new Scanner(this.runnerMock);
			let onStart = sinon.spy(scanner, 'onStart');
			let onRead = sinon.spy(scanner, 'onRead');
			let stubRead = sinon.stub(scanner.parser.reader, 'read').returns(['filename.js']);
			onStart.withArgs(scanner.parser);
			scanner.scan();

			expect(onRead.called).to.be(true);
			expect(onRead.calledAfter(onStart)).to.be(true);

			stubRead.restore();
			scanner.onStart.restore();
			scanner.onRead.restore();
		});

	});

	describe('#onEnd', function() {

		it('Should be last called once scan process finishes', function() {
			let scanner = new Scanner(this.runnerMock);
			let onStart = sinon.spy(scanner, 'onStart');
			let onRead = sinon.spy(scanner, 'onRead');
			let onEnd = sinon.spy(scanner, 'onEnd');
			let stubRead = sinon.stub(scanner.parser.reader, 'read').returns(['filename.js']);
			onStart.withArgs(scanner.parser);
			scanner.scan();

			expect(onEnd.calledOnce).to.be(true);
			expect(onEnd.calledAfter(onRead)).to.be(true);

			stubRead.restore();
			scanner.onStart.restore();
			scanner.onRead.restore();
			scanner.onEnd.restore();
		});

	});

});
