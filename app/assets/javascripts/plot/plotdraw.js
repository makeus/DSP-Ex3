/**
 * Mathias Keus
 * 013882396
 * https://github.com/makeus/DSP-Ex3 
 */
 
var Plotdraw = (function($) {
	'use strict';

	/**
	 * For drawing canvases based on data
	 * @constructor
     */
	function Plotdraw(){}

	/**
	 * Converts point (x, y) to canvas coordinates
	 * Assumes canvas size 300x300 and data between [-π, π]
	 * @param x
	 * @param y
	 * @returns {[]} coordinates in format [x, y]
     */
	function graphPointsToCanvasCoordinates(x, y) {
		return [x / Math.PI * 150 + 150, y * -1 * 150 + 150];
	}

	/**
	 * Draws the given data to a canvas and returns.
	 * @param data Points in format [[1, 2], [3,4], [54, -12]]
	 * @returns {jQuery} Canvas
     */
	Plotdraw.prototype.plot = function(data) {
		var canvas = $('<canvas width="300" height="300">');
		var ctx=canvas.get(0).getContext("2d");

		if(!data.length) {
			return canvas;
		}

		ctx.beginPath();
		ctx.strokeStyle="#FF0000";
		var startingpoint = graphPointsToCanvasCoordinates(data[0][0], data[0][1]);
		ctx.moveTo(startingpoint[0], startingpoint[1]);
		$.each(data.slice(1), function(i, point) {
			var point = graphPointsToCanvasCoordinates(point[0], point[1]);
			ctx.lineTo(point[0], point[1]);
		});
		ctx.stroke();

		return canvas;
	};

	return Plotdraw;

}(jQuery));