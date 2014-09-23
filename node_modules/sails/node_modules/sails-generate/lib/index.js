/**
 * Module dependencies
 */

var generate = require('./generate');
var path = require('path');
var reportback = require('reportback')();



/**
 * Generate module(s)
 *
 * @param  {Object}   scope [description]
 * @param  {Function} cb    [description]
 * @return {[type]}         [description]
 */
module.exports = function(scope, cb) {
  cb = cb || {};
  cb = reportback.extend(cb, {
    error: cb.error,
    invalid: cb.invalid,
    success: function(output) {
      cb.log.info('ok!');
    },
    notSailsApp: function() {
      cb.log.error('Not a sails app.');
    },
    alreadyExists: function() {
      return cb.error();
    }
  });

  if (!scope.generatorType) {
    return cb.error('Sorry, `scope.generatorType` must be defined.');
  }

  // Use configured module name for this generatorType if applicable.
  var module =
    (scope.modules && scope.modules[scope.generatorType]) ||
    'sails-generate-' + scope.generatorType;

  var Generator;
  var requirePath;
  var requireError;

  function throwIfModuleNotFoundError (e, module) {
    var isModuleNotFoundError = e && e.code === 'MODULE_NOT_FOUND' && e.message.match(new RegExp(module));
    if (!isModuleNotFoundError) {
      cb.log.error('Error in "'+scope.generatorType+'" generator (loaded from '+module+')');
      throw e;
    }
    else return e;
  }


  // Allow `scope.generator` to be specified as an inline generator
  // ... todo ...

  // Try requiring from node_modules
  try {
    Generator = require(module);
  } catch (e) {
    requireError = throwIfModuleNotFoundError(e, module);
  }

  // Try requiring it directly as a path resolved from process.cwd()
  if (!Generator) {
    try {
      requirePath = path.resolve(process.cwd(), module);
      Generator = require(requirePath);
    } catch (e) {
      requireError = throwIfModuleNotFoundError(e, module);
    }
  }


  // Try requiring the generator from the rootPath
  if (!Generator) {
    try {
      requirePath = path.resolve(scope.rootPath, 'node_modules', module);
      Generator = require(requirePath);
    } catch (e) {
      requireError = throwIfModuleNotFoundError(e, module);
    }
  }

  // If that doesn't work, try `require()`ing it from console user's cwd
  if (!Generator) {
    try {
      requirePath = path.resolve(process.cwd(), 'node_modules', module);
      Generator = require(requirePath);
    } catch (e) {
      requireError = throwIfModuleNotFoundError(e, module);
    }
  }

  // Finally, try to load the generator module from sails-generate's dependencies
  if (!Generator) {
    try {
      Generator = require(path.resolve(scope.rootPath || process.cwd(), module));
    } catch (e) {
      requireError = throwIfModuleNotFoundError(e, module);
    }
  }


  if (!Generator) {
    return cb.log.error("No generator called `" + scope.generatorType + "` found; perhaps you meant `sails generate api " + scope.generatorType + "`?");
  }

  generate(Generator, scope, cb);

};
