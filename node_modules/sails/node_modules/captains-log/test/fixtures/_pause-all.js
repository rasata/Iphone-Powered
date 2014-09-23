/**
 * Module dependencies
 */

var _ = require('lodash');



/**
 * [_pauseAll description]
 * @param  {[type]} ctx [description]
 * @return {[type]}     [description]
 */
module.exports = function _pauseAll (ctx) {
	_.each(ctx.interceptors, function (interceptor, id) {
		interceptor.release();
	});
};
