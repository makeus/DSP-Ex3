/**
 * Mathias Keus
 * 013882396
 * https://github.com/makeus/DSP-Ex3
 */

var Calculator = (function ($) {
    'use strict';

    /**
     * Main calculator, calculates based on input and simplifyis
     * @param {Parser} parser
     * @param {Calculation} calculation
     * @param {Cache} cache
     * @constructor
     */
    function Calculator(parser, calculation, cache) {
        this.parser = parser;
        this.calculation = calculation;
        this.cache = cache;
    }

    /**
     * Parses a single parsed item, recursively calls itself when object on either side is found.
     * Calls Calculation.calculate in calculation (ie. the server side calculation)
     * Uses Cache to search for results and storing results, between calculations
     *
     * @see Calculation.calculate
     * @param parsedItem item in format {left: {left: 1, right: 2, operation: '+'}, right: 3, operation: '*'}
     * @param {Function} roundcallback Callback to call every time a calculation is performed
     * @returns {jQuery.Deferred} Promise with result
     * @private
     */
    Calculator.prototype._round = function (parsedItem, roundcallback) {
        var $this = this;

        var left = typeof parsedItem.left === 'object' ?
            $this._round(parsedItem.left, roundcallback) :
            parsedItem.left;

        var right = typeof parsedItem.right === 'object' ?
            $this._round(parsedItem.right, roundcallback) :
            parsedItem.right;

        return $.when(left, right, parsedItem.operation).then(function (left, right, operation) {
            var cached = $this.cache.get(left, right, operation);
            if (cached) {
                if (roundcallback) {
                    roundcallback(left, right, operation, cached.result);
                }
                return cached.result;
            }

            return $this.calculation.calculate(left, operation, right).then(function (result) {
                $this.cache.set(left, right, operation, result);
                if (roundcallback) {
                    roundcallback(left, right, operation, result);
                }
                return result;
            });
        });
    };

    /**
     * Method for calculating input. Parses input and calls recursive _round.
     * @see Calculator._round
     * @param input
     * @param cb
     * @returns {jQuery.Deferred}
     */
    Calculator.prototype.calculate = function (input, cb) {
        var parsed = this.parser.parse(input);
        if (parsed) {
            return this._round(parsed, cb);
        }
        return jQuery.Deferred().resolve(input);
    };

    /**
     * Simplifies the input based on items in the cache. Calls recursively itself
     * @param parsedItem item in format {left: {left: 1, right: 2, operation: '+'}, right: 3, operation: '*'}
     * @returns {string} simplified result
     * @private
     */
    Calculator.prototype._simplifyParsed = function (parsedItem) {
        var left = typeof parsedItem.left === 'object' ?
            this._simplifyParsed(parsedItem.left) :
            parsedItem.left;

        var right = typeof parsedItem.right === 'object' ?
            this._simplifyParsed(parsedItem.right) :
            parsedItem.right;

        var cached = this.cache.get(left, right, parsedItem.operation);
        if (cached) {
            return cached.result;
        }
        return '' + left + parsedItem.operation + right;
    };

    /**
     * Simplifies the input string to a another string that has the operations changed based on the results in Cache
     * @param {string} input
     * @returns {string}
     */
    Calculator.prototype.simplify = function (input) {
        var parsed = this.parser.parse(input);
        if (parsed) {
            return this._simplifyParsed(parsed);
        }
        return input;
    };

    return Calculator;


}(jQuery));