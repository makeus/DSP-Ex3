/**
 * @author Mathias Keus, 013882396
 * https://github.com/makeus/DSP-Ex3 
 */
 
var View = (function($) {
	'use strict';

	/**
	 * Controls the view
	 * @constructor
     */
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

		$('.cache-size').change(function() {
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

	View.prototype.setGraph = function(element, title) {
		var graph = $('<div class="graph"></div>').append('<h2>' + title + '</h2>').append(element);
		$('.results').append(graph);
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

	View.prototype.setLoading = function(bool) {
		if(bool) {
			var timerUpdate = function() {
				$('.timer').text(((new Date() - start) / 1000).toFixed(1) + " seconds");
			};

			$('.results-container').addClass('loading');
			var start = new Date();
			timerUpdate();
			this.timer = setInterval(timerUpdate, 200);
		} else {
			$('.results-container').removeClass('loading');
			clearInterval(this.timer);
		}
	};

	return View;
}(jQuery));
