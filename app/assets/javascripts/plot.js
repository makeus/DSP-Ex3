/**
 * Mathias Keus
 * 013882396
 * https://github.com/makeus/DSP-Ex3 
 */
 
var Plot = (function($) {
	'use strict';

	/**
	 * For handling plotting, uses Plotdraw and Plotpoints to generate canvases.
	 * @param {Plotdraw} plotdraw
	 * @param {Plotpoints} plotpoints
	 * @constructor
     */
	function Plot(plotdraw, plotpoints){
		this.draw = plotdraw;
		this.points = plotpoints;
	}

	/**
	 * Plots input by first generating points and then creating canvases based on the points.
	 * Also includes an image from the server.
	 * @param {string } input for example 'sin(x)'
	 * @param callback Callback to call when a plot is ready.
	 * @returns {jQuery.Deferred}
     */
	Plot.prototype.plot = function(input, callback) {
		var $this = this;

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