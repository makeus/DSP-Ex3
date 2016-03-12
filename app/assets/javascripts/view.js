var View = (function($) {
	'use strict';

	function View() {
		this.submitCallbacks = [];
		this.simplifyCallbacks = [];
		var $this = this;

		$('form').submit(function(event) {
			$.each($this.submitCallbacks, function(i, cb) {
				cb($('form input#input').val());
			});
			event.preventDefault();
		});

		$('.simplify').click(function() {
			$.each($this.simplifyCallbacks, function(i, cb) {
				cb($('form input#input').val());
			});
		});
	}

	View.prototype.setInput = function(val) {
		$('form input#input').val(val);
	};

	View.prototype.setResult = function(left, right, operator, result) {
		$('.results').append('<p>' + left + ' ' + operator + ' ' + right + ' = ' + result + '</p>');
	};

	View.prototype.setGraph = function(element) {
		$('.results').append(element);
	};

	View.prototype.onSubmit = function(callback) {
		this.submitCallbacks.push(callback);
	};

	View.prototype.onSimplifyClick = function(callback) {
		this.simplifyCallbacks.push(callback);
	};

	return View;
}(jQuery));
