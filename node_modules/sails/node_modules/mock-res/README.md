mock-res
========

Mocks node.js http.ServerResponse (a response). See also `mock-req`.

Being a readable/writable stream, you can pipe the response body to and from it.

# Usage
See `test.js` for further usage.

	var MockRes = require('mock-res');

	// Basic usage
	var res = new MockRes();

	// With callback for 'finish' event
	var res = new MockRes(function() {
		console.log('Response finished');
	});

	// Or listen for stream events
	res.on('error', function(err) {
		console.error('Error: %s', err.stack);

		// If not listened for, the 'error' event will throw,
		// as is true for any stream.
	});
	res.on('finish', function() {
		console.log('Finished');
	});

	// Read status code
	res.statusCode; // 200 by default

	// Read body as string
	res._getString(); // 'I am a chicken';

	// Read body as parsed JSON
	res._getJSON(); // { chicken: true }

	// Pipe body somewhere
	res.pipe(fs.createWriteStream('/tmp/yo'));

## Example test case

	var assert = require('assert');
	var list = require('./list-handler');
	var MockRes = require('mock-res');

	function test(done) {
		/* Arrange */

		// Use `mock-req` for a better mock
		var req = {
			method: 'GET',
			url: '/foos'
		}

		var res = new MockRes(finish);

		/* Act */
		list(req, res);

		/* Assert */
		function finish() {
			// NOTE `this` === `res`

			assert.equal(this.statusCode, 200);
			assert.equal(this._getString(), '[{"id":0},{"id":1}]');
			assert.deepEqual(this._getJSON(), [{id: 0 }, {id: 1 }]);

			res.pipe(process.stdout); // `res` is just a readable stream here

			done(); // this is an async test
		}
	}

## Methods

* All readable/writable stream methods.
* `_getString()` Reads the body as a string, from the internal stream buffer.
* `_getJSON()` Reads the body as a parsed JSON object, from the internal stream buffer.
