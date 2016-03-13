var Plotpoints = (function($) {
	'use strict';

	Array.range = function(a, b, step){
		var res = [];
		res[0] = a;
		while(a + step <= b){
			res[res.length] = a += step;
		}
		return res;
	};


	function Plotpoints(sin){
		this.sin = sin;
	}

	Plotpoints.prototype.plotLocal = function() {
		return $.Deferred().resolve(Array.range(-Math.PI, Math.PI, 0.1).map(function (x) {
			return [x, Math.sin(x)];
		}));
	};

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

}(jQuery))