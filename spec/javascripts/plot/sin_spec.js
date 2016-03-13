//= require jquery
//= require calculator/parser
//= require calculator/cache
//= require calculator
//= require sin

/**
 * Mathias Keus
 * 013882396
 * https://github.com/makeus/DSP-Ex3 
 */

function Calculation() {}

Calculation.prototype.calculate = function(left, operation, right) {
	//console.log('' + left + operation + right);
	return jQuery.Deferred().resolve(eval('' + left + operation + right));
};

'use strict';

describe('sin', function() {
	var sin = new Sin(new Calculator(new Parser(), new Calculation(), new Cache(0)));
	describe('should return values with minium 1% accuracy', function() {
		it('case 0.1', function(done) {
			sin.calculate(0.1).then(function(result) {
				expect(Math.abs(result - Math.sin(0.1))).to.be.below(0.01);
				done();
			});
		});

		it('case -0.1', function(done) {
			sin.calculate(-0.1).then(function(result) {
				expect(Math.abs(result - Math.sin(-0.1))).to.be.below(0.01);
				done();
			});
		});

		it('case 1', function(done) {
			sin.calculate(1).then(function(result) {
				expect(Math.abs(result - Math.sin(1))).to.be.below(0.01);
				done();
			});
		});

		it('case -1', function(done) {
			sin.calculate(-1).then(function(result) {
				expect(Math.abs(result - Math.sin(-1))).to.be.below(0.01);
				done();
			});
		});

		it('case 3', function(done) {
			sin.calculate(3).then(function(result) {
				expect(Math.abs(result - Math.sin(3))).to.be.below(0.01);
				done();
			});
		});

		it('case 0.4014257', function(done) {
			sin.calculate(0.4014257).then(function(result) {
				expect(Math.abs(result - 0.390731102008345)).to.be.below(0.0000001);
				done();
			});
		});

		it('case -0.04159265358979139', function(done) {
			sin.calculate(-0.04159265358979139).then(function(result) {
				expect(Math.abs(result - Math.sin(-0.04159265358979139))).to.be.below(0.01);
				done();
			});
		});

		it('case pi', function(done) {
			sin.calculate(Math.PI).then(function(result) {
				expect(Math.abs(result)).to.be.below(0.01);
				done();
			});
		});

		it('case -pi', function(done) {
			sin.calculate(-Math.PI).then(function(result) {
				expect(Math.abs(result)).to.be.below(0.01);
				done();
			});
		});
	});
});