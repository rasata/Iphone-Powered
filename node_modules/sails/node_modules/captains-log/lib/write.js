/**
 * Module dependencies.
 */

var _ = require('lodash');
var util = require('util');



/**
 * Build a log function which combines arguments into a string,
 * enhancing them for readability.  If specified, prefixes will be
 * added.
 *
 * @param  {Function} logFn  [log fn]
 * @param  {String} logAt    [e.g. 'silly' or 'error']
 * @param  {Object} options
 *
 * @return {Function}        [enhanced log fn]
 * @api private
 */

module.exports = function (logFn, logAt, options) {
	return function _writeLogToConsole() {

		// Check `options.level` against logAt
		// to see whether to write the log.
		// ( silly = 0 | silent = highest )
		var lvlMap = options.logLevels;
		var configuredLvl = options.level;
		if (lvlMap[logAt] < lvlMap[configuredLvl]) return;


		var args = Array.prototype.slice.call(arguments);

    /////////////////////////////////////////////////////////////////
    // For backwards-compatibility:
    // (options.inspect should always be true going forward)
    //
    // Note that prefixes and other options will not work with
    // `inspect===false`.  New features will also not support
    // inspect:false.
    //
		// If `options.inspect` is disabled, just call the log fn normally
		if (!options.inspect) {
			return logFn.apply(logFn, args);
		}
    /////////////////////////////////////////////////////////////////

    // For reference on the following impl, see:
    // https://github.com/defunctzombie/node-util/blob/master/util.js#L22

    // Combine the arguments passed into the log fn
		var pieces = [];
		_.each(arguments, function(arg) {

			// Errors
			if (typeof arg === 'object' && arg instanceof Error &&
				arg.stack && !arg.inspect) {
				pieces.push(arg.stack);
			}

			// Objects
			else if (typeof arg === 'object') {
				pieces.push(util.inspect(arg));
				return;
			}

			pieces.push(arg);
		});

    // Compose `str` of all the arguments
    // (include the appropriate prefix if specified)
    var prefixStr = (options.prefixes && options.prefixes[logAt]) || '';
    var str = prefixStr + util.format.apply(util, pieces);

		// Call log fn
		return logFn.apply(logFn, [str]);
	};
};
