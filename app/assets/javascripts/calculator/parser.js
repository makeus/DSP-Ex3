var Parser = (function() {

	function Parser() {}

	Parser.operators = ['+', '-', '*', '/'];

	Parser.prototype.parse = function(input) {
		var result = [];
		var trimmed = input.split(' ').join('');

		Parser.operators.forEach(function(operator){
			trimmed = trimmed.replace(operator, ',' + operator + ',');
		});

		var splitted = trimmed.split(',');
		Parser.operators.forEach(function(operator) {
			var index;
			while((index = splitted.indexOf(operator)) !== -1) {
				if(index === 0 || index === splitted.length - 1) {
					throw 'Invalid string';
				}
				var operation = splitted.slice(index-1, index + 2);
				var operationObj = {
					left: operation[0],
					right: operation[2],
					operation: operation[1]
				};
				result.push(operationObj);
				splitted[index + 1] = operationObj;
				splitted.splice(index-1, 2);
			}
		});
		return result;
	};

	return Parser;
}());