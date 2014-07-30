
var Promise = require('es6-promise').Promise;

var proxmis = function (options) {
	var defer, callable;
	var callback;
	if (typeof options === 'function') {
		callback = options;
	} else {
		options = options || {};
		callback = options.callback;
	}

	defer = new Promise(function (resolve, reject) {
		callable = function (err, data) {
			if (callback) {
				callback.apply(this, arguments);
			}

			if (options.noError) {
				resolve(err);
			} else if (options.allArgs) {
				resolve(Array.prototype.slice.call(arguments));
			} else {
				if (err) {
					reject(err);
				} else {
					resolve(data);
				}
			}
		};
	});
	
	// Attach the original promise to the callback.
	callable.promise = defer;

	// Create a `then` proxy function that calls with the correct context.
	callable.then = function () {
		return defer.then.apply(defer, arguments);
	};

	callable.catch = function () {
		return defer.catch.apply(defer, arguments);
	};

	return callable;
};

proxmis.wrap = function (actionable, options) {
	var proxy = proxmis(options);
	actionable(proxy);
	return proxy;
};

module.exports = proxmis;
