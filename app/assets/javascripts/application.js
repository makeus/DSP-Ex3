//= require jquery
//= require jquery_ujs

//= require view

//= require calculator/parser
//= require calculator/calculation
//= require calculator/cache
//= require calculator

//= require sin
//= require plot/plotdraw
//= require plot/plotpoints
//= require plot

(function(View, Calculator, Plot, Parser, Cache) {
	'use strict';

	var view = new View();
	var calculator = new Calculator(new Parser(), new Calculation(), new Cache());
	var plot = new Plot(new Plotdraw(), new Plotpoints(new Sin(calculator)));

	view.onSubmit(function(input) {
		switch(input) {
			case 'sin(x)': {
				plot.plot(input, function(graphElement) {
					view.setGraph(graphElement);
				});
				break;
			}
			default: {
				calculator.calculate(input, function(left, right, operation, result) {
					view.setResult(left, right, operation, result);
				});
				break;
			}
		}
	});

	view.onSimplifyClick(function(input) {
		view.setInput(calculator.simplify(input))
	});

}(View, Calculator, Plot, Parser, Cache));
