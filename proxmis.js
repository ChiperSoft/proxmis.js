

var Promise = require('es6-promise').Promise;

var proxmis = function (callback) {
	var defer, callable;

	defer = new Promise(function (resolve, reject) {
		callable = function (err, data) {
			if (callback) {
				callback(err, data);
			}

			if (err) {
				reject(err);
			} else {
				resolve(data);
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

proxmis.wrap = function (actionable) {
	var proxy = proxmis();
	actionable(proxy);
	return proxy;
};

module.exports = proxmis;