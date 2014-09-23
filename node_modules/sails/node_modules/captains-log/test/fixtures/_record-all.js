/**
 * Module dependencies
 */

var _ = require('lodash');



/**
 * [_recordAll description]
 * @param  {[type]} ctx [description]
 * @return {[type]}     [description]
 */
module.exports = function _recordAll (ctx) {
	_.each(ctx.interceptors, function (interceptor, id) {
		interceptor.capture(function intercept (string, encoding, fd) {
			ctx.logs[id].push(string);
			return false;
		});
	});
};
