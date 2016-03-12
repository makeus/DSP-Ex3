var Calculator = (function($) {
	'use strict';

	function Calculator(parser, calculation) {
		this.parser = parser;
		this.calculation = calculation;
	};

	Calculator.prototype.round = function(parsedItem, roundcallback) {
		var $this = this;

		var left = typeof parsedItem.left === 'object' ? 
		$this.round(parsedItem.left, roundcallback) : 
		parsedItem.left

		var right = typeof parsedItem.right === 'object' ? 
		$this.round(parsedItem.right, roundcallback) : 
		parsedItem.right

		return $.when(left, right, parsedItem.operation).then(function(left, right, operation) {
			return $this.calculation.calculate(left, operation, right).then(function(result) {
				if(roundcallback) {
					roundcallback(left, right, operation, result);	
				}
				return result;
			});
		});
	};

	Calculator.prototype.calculate = function(input, cb) {
		var parsed = this.parser.parse(input);
		return this.round(parsed, cb);
	};

	return Calculator;
	

}(jQuery))