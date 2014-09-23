mock-req
========

Mocks node.js `http.IncomingMessage` (a request).  See also `mock-res`.

Being a readable/writable stream, you can pipe the request body to and from it.

# Usage
See `test.js` for further usage.

	var MockReq = require('mock-req');

	// Basic usage
	var req = new MockReq();

	// With options
	var req = new MockReq({
		method: 'PUT',
		url: '/stuff?q=thing',
		headers: {
			'Accept': 'text/plain'
		},

		// arbitrary properties:
		search: 'thing'
	});

	// Write body
	req.write('hello');
	req.write('world');

	// Or stringify to JSON
	req.write({
		val: 5
	});

	// Or even buffers
	req.write(new Buffer('buf'));

	// End body
	req.end();

	// NOTE req.end() is automatically called if 
	// method is set to GET/HEAD/DELETE.

## Example test case

	var assert = require('assert');
	var ping = require('./ping-handler');
	var MockReq = require('mock-req');

	function test(done) {
		/* Arrange */
		var req = new MockReq({
			method: 'GET',
			url: '/stuff',
			headers: {
				'Accept': 'text/plain'
			}
		});

		// NOTE: `req.end()` is automatically called for GET/HEAD/DELETE methods

		// Use `mock-res` for a better mock
		var res = {
			end: end
		};

		/* Act */
		ping(req, res);

		/* Assert */
		function end(data) {
			assert.equal(data, 'okay');

			done(); // this is an async test
		}
	}

## Options
The options parameter is optional.

* `method`: The request's method, defaults to 'GET'
* `url`: The request's URL, defaults to ''
* `headers`: A case insensitive name/value object

All other values will be copied to the request.

## Methods

* All readable/writable stream methods.
* `req._fail(error)` Causes the request to emit an `error` when written to.