var Calculator = (function($) {
	'use strict';

	function Calculator(parser, calculation, cache) {
		this.parser = parser;
		this.calculation = calculation;
		this.cache = cache;
	};

	Calculator.prototype._round = function(parsedItem, roundcallback) {
		var $this = this;

		var left = typeof parsedItem.left === 'object' ? 
		$this._round(parsedItem.left, roundcallback) : 
		parsedItem.left

		var right = typeof parsedItem.right === 'object' ? 
		$this._round(parsedItem.right, roundcallback) : 
		parsedItem.right

		return $.when(left, right, parsedItem.operation).then(function(left, right, operation) {
			var cached = $this.cache.get(left, right, operation)
			if(cached) {
				if(roundcallback) {
					roundcallback(left, right, operation, cached.result);	
				}
				return cached.result;
			}

			return $this.calculation.calculate(left, operation, right).then(function(result) {
				if(roundcallback) {
					$this.cache.set(left, right, operation, result);
					roundcallback(left, right, operation, result);	
				}
				return result;
			});
		});
	};

	Calculator.prototype.calculate = function(input, cb) {
		var parsed = this.parser.parse(input);
		if(parsed) {
			return this._round(parsed, cb);	
		}
		return input;
	};

	Calculator.prototype._simplifyParsed = function(parsedItem) {
		var left = typeof parsedItem.left === 'object' ? 
		this._simplifyParsed(parsedItem.left) : 
		parsedItem.left

		var right = typeof parsedItem.right === 'object' ? 
		this._simplifyParsed(parsedItem.right) : 
		parsedItem.right

		var cached = this.cache.get(left, right, parsedItem.operation);
		if(cached) {
			return cached.result;
		}
		return '' + left + parsedItem.operation + right;
	};

	Calculator.prototype.simplify = function(input) {
		var parsed = this.parser.parse(input);
		if(parsed) {
			return this._simplifyParsed(parsed);
		}
		return input;
	};

	return Calculator;
	

}(jQuery))