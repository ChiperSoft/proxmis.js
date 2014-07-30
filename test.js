
var proxmis = require('./proxmis');
var Promise = require('es6-promise').Promise;

exports['Promise Resolves'] = function (test) {
	test.expect(1);
	var prox = proxmis();

	prox.then(
		function (result) {
			test.equal(result, 10);
			test.done();
		},
		function (error) {
			test.ok(false, 'Promise Rejected');
			test.done();
		}
	);

	prox(null, 10);
};

exports['Promise Rejects'] = function (test) {
	test.expect(1);
	var prox = proxmis();

	prox.then(
		function (result) {
			test.ok(false, 'Promise Resolved');
			test.done();
		},
		function (error) {
			test.equal(error, 'Failure');
			test.done();
		}
	);

	prox('Failure', 10);
};

exports['Promise Resolves - With Callback'] = function (test) {
	test.expect(3);
	var prox = proxmis(function (err, result) {
		test.equal(result, 10);
		test.equal(err, null);
	});

	prox.then(
		function (result) {
			test.equal(result, 10);
			test.done();
		},
		function (error) {
			test.ok(false, 'Promise Rejected');
			test.done();
		}
	);

	prox(null, 10);
};

exports['Promise Rejects - With Callback'] = function (test) {
	test.expect(3);
	var prox = proxmis(function (err, result) {
		test.equal(result, 10);
		test.equal(err, 'Failure');
	});

	prox.then(
		function (result) {
			test.ok(false, 'Promise Resolved');
			test.done();
		},
		function (error) {
			test.equal(error, 'Failure');
			test.done();
		}
	);

	prox('Failure', 10);
};

exports['Casts ES6 promise, and resolves'] = function (test) {
	test.expect(1);
	var prox = proxmis();
	var prom = Promise.cast(prox);

	prom.then(
		function (result) {
			test.equal(result, 10);
			test.done();
		},
		function (error) {
			test.ok(false, 'Promise Rejected');
			test.done();
		}
	);

	prox(null, 10);
};

exports['Casts ES6 promise, and rejects'] = function (test) {
	test.expect(1);
	var prox = proxmis();
	var prom = Promise.cast(prox);

	prom.then(
		function (result) {
			test.ok(false, 'Promise Resolved');
			test.done();
		},
		function (error) {
			test.equal(error, 'Failure');
			test.done();
		}
	);

	prox('Failure', 10);
};

exports['Wrapper with a resolve'] = function (test) {
	test.expect(2);

	proxmis.wrap(function (callback) {
		test.ok('Invoked');
		callback(null, 10);
	}).then(
		function (result) {
			test.equal(result, 10);
			test.done();
		},
		function (error) {
			test.ok(false, 'Promise Rejected');
			test.done();
		}
	);
};

exports['Wrapper with a rejection'] = function (test) {
	test.expect(2);

	proxmis.wrap(function (callback) {
		test.ok('Invoked');
		callback('Failure', 10);
	}).then(
		function (result) {
			test.ok(false, 'Promise Resolved');
			test.done();
		},
		function (error) {
			test.equal(error, 'Failure');
			test.done();
		}
	);
};

exports['Chained then'] = function (test) {
	test.expect(2);

	var prox = proxmis();

	var defer = prox.then(function (result) {
		test.ok(true);
		return result;
	});
	defer = defer.then(function (result) {
		test.equal(result, 10);
		test.done();
	});

	prox(null, 10);
};

exports['Promise Rejects into .catch()'] = function (test) {
	test.expect(1);
	var prox = proxmis();

	prox.catch(function (error) {
		test.equal(error, 'Failure');
		test.done();
	});

	prox('Failure', 10);
};

