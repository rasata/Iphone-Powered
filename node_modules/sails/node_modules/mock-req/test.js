var assert = require('assert'),
	MockRequest = require('./index');

var tests = [

	function is_writable_and_readable(done) {
		var req = new MockRequest();
		assert(req.readable);
		assert(req.writable);

		done();
	},

	function default_options(done) {
		var req = new MockRequest();

		assert.equal(typeof req.url, 'string');
		assert.equal(req.method, 'GET');
		assert.deepEqual(req.headers, {});
		assert.deepEqual(req.rawHeaders, []);

		done()
	},

	function parses_headers(done) {
		var req = new MockRequest({
			headers: {
				'Content-Type': 'text/plain',
				'Content-Length': 10
			}
		});

		assert.equal(req.headers['content-type'], 'text/plain');
		assert.equal(req.headers['content-length'], '10');
		assert.deepEqual(req.rawHeaders, [
			'Content-Type',
			'text/plain',
			'Content-Length',
			'10'
		]);

		done()
	},

	function automatically_ends_for_bodiless(done) {
		var ends = {
			GET: true,
			HEAD: true,
			DELETE: true,
			POST: false,
			PUT: false,
			WHATEVS: false
		};

		Object.keys(ends).forEach(function(method) {
			var req = new MockRequest({
				method: method
			});

			assert.equal(req._writableState.ended, ends[method], method);
		});

		done();
	},

	function string_body(done) {
		var req = new MockRequest({
			method: 'POST'
		});

		req.write('hello', 'utf8');
		req.end();

		req.setEncoding('utf8');
		req.once('readable', function() {
			var d = this.read();
			assert.equal(d, 'hello');
			done();
		});
	},

	function json_body(done) {
		var req = new MockRequest({
			method: 'POST'
		});

		req.write({
			hello: 3
		});
		req.end();

		req.setEncoding('utf8');
		req.once('readable', function() {
			var d = this.read();
			assert.deepEqual(d, '{"hello":3}');
			done();
		});
	},

	function buffer_body(done) {
		var req = new MockRequest({
			method: 'POST'
		});

		var buf = new Buffer('yo', 'utf8');
		req.write(buf);
		req.end();

		req.once('readable', function() {
			var d = this.read();
			assert.equal(d, buf);
			done();
		});
	},

	function fails(done) {
		var req = new MockRequest({
			method: 'POST'
		});

		var err = new Error('Oops');
		req._fail(err);

		req.on('error', function(err2) {
			assert.equal(err, err2);
			done();
		});

		req.write('yo');
	}

];


var doneCount = 0;
tests.forEach(function(test) {
	test(done.bind(null, test.name));
});

function done(name) {
	console.log(name);
	doneCount++;

	if (doneCount === tests.length) {
		console.log('>> All tests passed');
		return process.exit(0);
	}
}