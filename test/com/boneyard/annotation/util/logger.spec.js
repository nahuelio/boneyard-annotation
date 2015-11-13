/**
*	Logger test
*	@author Patricio Ferreira <3dimentionar@gmail.com>
**/

var Logger = require(process.env.LIB_PATH + 'com/boneyard/annotation/util/logger');

describe('com.boneyard.annotation.util.Logger', function() {

	after(function() {
		Logger.environment = Logger.environments.test;
	});

	describe('#constructor', function() {

		it('Should throw an error: Logger must not be instanciated', function() {
			expect(function() {
				new Logger();
			}).to.throwException(function(e) {
				expect(e.message).to.be('Cannot instanciate Logger Class. All properties and methods are static.');
			});
		});

	});

	describe('static#environment', function() {

		it('Must have set dev as environment', function() {
			expect(Logger.env).to.be(Logger.environments.test);
		});

		it('Should set the Logger environment to test', function() {
			Logger.environment = Logger.environments.dev;
			expect(Logger.env).to.be(Logger.environments.dev);
			Logger.environment = Logger.environments.test;
		});

	});

	describe('static#environments', function() {

		it('Should return a environments object with constants', function() {
			expect(Logger.environments).to.not.be.empty();
			expect(Logger.environments.prod).to.be('production');
		});

	});

	describe('static#colors', function() {

		it('Should return a colors object with constants', function() {
			expect(Logger.colors).to.not.be.empty();
			expect(Logger.colors.s).to.be('\x1b[0m');
		});

	});

	describe('static#log', function() {

		it('Should output string with standard color', function() {
			Logger.environment = Logger.environments.dev;
			expect(Logger.log("\tStandard message")).to.be.ok();
			Logger.environment = Logger.environments.test;
		});

	});

	describe('static#warn', function() {

		it('Should output string with yellow color', function() {
			Logger.environment = Logger.environments.dev;
			expect(Logger.warn("\tWarn message")).to.be.ok();
			Logger.environment = Logger.environments.test;
		});

	});

	describe('static#error', function() {

		it('Should output string with red color', function() {
			Logger.environment = Logger.environments.dev;
			expect(Logger.error("\tError message")).to.be.ok();
			Logger.environment = Logger.environments.test;
		});

	});

	describe('static#out', function() {

		it('Should NOT output to the stdout under test environment', function() {
			expect(Logger.out("Not Shown", 'c')).not.be.ok();
		});

		it('Should NOT output to the stdout if empty string is passed', function() {
			expect(Logger.out()).to.not.be.ok();
		});

		it('Should output to the stdout under dev environment', function() {
			Logger.environment = Logger.environments.dev;
			expect(Logger.out("\tMessage shown while in dev", 'c')).to.be.ok();
			expect(Logger.out("\tMessage shown while in dev with standard color")).to.be.ok();
		});

	});

});
