var Cache = (function($) {
	'use strict';

	function Cache(size) {
		this.size = size;
		this.queue = [];
	};

	Cache.prototype.set = function(left, right, operation, result) {
		this.queue.push({
			left: left,
			right: right,
			operation: operation,
			result: result
		});

		if(this.queue.length > this.size) {
			this.queue.shift();
		}
	};

	Cache.prototype.getResult = function(result) {
		var res =  $.grep(this.queue, function(op){ 
			return op.result == result; 
		});
		if(res.length) {
			return res[0];
		}
	};

	Cache.prototype.get = function(left, right, operation) {
		var res = $.grep(this.queue, function(op){ 
			return op.left === left &&
				op.right === right &&
				op.operation === operation; 
		});

		if(res.length) {
			return res[0];
		}
	}

	Cache.prototype.setSize = function(size) {
		this.size = size;
		while(this.queue.length > size) {
			this.queue.shift();
		}
	};

	return Cache;

}(jQuery));