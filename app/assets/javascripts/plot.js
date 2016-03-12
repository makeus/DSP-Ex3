var Plot = (function($) {
	'use strict';

	function Plot(plotdraw, plotpoints){
		this.draw = plotdraw;
		this.points = plotpoints;
	}

	Plot.prototype.plot = function(input, callback) {
		var $this = this;
		var createPlot = function(data) {
			callback($this.draw.plot(data));
		};

		this.points.plotLocal().then(createPlot);
		this.points.plotServer().then(createPlot);
		callback($('<img src="/plot"/>'));
	};

	return Plot;

}(jQuery));