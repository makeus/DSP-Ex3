var Calculation = (function($) {
	'use strict';

	function Calculation(){}

	Calculation.prototype.calculate = function(left, operation, right) {
		return $.ajax({
			method: 'POST',
			url: '/calculator',
			dataType: 'json',
			data: {
				arg1: left,
				arg2: right,
				op: operation
			}
		}).then(function(data) {
			return data.result;
		});
	};

	return Calculation;

}(jQuery))