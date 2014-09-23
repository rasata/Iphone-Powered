/**
 * Module dependencies
 */
var _ = require('lodash');
var util = require('util');
var constants = require('./constants');


/**
 * factory
 * 
 * @return {Switchback}
 * 
 * An anonymous function is used as the base for switchbacks so that
 * they are both dereferenceable AND callable.  This allows functions
 * which accept switchback definitions to maintain compatibility with 
 * standard node callback conventions (which are better for many situations).
 * 
 * This also means that instantiated switchbacks may be passed interchangably
 * into functions expecting traditional node callbacks, and everything will
 * "just work".
 */

module.exports = function (callbackContext) {

	var _switch = function( /* err, arg1, arg2, ..., argN */ ) {
		var args = Array.prototype.slice.call(arguments);

		// Trigger error handler
		var err = args[0];
		if (err) {
			return _switch.error.apply(callbackContext || this, args);
		}
		return _switch.success.apply(callbackContext || this, args.slice(1));
	};

	// Mark switchback function so it can be identified for tests
	_switch[constants.telltale.key] = constants.telltale.value;

	return _switch;
};

