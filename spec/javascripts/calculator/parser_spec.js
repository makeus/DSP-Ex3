//= require calculator/parser

/**
 * Mathias Keus
 * 013882396
 * https://github.com/makeus/DSP-Ex3 
 */

'use strict';

describe('Parser#parse', function() {
	var parser;
	beforeEach(function() {
		parser = new Parser();
	});

	it('returns an empty array on empty input', function() {
		expect(parser.parse('')).to.be.a('undefined');
	});

	it('returns a 1 dimensional on simple input', function() {
		var result = parser.parse('1 + 2');
		result.left.should.equal('1');
		result.right.should.equal('2');
		result.operation.should.equal('+');
	});

	it('returns a 2 dimensional array on two operation input', function() {
		var result = parser.parse('1 + 2 * 3');

		result.left.should.be.a('object');
		result.left.left.should.equal('1');
		result.left.right.should.equal('2');
		result.left.operation.should.equal('+');

		result.right.should.equal('3');
		result.operation.should.equal('*');
	});

	it('priorities plusses first', function() {
		var result = parser.parse('1 * 2 + 3');
		result.left.should.equal('1');
		result.right.should.be.a('object');
		result.operation.should.equal('*');
	});

	it('two of the same operators should work properly', function() {
		var result = parser.parse('1+2+3');
		result.left.should.be.a('object');
		result.left.left.should.equal('1');
		result.left.right.should.equal('2');
		result.left.operation.should.equal('+');
		result.right.should.equal('3');
		result.operation.should.equal('+');
	});


	it('negative numbers should work properly', function() {
		var result = parser.parse('1+(-2)');
		result.left.should.equal('1');
		result.operation.should.equal('+');
		result.right.should.equal('-2');
	});

	it('double reductions should be counted as additions', function() {
		var result = parser.parse('1--2');
		result.left.should.equal('1');
		result.operation.should.equal('+');
		result.right.should.equal('2');
	});

	it('double simple operations should be handled', function() {
		var result = parser.parse('1+-2');
		result.left.should.equal('1');
		result.operation.should.equal('-');
		result.right.should.equal('2');
	});

	it('minus at the beginning should break the parsing', function() {
		var result = parser.parse('-1+2');
		result.left.should.equal('-1');
		result.operation.should.equal('+');
		result.right.should.equal('2');
	});


});