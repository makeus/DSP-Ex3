var Parser = (function() {

	function Parser() {}

	Parser.operators = ['+', '-', '*', '/'];

	Parser.prototype.parse = function(input) {
		var trimmed = input.split(' ').join('');

		Parser.operators.forEach(function(operator){
			trimmed = trimmed.split(operator).join('#' + operator + '#');
		});

		trimmed = trimmed.split('(#-#').join('-').split(')').join('')
		trimmed = trimmed.split('#-##-#').join('#+#');
		trimmed = trimmed.split('#+##-#').join('#-#');

		var operationObj;
		var splitted = trimmed.split('#');
		splitted = splitted.filter(function(val) {
			return val !== '';
		});

		if(splitted[0] === '-') {
			splitted[1] = '-' + splitted[1];
			splitted = splitted.slice(1);
		}

		Parser.operators.forEach(function(operator) {
			var index;
			while((index = splitted.indexOf(operator)) !== -1) {
				if(index === 0 || index === splitted.length - 1) {
					throw 'Invalid string';
				}
				var operation = splitted.slice(index-1, index + 2);
				operationObj = {
					left: operation[0],
					right: operation[2],
					operation: operation[1]
				};
				splitted[index + 1] = operationObj;
				splitted.splice(index-1, 2);
			}
		});
		return operationObj;
	};

	return Parser;
}());