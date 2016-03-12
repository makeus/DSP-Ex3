var Sin = (function() {

	function Sin(calculator) {
		this.calculator = calculator;
	}

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
		for (var i = n - 1; i > 0; i--) {
			result += '/' + i
		}
		return result;
	}

	Sin.prototype._calculate = function(x, max, n) {
		var $this = this;
		n = n || 1;
		return this.calculator.calculate(round(2*n - 1, x))
			.then(function(result1) {
				if(n !== max) {
					return $this._calculate(x, max, n+1)
					.then(function(result2) {
						var operator = '-';
						if(result2 < 0 && n % 2 !== 0) {
							operator = '+';
							result2 = -1 * result2;
						}
						return $this.calculator.calculate(result1.toFixed(20) + operator + result2.toFixed(20));
					});
				}
				return result1;
			});
	};

	Sin.prototype.calculate = function(x) {
		var $this = this;
		var factor = '';

		return $this._calculate(x, 5);
	};

	return Sin;

}());