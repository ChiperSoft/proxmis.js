Proxmis.js
===

Proxmis is a very simple library to generate promises that can be used directly as typical two argument, error first, node.js callbacks.

##Node.js

To install:

	npm install proxmis

To use:

```js
var proxmis = require('proxmis');
```

##Usage

```js
var proxmis = require('proxmis');
var fs = require('fs');
var callback = proxmis();

fs.stat('/var', callback);

callback.then(function (stats) {
	//received folder stats
});
```

The first argument on `proxmis()` can optionally be another callback to be invoked before the promise resolves, or an object containing extra options for how the promise will be resolved.

```js
function fileStatWithCallbackOrPromise(cb) {
	var prox = proxmis(cb);
	fs.stat('/var', prox);
	return prox;
}
```

```js
var prox = proxmis({noError: true});
prox('first argument resolves', 'all other arguments ignored');
prox.then(function (result) {
	// result = 'first argument resolves'
});
```

```js
var prox = proxmis({allArgs: true});
prox('each argument resolves', 'together as', 'an array');
prox.then(function (result) {
	// result = ['each argument resolves', 'together as', 'an array']
});
```

Proxmis also provides a routine for wrapping a traditional call in a closure, directly returning a promise.

```js
proxmis.wrap(function (callback) {
	fs.stat('/var', callback);
}).then(function (stats) {
	//received folder stats
});
```
