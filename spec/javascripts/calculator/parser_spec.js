//= require calculator/parser

'use strict';

describe('Parser#parse', function() {
	var parser;
	beforeEach(function() {
		parser = new Parser();
	});

	it('returns an empty array on empty input', function() {
		parser.parse('').should.have.length(0);
	});

	it('returns a 1 dimensional on simple input', function() {
		var result = parser.parse('1 + 2');
		result.should.have.length(1);
		result[0].left.should.equal('1');
		result[0].right.should.equal('2');
		result[0].operation.should.equal('+');
	});

	it('returns a 2 dimensional array on two operation input', function() {
		var result = parser.parse('1 + 2 * 3');

		result.should.have.length(2);
		result[0].left.should.equal('1');
		result[0].right.should.equal('2');
		result[0].operation.should.equal('+');

		result[1].left.should.be.a('object');
		result[1].left.left.should.equal('1');
		result[1].left.right.should.equal('2');
		result[1].left.operation.should.equal('+');

		result[1].right.should.equal('3');
		result[1].operation.should.equal('*');
	});

	it('priorities plusses first', function() {
		var result = parser.parse('1 * 2 + 3');
		result.should.have.length(2);

		result[0].left.should.equal('2');
		result[0].right.should.equal('3');
		result[0].operation.should.equal('+');
		result[1].left.should.equal('1');
		result[1].right.should.be.a('object');
		result[1].operation.should.equal('*');
	});
});