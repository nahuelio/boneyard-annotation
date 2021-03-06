/**
*	Factory test
*	@author Patricio Ferreira <3dimentionar@gmail.com>
**/

var Factory = require(process.env.LIB_PATH + 'com/boneyard/annotation/util/factory'),
	Logger = require(process.env.LIB_PATH + 'com/boneyard/annotation/util/logger');

describe('com.boneyard.annotation.util.Factory', function() {

	before(function() {

	});

	after(function() {

	});

	describe('#constructor', function() {

		it('Should return an instance of a factory with default parameters', function() {
			let factory = new Factory();
			expect(factory).to.be.ok();
			expect(factory.factories).to.be.ok();
			expect(factory.factories).to.be.a(Map);
			expect(factory.factories.size).to.be(0);
			expect(factory.ns).to.be(process.cwd());
		});

		it('Should return an instance of a factory with parameters passed', function() {
			let factory = new Factory('./src/examples');
			expect(factory.ns).to.be(process.cwd() + '/src/examples');
		});

	});

	describe('#namespace', function() {

		it('Should set a new namespace', function() {
			let factory = new Factory();
			factory.namespace = './src';
			expect(factory.ns).to.be(process.cwd() + '/src');
		});

		it('Should set a new namespace using default parameter when undefined is passed', function() {
			let factory = new Factory();
			factory.namespace = undefined;
			expect(factory.ns).to.be(process.cwd());
		});

	});

	describe('#register', function() {

		it('Should register a new factory class', function() {
			let factory = new Factory('./src/com/boneyard/annotation/support');
			expect(factory.register('bone')).to.be('bone');
			expect(factory.factories.size).to.be(1);
		});

		it('Should not register a new factory class if path is undefined or an empty string', function() {
			let factory = new Factory('./src/com/boneyard/annotation/support');
			expect(factory.register()).not.be.ok();
		});

		it('Should NOT register a new factory class if it is already registered', function() {
			let factory = new Factory('./src/com/boneyard/annotation/support');
			factory.register('bone');
			factory.register('bone');
			expect(factory.factories.size).to.be(1);
		});

		it('Should throw an Error: Will not register a new factory class if the class cannot be found', function() {
			let factory = new Factory('./src/com/boneyard/annotation/support');
			expect(_.bind(function() {
				factory.register('not-existent');
			}, this)).to.throwException(function(e) {
				expect(e).to.be.ok();
			})
		});

	});

	describe('#unregister', function() {

		it('Should unresgister an existing factory class', function() {
			let factory = new Factory('./src/com/boneyard/annotation/support');
			factory.register('bone');
			let result = factory.unregister('bone');
			expect(result).to.be.ok();
			expect(result).to.be.a(Factory);
			expect(result.factories.size).to.be(0);
		});

		it('Should NOT unregister a factory class if path is undefined or an empty string', function() {
			let factory = new Factory('./src/com/boneyard/annotation/support');
			factory.register('bone');
			let result = factory.unregister();
			expect(result).to.be.ok();
			expect(result).to.be.a(Factory);
			expect(result.factories.size).to.be(1);

			result = factory.unregister('');
			expect(result.factories.size).to.be(1);
		});

		it('Should NOT unregister an unexisting factory class', function() {
			let factory = new Factory('./src/com/boneyard/annotation/support');
			factory.register('bone');
			let result = factory.unregister('spec');
			expect(result).to.be.ok();
			expect(result).to.be.a(Factory);
			expect(result.factories.size).to.be(1);
		});

	});

	describe('#exists', function() {

		it('Should return true if factory class exists', function() {
			let factory = new Factory('./src/com/boneyard/annotation/support');
			factory.register('bone');
			expect(factory.exists('bone')).to.be(true);
		});

		it('Should return false if factory class doesn\'t exists', function() {
			let factory = new Factory('./src/com/boneyard/annotation/support');
			factory.register('bone');
			expect(factory.exists('spec')).to.be(false);
		});

	});

	describe('#get', function() {

		it('Should retrieve a factory class', function() {
			let Spec = require(process.env.LIB_PATH + 'com/boneyard/annotation/support/spec');
			let factory = new Factory('./src/com/boneyard/annotation/support');
			factory.register('spec');
			let result = factory.get('spec');

			expect(result).to.be.ok();
			expect(result).to.be(Spec);
		});

		it('Should NOT retrieve a factory class that doesn\'t exists', function() {
			let factory = new Factory('./src/com/boneyard/annotation/support');
			let result = factory.get('spec');
			expect(result).not.be.ok();
		});

	});

	describe('#create', function() {

		it('Should return an instance of a registered factory (with or without parameters)', function() {
			let factory = new Factory('./src/com/boneyard/annotation/support');
			factory.register('spec');

			// Without Parameters
			let result = factory.create('spec');
			expect(result).to.be.ok();
			expect(result).to.be.a(factory.get('spec'));

			result = factory.create('spec', { name: 'Spec' });
			expect(result).to.be.ok();
			expect(result.name).to.be('Spec');
		});

		it('Should NOT return an instance of a non-existent factory class', function() {
			let factory = new Factory('./src/com/boneyard/annotation/support');
			expect(factory.create('spec')).not.be.ok();
		});

	});

});
