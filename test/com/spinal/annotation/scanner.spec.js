/**
*	Scanner test
*	@author Patricio Ferreira <3dimentionar@gmail.com>
**/

var EventEmitter = require('events').EventEmitter,
	Scanner = require(process.env.LIB_PATH + 'com/spinal/annotation/scanner');

describe('com.spinal.annotation.Scanner', function() {

	before(function() {
		this.runnerConfig = { config: { source: path.resolve(rootDir, 'src/examples') } };
	});

	describe('#constructor', function() {

		it('Should Return an instance of a Scanner', function() {
			let scanner = new Scanner(this.runnerConfig);
			expect(scanner).to.be.ok();
			expect(scanner.parser).to.be.ok();
		});

	});

	describe('#scan', function() {

		it('Should Scan sourcepath by using a parser instance', function() {
			let scanner = new Scanner(this.runnerConfig);
			expect(scanner).to.be.ok();
			expect(scanner).to.be.an(Scanner);
		});

	});

	describe('#output', function() {

	});

});
