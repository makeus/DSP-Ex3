var Plot = (function($) {
	'use strict';

	function Plot(){}

	Plot.prototype.plot = function(left, operation, right) {
		return $.ajax({
			method: 'GET',
			url: '/plot',
			dataType: 'json'
		}).then(function(data) {
			return data.result;
		});
	};

	return Plot;

}(jQuery))