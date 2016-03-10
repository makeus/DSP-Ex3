//= require calculator/parser
//= require calculator/calculation
//= require calculator/view

(function($) {
	'use strict';

	var parser = new Parser();
	var calculation = new Calculation();
	var view = new CalculatorView();

	var round = function(parsedItem) {
		var left = typeof parsedItem.left === 'object' ? 
			round(parsedItem.left) : 
			parsedItem.left

		var right = typeof parsedItem.right === 'object' ? 
			round(parsedItem.right) : 
			parsedItem.right

		return $.when(left, right, parsedItem.operation).then(function(left, right, operation) {
			return calculation.calculate(left, operation, right).then(function(result) {
				view.setResult(left, right, operation, result);
				return result;
			});
		});
	};

	view.onSubmit(function(input) {
		var parsed = parser.parse(input);
		round(parsed);
	});

}(jQuery))