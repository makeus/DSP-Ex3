/**
 * Mathias Keus
 * 013882396
 * https://github.com/makeus/DSP-Ex3
 */

var Calculation = (function ($) {
    'use strict';

    /**
     * Handles the simple calculation
     * @constructor
     */
    function Calculation() {
    }

    /**
     * Calculates the answer for simple equations on the server
     * @param left
     * @param operation
     * @param right
     * @returns {jQuery.Deferred} Promise
     */
    Calculation.prototype.calculate = function (left, operation, right) {
        return $.ajax({
            method: 'POST',
            url: '/calculator',
            dataType: 'json',
            data: {
                arg1: left,
                arg2: right,
                op: operation
            }
        }).then(function (data) {
            return data.result;
        });
    };

    return Calculation;

}(jQuery));