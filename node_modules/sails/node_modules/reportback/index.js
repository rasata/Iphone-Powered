/**
 * Module dependencies
 */

var _ = require('lodash')
	, switchback = require('node-switchback')
	, mergeDefaults = require('merge-defaults')
	, captains = require('captains-log');



/**
 * Reporter
 *
 * Hybrid between:
 * + switchback
 * + logger
 * + EventEmitter
 * + Stream
 *
 * Usage:
 * require('reporter')
 *
 */
module.exports = Reporter;

/**
 * Factory
 * 
 * @param  {Object|Function} patch
 * @param  {Object} defaultHandlers
 * @return {Reporter} a new reporter
 */
function Reporter (patch, defaultHandlers) {
	patch = patch || {};
	defaultHandlers = defaultHandlers || {};
	if ( ! (_.isFunction(patch) || _.isObject(patch)) ) {
		throw new Error('Invalid usage: must provide a function or object.');
	}

	// Construct logger
	var logger = captains();
	

	// Construct a switchback
	var reporter = switchback(patch, _.defaults(defaultHandlers, {
		success: (function(){}),
		error  : (logger.error),
		end    : (function(){})
	}));

	// Mixin streaming / logging functionality
	reporter.write = logger.info;
	reporter.log   = logger;

	/**
	 * Mixin `extend()` method
	 * @param  {Object|Function} patch
	 * @return {Reporter} a new reporter
	 */
	reporter.extend = Reporter;

	return reporter;
}


