var View = (function($) {
	'use strict';

	function View() {
		this.submitCallbacks = [];
		var $this = this;
		$('form').submit(function(event) {
			$.each($this.submitCallbacks, function(i, cb) {
				cb($('form input#input').val());
			});
			event.preventDefault();
		});
	}

	View.prototype.setResult = function(left, right, operator, result) {
		$('.results').append('<p>' + left + ' ' + operator + ' ' + right + ' = ' + result + '</p>');
	};

	View.prototype.setGraph = function(element) {
		$('.results').append(element);
	};

	View.prototype.onSubmit = function(callback) {
		this.submitCallbacks.push(callback);
	};

	return View;
}(jQuery));
