var CalculatorView = (function($) {
	'use strict';

	function CalculatorView() {
		this.submitCallbacks = [];
		var $this = this;
		$('form').submit(function(event) {
			$.each($this.submitCallbacks, function(i, cb) {
				cb($('form input#input').val());
			});
			event.preventDefault();
		});
	}

	CalculatorView.prototype.setResult = function(left, right, operator, result) {
		$('.results').append('<p>' + left + ' ' + operator + ' ' + right + ' = ' + result + '</p>');
	};

	CalculatorView.prototype.onSubmit = function(callback) {
		this.submitCallbacks.push(callback);
	};

	return CalculatorView;
}(jQuery));
