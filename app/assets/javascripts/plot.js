var Plot = (function($) {
	'use strict';

	function Plot(plotdraw, plotpoints){
		this.draw = plotdraw;
		this.points = plotpoints;
	}

	Plot.prototype.plot = function(input, callback) {
		var $this = this;
		var createPlot = function(data) {
		};

		callback($('<img src="/plot"/>'), 'server');
		
		this.points.plotLocal().then(function(data) {
			callback($this.draw.plot(data), 'local');
		});
		return this.points.plotServer().then(function(data) {
			callback($this.draw.plot(data), 'coop');
		});
	};

	return Plot;

}(jQuery));