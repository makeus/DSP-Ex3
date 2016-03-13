/**
 * Mathias Keus
 * 013882396
 * https://github.com/makeus/DSP-Ex3 
 */
 
var Plotpoints = (function($) {
	'use strict';

	/**
	 * Generates a range with step
	 *
	 * @example
	 * Array.range(2, 3, 0.5) // [2, 2.5, 3]
	 *
	 * @param a
	 * @param b
	 * @param step
	 * @returns {Array}
     */
	Array.range = function(a, b, step){
		var res = [];
		res[0] = a;
		while(a + step <= b){
			res[res.length] = a += step;
		}
		return res;
	};


	/**
	 * For generating points for the plot, either local or from the server
	 * @param {Sin} sin
	 * @constructor
     */
	function Plotpoints(sin){
		this.sin = sin;
	}

	/**
	 * Generates points locally using Math.sin()
	 * @returns {jQuery.Deferred} promise with result ordered based on x in format [[x, sin(x)]]
     */
	Plotpoints.prototype.plotLocal = function() {
		return $.Deferred().resolve(Array.range(-Math.PI, Math.PI, 0.1).map(function (x) {
			return [x, Math.sin(x)];
		}));
	};

	/**
	 * Generates points using the server with Sin.
	 * @see Sin.calculate
	 * @returns {jQuery.Deferred} promise with result ordered based on x in format [[x, sin(x)]]
     */
	Plotpoints.prototype.plotServer = function() {
		var $this = this;
		
		var range = Array.range(-Math.PI, Math.PI, 0.1);
		var points = [];
		var promises = [];

		range.forEach(function(x) {
			promises.push($this.sin.calculate(x).then(function(y) {
				points.push([x, y]);
			}));
		});

		return $.when.apply($, promises).then(function() {
			return points.sort(function(a,b) {
				return a[0] - b[0];
			});
		});
	};

	return Plotpoints;

}(jQuery));