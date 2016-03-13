/**
 * Mathias Keus
 * 013882396
 * https://github.com/makeus/DSP-Ex3 
 */
 
var Sin = (function() {

	/**
	 * For calculating sine with usage of the Calculator
	 * @param {Calculator} calculator
	 * @constructor
     */
	function Sin(calculator) {
		this.calculator = calculator;
	}

	/**
	 * Helper function to generate Taylor expansion round to a format that can be calculated with Calculator.
	 * Since calculator calculates in a wrong order, result is done in a odd manner
	 *
	 * @example
	 * round(3, 2.5) // 2.5*2.5*2.5/3/2/1
	 *
	 * @param n Exponent to be used
	 * @param x value to be used
	 * @returns {string} resulting string
     */
	function round(n, x) {
		var result = x;

		if(x < 0) {
			x = -1 * x;
			result = '(-1) * ' + x;
		}

		for (var i = 0; i < n - 1; i++) {
			result += '*' + x
		}
		result += '/' + n;
		for (var j = n - 1; j > 0; j--) {
			result += '/' + j
		}
		return result;
	}

	/**
	 * Calculates sine based on Taylor series for sine and with Calculator.
	 * Recursively calls itself until round limit is reached.
	 *
	 * Calculates
	 * Y = X - X^3 / 3! + X^5 / 5! - ... + (-1)(n+1) * X^(2*n-1) / (2n-1)!
	 *
	 * @see Calculator
	 *
	 * @param x
	 * @param n number of rounds
	 * @param i current round
	 * @returns {jQuery.Deferred}
     * @private
     */
	Sin.prototype._calculate = function(x, n, i) {
		var $this = this;
		i = i || 1;
		return this.calculator.calculate(round(2*i - 1, x))
			.then(function(result1) {
				if(i !== n) {
					return $this._calculate(x, n, i+1)
					.then(function(result2) {
						var operator = '-';
						if(result2 < 0 && i % 2 !== 0) {
							operator = '+';
							result2 = -1 * result2;
						}
						return $this.calculator.calculate(result1.toFixed(20) + operator + result2.toFixed(20));
					});
				}
				return result1;
			});
	};

	/**
	 * Calculates sin(x) for given x
	 * Uses n = 5, to achieve necessary 1% accuracy between [-π, π]
	 * @param x
	 * @returns {jQuery.Deferred}
     */
	Sin.prototype.calculate = function(x) {
		var $this = this;
		return $this._calculate(x, 5);
	};

	return Sin;

}());