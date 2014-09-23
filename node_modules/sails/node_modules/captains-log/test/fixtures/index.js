/**
 * Dependencies
 */

var _ = require('lodash');
var _recordAll = require('./_record-all');
var _pauseAll = require('./_pause-all');


// Note- this could be done a lot more elegantly- see the newer test suites
// (e.g. expectOutputValue) for an example.

/**
 * Fixtures to be used directly by mocha's `before`, `after`, `beforeEach`,
 * `afterEach`, and `it` methods.
 *
 * @type {Object}
 */
module.exports = {

	log: {

		silly: function () {
			var args = Array.prototype.slice.call(arguments);
			return function () {
				var ctx = this;
				_recordAll(ctx);
				ctx.log.silly.apply(args);
				_pauseAll(ctx);
			};
		},

		verbose: function () {
			var args = Array.prototype.slice.call(arguments);
			return function () {
				var ctx = this;
				_recordAll(ctx);
				ctx.log.verbose.apply(args);
				_pauseAll(ctx);
			};
		},

		info: function () {
			var args = Array.prototype.slice.call(arguments);
			return function () {
				var ctx = this;
				_recordAll(ctx);
				ctx.log.info.apply(args);
				_pauseAll(ctx);
			};
		},

		blank: function () {
			var args = Array.prototype.slice.call(arguments);
			return function () {
				var ctx = this;
				_recordAll(ctx);
				ctx.log.blank.apply(args);
				_pauseAll(ctx);
			};
		},

		_call: function () {
			var args = Array.prototype.slice.call(arguments);
			return function () {
				var ctx = this;
				_recordAll(ctx);
				ctx.log.apply(args);
				_pauseAll(ctx);
			};
		},

		debug: function () {
			var args = Array.prototype.slice.call(arguments);
			return function () {
				var ctx = this;
				_recordAll(ctx);
				ctx.log.debug.apply(args);
				_pauseAll(ctx);
			};
		},

		warn: function () {
			var args = Array.prototype.slice.call(arguments);
			return function () {
				var ctx = this;
				_recordAll(ctx);
				ctx.log.warn.apply(args);
				_pauseAll(ctx);
			};
		},

		error: function () {
			var args = Array.prototype.slice.call(arguments);
			return function () {
				var ctx = this;
				_recordAll(ctx);
				ctx.log.error.apply(args);
				_pauseAll(ctx);
			};
		}
	}
};


