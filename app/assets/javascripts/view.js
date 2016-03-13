var View = (function($) {
	'use strict';

	function View() {
		this.submitCallbacks = [];
		this.simplifyCallbacks = [];
		this.cacheSizeCallbacks = [];
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

		$('.cache-size').change(function(event) {
			$.each($this.cacheSizeCallbacks, function(i, cb) {
				cb($('.cache-size').val());
			});
		});
	}

	View.prototype.clearResults = function() {
		$('.results').empty();
	};

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

	View.prototype.onCacheSizeChange = function(callback) {
		this.cacheSizeCallbacks.push(callback);
	};

	return View;
}(jQuery));
