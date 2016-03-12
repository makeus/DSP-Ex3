var Plotdraw = (function($) {
	'use strict';

	function Plotdraw(){}

	function graphPointsToCanvasCoordinates(x, y) {
		return [x / Math.PI * 150 + 150, y * -1 * 150 + 150];
	};

	Plotdraw.prototype.plot = function(data) {
		var canvas = $('<canvas width="300" height="300">');
		var ctx=canvas.get(0).getContext("2d");

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

}(jQuery))