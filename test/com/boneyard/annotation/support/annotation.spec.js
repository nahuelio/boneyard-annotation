/**
*	Annotation test
*	@author Patricio Ferreira <3dimentionar@gmail.com>
**/

var Annotation = require(process.env.LIB_PATH + 'com/boneyard/annotation/support/annotation');

describe('com.boneyard.annotation.support.Annotation', function() {

	before(function() {
		// Valid
		this.sample = `*	@wire`;
		this.sampleSingle = `//		@bone()`
		this.sampleObj = `*	@spec({ key: "value" })`;
		this.sampleArr = `//	@scan({ arr: ["value", 1, true] })`;
		// Non Valid
		this.sampleNotSymbol = `non-annotation()`;
		this.sampleSymbolWrongPos = `annot@tion(@)`;
		// Parameters
		this.sampleParams = `* @annotation({ key: "value", config: { a: "1", b: 2 }, arr: [1, "value", false], flag: true })`;
	});

	describe('#constructor', function() {

		it('Should return an instance of an Annotation with and without parameter', function() {
			let annotation = new Annotation();
			expect(annotation).to.be.ok();
			annotation = new Annotation({ name: 'wire'});
			expect(annotation.name).to.be.ok();
			expect(annotation.name).to.be('wire');
		});

	});

	describe('static#metadata', function() {

		it('Should return annotation metadata given a sample token', function() {
			let stubGet = sinon.stub(Annotation, 'get').returns('wire');
			let stubParameters = sinon.stub(Annotation, 'parameters').returns({});
			let result = Annotation.metadata(this.sample);

			expect(result).to.be.ok();
			expect(result).to.be.an('object');
			expect(result.name).to.be('wire');
			expect(result.token).to.be(this.sample);

			stubGet.restore();
			stubParameters.restore();
		});

	});

	describe('static#get', function() {

		it('Should return the annotation name given a sample token', function() {
			let simple = Annotation.get(this.sample);
			let single = Annotation.get(this.sampleSingle);
			let withObj = Annotation.get(this.sampleObj);
			let withArr = Annotation.get(this.sampleArr);

			expect(simple).to.be.ok();
			expect(simple).to.be('wire');

			expect(single).to.be.ok();
			expect(single).to.be('bone');

			expect(withObj).to.be.ok();
			expect(withObj).to.be('spec');

			expect(withArr).to.be.ok();
			expect(withArr).to.be('scan');
		});

		it('Should NOT return the annotation name given a sample token', function() {
			expect(Annotation.get(this.sampleNotSymbol)).not.be.ok()
			expect(Annotation.get(this.sampleSymbolWrongPos)).not.be.ok();
		});

	});

	describe('static#parameters', function() {

		it('Should extra parameters from token', function() {
			let result = Annotation.parameters(this.sampleParams);
			expect(result).to.be.ok();
			expect(result).to.be.a(Object);
			expect(result).not.be.empty();
			expect(result.key).to.be.a('string');
			expect(result.config).to.be.a('object');
			expect(result.config.a).to.be.ok();
			expect(result.config.b).to.be.a('number');
			expect(result.arr).to.be.a('array');
			expect(result.arr[0]).to.be.a('number');
		});

	});

	describe('static#Symbol', function() {

		it('Should be a @ character', function() {
			expect(Annotation.Symbol).to.be('@');
		});

	})

});
