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

Proxmis also provides a routine for wrapping a traditional call in a closure, directly returning a promise.

```js
proxmis.wrap(function (callback) {
	fs.stat('/var', callback);
}).then(function (stats) {
	//received folder stats
});
```

Proxmis uses the [ES6 Promise Polyfill](https://github.com/jakearchibald/es6-promise) to generate the promise it returns.