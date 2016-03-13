/**
 * Mathias Keus
 * 013882396
 * https://github.com/makeus/DSP-Ex3
 */

var Parser = (function () {

    /**
     * Handles string parsing
     * @constructor
     */
    function Parser() {
    }

    /**
     * Operations and the priority of parsing
     * @type {string[]}
     */
    Parser.operators = ['+', '-', '*', '/'];

    /**
     * Parses input string to a prioritized object.
     * Input is splitted based on operation, ie. [1, '+', 2]. Returnable operation is hold on operationObj
     * The splitted input is looped while adding in to the to operationObj and replacing it into the array.
     * The actual order is false compared to traditional calculation, but this is intentional.
     *
     * @example
     * parse('1 + 2 * 3')
     * // => [1, '+', 2, '*', 3]
     * // => [{left: 1, right: 2, operation: '+'},  '*', 3]
     * // => {left: {left: 1, right: 2, operation: '+'}, right: 3, operation: '*'}
     *
     * @param input String of the input, see example
     * @returns {object}
     */
    Parser.prototype.parse = function (input) {
        var trimmed = input.split(' ').join('');

        Parser.operators.forEach(function (operator) {
            trimmed = trimmed.split(operator).join('#' + operator + '#');
        });

        trimmed = trimmed.split('(#-#').join('-').split(')').join('')
        trimmed = trimmed.split('#-##-#').join('#+#');
        trimmed = trimmed.split('#+##-#').join('#-#');

        var splitted = trimmed.split('#');
        splitted = splitted.filter(function (val) {
            return val !== '';
        });

        if (splitted[0] === '-') {
            splitted[1] = '-' + splitted[1];
            splitted = splitted.slice(1);
        }

        var operationObj;
        Parser.operators.forEach(function (operator) {
            var index;
            while ((index = splitted.indexOf(operator)) !== -1) {
                if (index === 0 || index === splitted.length - 1) {
                    throw 'Invalid string';
                }
                var operation = splitted.slice(index - 1, index + 2);
                operationObj = {
                    left: operation[0],
                    right: operation[2],
                    operation: operation[1]
                };
                splitted[index + 1] = operationObj;
                splitted.splice(index - 1, 2);
            }
        });
        return operationObj;
    };

    return Parser;
}());