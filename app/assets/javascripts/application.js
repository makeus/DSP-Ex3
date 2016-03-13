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


/**
 * Mathias Keus
 * 013882396
 * https://github.com/makeus/DSP-Ex3 
 */

/**
 * View and calculation managing
 */
(function(View, Calculator, Plot, Parser, Cache) {
	'use strict';


	var view = new View();
	var cache = new Cache(3000);
	var calculator = new Calculator(new Parser(), new Calculation(), cache);
	var plot = new Plot(new Plotdraw(), new Plotpoints(new Sin(calculator)));

	view.onSubmit(function(input) {
		view.clearResults();
		switch(input) {
			case 'sin(x)': {
				view.setLoading(true);
				plot.plot(input, function(graphElement, title) {
					view.setGraph(graphElement, title);
				})
				.then(function() {
					view.setLoading(false);
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

	view.onCacheSizeChange(function(size) {
		cache.setSize(size);
	});

}(View, Calculator, Plot, Parser, Cache));
