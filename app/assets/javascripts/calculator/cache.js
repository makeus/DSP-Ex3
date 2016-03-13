/**
 * Mathias Keus
 * 013882396
 * https://github.com/makeus/DSP-Ex3
 */

var Cache = (function ($) {
    'use strict';

    /**
     * Cache handler
     * @constructor
     * @param {integer} size Size of the cache
     */
    function Cache(size) {
        this.size = size;
        this.queue = [];
    }

    /**
     * Sets a operation and the result to cache.
     * FIFO, New ones will be added to the back of the array, when max size is exceeded first item is removed and array shifted
     * @param left
     * @param right
     * @param operation
     * @param result
     */
    Cache.prototype.set = function (left, right, operation, result) {
        left = parseFloat(left);
        right = parseFloat(right);
        result = parseFloat(result);
        this.queue.push({
            left: left,
            right: right,
            operation: operation,
            result: result
        });

        if (this.queue.length > this.size) {
            this.queue.shift();
        }
    };

    /**
     * Get from cache based on result
     * @param result
     * @returns {object} Result object with left, right, operation and result fields
     */
    Cache.prototype.getResult = function (result) {
        result = parseFloat(result);
        var res = $.grep(this.queue, function (op) {
            return op.result == result;
        });
        if (res.length) {
            return res[0];
        }
    };

    /**
     * Get from cache based on operation
     * @param left
     * @param right
     * @param operation
     * @returns {object} Result object with left, right, operation and result fields
     */
    Cache.prototype.get = function (left, right, operation) {
        left = parseFloat(left);
        right = parseFloat(right);
        var res = $.grep(this.queue, function (op) {
            return op.left === left &&
                op.right === right &&
                op.operation === operation;
        });

        if (res.length) {
            return res[0];
        }
    };

    /**
     * Sets the size of the cache, drops excess items
     * @param size
     */
    Cache.prototype.setSize = function (size) {
        this.size = size;
        while (this.queue.length > size) {
            this.queue.shift();
        }
    };

    return Cache;

}(jQuery));