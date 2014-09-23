/**
 * Module dependencies
 */
var _ = require('lodash');
var util = require('util');
var factory = require('./factory');
var normalize = require('./normalize');
var redirect = require('./redirect');
var wildcard = require('./wildcard');
var constants = require('./constants');
var EventEmitter = require('events').EventEmitter;


/**
 * `switchback`
 *
 * Switching utility which builds and returns a handler which is capable
 * calling one of several callbacks.
 *
 * @param {Object|Function} callback
 *			- a switchback definition obj or a standard 1|2-ary node callback function.
 * @param {Object} [defaultHandlers]
 *			- '*': supply a special callback for when none of the other handlers match
 *			- a string can be supplied, e.g. {'invalid': 'error'}, to "forward" one handler to another
 *			- otherwise a function should be supplied, e.g. { 'error': res.serverError }
 * @param {Object} [callbackContext]
 *			- optional `this` context for callbacks
 */

var switchback = function(callback, defaultHandlers, callbackContext) {

  // Track whether a single tick of the event loop has elapsed yet since
  // this switchback was instantiated.
  var atLeastOneTickHasElapsed;
  setTimeout(function (){
    atLeastOneTickHasElapsed = true;
  }, 0);

  // Build switchback
  var Switchback = factory(callbackContext);

  // If callback is not a function or an object, I don't know wtf it is,
  // so let's just return early before anything bad happens, hmm?
  if (!_.isObject(callback) && !_.isFunction(callback)) {
    // Actually let's not.
    // Instead, make the new switchback an EventEmitter
    var e = new EventEmitter();
    Switchback.emit = function() {
      var args = Array.prototype.slice.call(arguments);

      // This will invoke the final runtime function
      //
      // But first ensure at least a single cycle of the event loop has elapsed
      // since this switchback was instantiated
      if (atLeastOneTickHasElapsed) {
        return e.emit.apply(e, args);
      }
      else {
        setTimeout(function (){
          return e.emit.apply(e, args);
        }, 0);
      }
    };
    Switchback.on = function(evName, handler) {
      return e.on.apply(e, Array.prototype.slice.call(arguments));
    };

    // Then emit the appropriate event when the switchback is triggered.
    callback = {
      error: function(err) {
        Switchback.emit('error', err);
      },
      success: function( /*...*/ ) {
        Switchback.emit.apply(e, ['success'].concat(Array.prototype.slice.call(arguments)));
      }
    };
  }



  // Normalize `callback` to a switchback definition object.
  callback = normalize.callback(callback, callbackContext);

  // Attach specified handlers
  _.extend(Switchback, callback);



  // Supply a handful of default handlers to provide better error messages.
  var getWildcardCaseHandler = function(caseName, err) {
    return function unknownCase( /* ... */ ) {
      var args = Array.prototype.slice.call(arguments);
      err = (args[0] ? util.inspect(args[0]) + '        ' : '') + (err ? '(' + (err || '') + ')' : '');

      if (_.isObject(defaultHandlers) && _.isFunction(defaultHandlers['*'])) {
        return defaultHandlers['*'](err);
      } else throw new Error(err);
    };
  };

  // redirect any handler defaults specified as strings
  if (_.isObject(defaultHandlers)) {
    defaultHandlers = _.mapValues(defaultHandlers, function(handler, name) {
      if (_.isFunction(handler)) return handler;

      // Closure which will resolve redirected handler
      return function() {
        var runtimeHandler = handler;
        var runtimeArgs = Array.prototype.slice.call(arguments);
        var runtimeCtx = callbackContext || this;

        // Track previous handler to make usage error messages more useful.
        var prevHandler;

        // No more than 5 "redirects" allowed (prevents never-ending loop)
        var MAX_FORWARDS = 5;
        var numIterations = 0;
        do {
          prevHandler = runtimeHandler;
          runtimeHandler = Switchback[runtimeHandler];
          // console.log('redirecting '+name+' to "'+prevHandler +'"-- got ' + runtimeHandler);
          numIterations++;
        }
        while (_.isString(runtimeHandler) && numIterations <= MAX_FORWARDS);

        if (numIterations > MAX_FORWARDS) {
          throw new Error('Default handlers object (' + util.inspect(defaultHandlers) + ') has a cyclic redirect.');
        }

        // Redirects to unknown handler
        if (!_.isFunction(runtimeHandler)) {
          runtimeHandler = getWildcardCaseHandler(runtimeHandler, '`' + name + '` case triggered, but no handler was implemented.');
        }

        // Invoke final runtime function
        //
        // But first ensure at least a single cycle of the event loop has elapsed
        // since this switchback was instantiated
        if (atLeastOneTickHasElapsed) {
          runtimeHandler.apply(runtimeCtx, runtimeArgs);
        }
        // Otherwise wait until that happens and then invoke the runtime function
        else {
          setTimeout(function (){
            runtimeHandler.apply(runtimeCtx, runtimeArgs);
          }, 0);
        }

      };
    });
  }

  _.defaults(Switchback, defaultHandlers, {
    success: getWildcardCaseHandler('success', '`success` case triggered, but no handler was implemented.'),
    error: getWildcardCaseHandler('error', '`error` case triggered, but no handler was implemented.'),
    invalid: getWildcardCaseHandler('invalid', '`invalid` case triggered, but no handler was implemented.')
  });

  return Switchback;
};


/**
 * `isSwitchback`
 *
 * @param  {*}  something
 * @return {Boolean}           [whether `something` is a valid switchback instance]
 */
switchback.isSwitchback = function(something) {
  return _.isObject(something) && something[constants.telltale.key] === constants.telltale.value;
};


module.exports = switchback;
