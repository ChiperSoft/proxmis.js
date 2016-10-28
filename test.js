
var test = require('tap').test;
var proxmis = require('./proxmis');

test('Promise Resolves', (t) => {
	t.plan(1);
	var prox = proxmis();

	prox.then(
		function (result) {
			t.equal(result, 10);
			t.done();
		},
		function (error) {
			t.ok(false, 'Promise Rejected');
			t.done();
		}
	);

	prox(null, 10);
});

test('Promise Rejects', (t) => {
	t.plan(1);
	var prox = proxmis();

	prox.then(
		function (result) {
			t.ok(false, 'Promise Resolved');
			t.done();
		},
		function (error) {
			t.equal(error, 'Failure');
			t.done();
		}
	);

	prox('Failure', 10);
});

test('Promise Resolves - With Callback', (t) => {
	t.plan(3);
	var prox = proxmis(function (err, result) {
		t.equal(result, 10);
		t.equal(err, null);
	});

	prox.then(
		function (result) {
			t.equal(result, 10);
			t.done();
		},
		function (error) {
			t.ok(false, 'Promise Rejected');
			t.done();
		}
	);

	prox(null, 10);
});

test('Promise Rejects - With Callback', (t) => {
	t.plan(3);
	var prox = proxmis(function (err, result) {
		t.equal(result, 10);
		t.equal(err, 'Failure');
	});

	prox.then(
		function (result) {
			t.ok(false, 'Promise Resolved');
			t.done();
		},
		function (error) {
			t.equal(error, 'Failure');
			t.done();
		}
	);

	prox('Failure', 10);
});

test('Casts ES6 promise, and resolves', (t) => {
	t.plan(1);
	var prox = proxmis();
	var prom = Promise.resolve(prox);

	prom.then(
		function (result) {
			t.equal(result, 10);
			t.done();
		},
		function (error) {
			t.ok(false, 'Promise Rejected');
			t.done();
		}
	);

	prox(null, 10);
});

test('Casts ES6 promise, and rejects', (t) => {
	t.plan(1);
	var prox = proxmis();
	var prom = Promise.resolve(prox);

	prom.then(
		function (result) {
			t.ok(false, 'Promise Resolved');
			t.done();
		},
		function (error) {
			t.equal(error, 'Failure');
			t.done();
		}
	);

	prox('Failure', 10);
});

test('Wrapper with a resolve', (t) => {
	t.plan(2);

	proxmis.wrap(function (callback) {
		t.ok('Invoked');
		callback(null, 10);
	}).then(
		function (result) {
			t.equal(result, 10);
			t.done();
		},
		function (error) {
			t.ok(false, 'Promise Rejected');
			t.done();
		}
	);
});

test('Wrapper with a rejection', (t) => {
	t.plan(2);

	proxmis.wrap(function (callback) {
		t.ok('Invoked');
		callback('Failure', 10);
	}).then(
		function (result) {
			t.ok(false, 'Promise Resolved');
			t.done();
		},
		function (error) {
			t.equal(error, 'Failure');
			t.done();
		}
	);
});

test('Chained then', (t) => {
	t.plan(2);

	var prox = proxmis();

	var defer = prox.then(function (result) {
		t.ok(true);
		return result;
	});
	defer = defer.then(function (result) {
		t.equal(result, 10);
		t.done();
	});

	prox(null, 10);
});

test('Promise Rejects into .catch()', (t) => {
	t.plan(1);
	var prox = proxmis();

	prox.catch(function (error) {
		t.equal(error, 'Failure');
		t.done();
	});

	prox('Failure', 10);
});

test('Promise Resolves from an errorless callback', (t) => {
	t.plan(1);
	var prox = proxmis({noError: true});

	prox.then(
		function (result) {
			t.equal(result, 20);
			t.done();
		},
		function (error) {
			t.ok(false, 'Promise Rejected');
			t.done();
		}
	);

	prox(20, 10);
});

test('Promise Resolves with all arguments', (t) => {
	t.plan(1);
	var prox = proxmis({allArgs: true});

	prox.then(
		function (result) {
			t.deepEqual(result, [20, 10]);
			t.done();
		},
		function (error) {
			t.ok(false, 'Promise Rejected');
			t.done();
		}
	);

	prox(20, 10);
});

test('Wrapper supports options', (t) => {
	t.plan(2);

	proxmis.wrap(function (callback) {
		t.ok('Invoked');
		callback(10);
	}, {noError:true}).then(
		function (result) {
			t.equal(result, 10);
			t.done();
		},
		function (error) {
			t.ok(false, 'Promise Rejected');
			t.done();
		}
	);
});
