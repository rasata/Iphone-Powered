/**
 * Module dependencies
 * @type {Object}
 */
var util = require('util');
var _ = require('lodash');
var path = require('path');
var async = require('async');
var report = require('reportback')();

var generate = require('./generate');
var FolderHelper = require('./helpers/folder');
var TemplateHelper = require('./helpers/template');
var JSONFileHelper = require('./helpers/jsonfile');
var CopyHelper = require('./helpers/copy');
var NOOP_GENERATOR = require('./rootGenerator');


/**
 * generateTarget()
 *
 * @param  {Object}   options
 */

function generateTarget(options, cb) {

  var sb = report.extend(cb);

  // Options
  var target = options.target;
  var scope = options.scope;
  var parentGenerator = options.parent;
  var recursiveGenerate = options.recursiveGenerate;


  var MAX_RESOLVES = 5,
    _resolves = 0;

  async.until(
    function checkIfTargetIsValidYet() {
      return isValidTarget(target) || (++_resolves > MAX_RESOLVES);
    },
    function tryToParseTarget(async_cb) {
      parseTarget(target, scope, function(err, resolvedTarget) {
        if (err) return async_cb(err);
        target = resolvedTarget;
        return async_cb();
      });
    },
    function afterwards(err) {
      if (err) return sb(err);
      if (!isValidTarget(target)) {
        return sb(new Error('Generator Error: Could not resolve target "' + scope.rootPath + '" (probably a recursive loop)'));
      }

      // Pass down parent Generator's template directory abs path
      scope.templatesDirectory = parentGenerator.templatesDirectory;

      // Interpret generator definition
      if (target.exec) {
        return target.exec(scope, sb);
      }
      if (target.copy) {
        scope = mergeSubtargetScope(scope, typeof target.copy === 'string' ? {
          templatePath: target.copy
        } : target.copy);
        return CopyHelper(scope, sb);
      }
      if (target.folder) {
        scope = mergeSubtargetScope(scope, target.folder);
        return FolderHelper(scope, sb);
      }
      if (target.template) {
        scope = mergeSubtargetScope(scope, typeof target.template === 'string' ? {
          templatePath: target.template
        } : target.template);

        return TemplateHelper(scope, sb);
      }
      if (target.jsonfile) {
        if (typeof target.jsonfile === 'object') {
          scope = mergeSubtargetScope(scope, target.jsonfile);
        } else if (typeof target.jsonfile === 'function') {
          scope = _.merge(scope, {
            data: target.jsonfile(scope)
          });
        }
        return JSONFileHelper(scope, sb);
      }

      // If we made it here, this must be a recursive generator:

      // Now that the generator definition has been resolved,
      // call this method recursively on it, passing along our
      // callback:
      if (++scope._depth > scope.maxHops) {
        return sb(new Error('`maxHops` (' + scope.maxHops + ' exceeded!  There is probably a recursive loop in one of your generators.'));
      }
      return recursiveGenerate(target, scope, sb);

    }
  ); //</ async.until >//
}

module.exports = generateTarget;



/**
 * @param  {[type]} scope     [description]
 * @param  {[type]} subtarget [description]
 * @return {[type]}           [description]
 */
function mergeSubtargetScope(scope, subtarget) {
  return _.merge(scope, _.isObject(subtarget) ? subtarget : {});
}


/**
 * Known helpers
 * @type {Array}
 */
var KNOWN_HELPERS = ['exec', 'folder', 'template', 'jsonfile', 'file', 'copy'];

function targetIsHelper(target) {
  return _.some(target, function(subTarget, key) {
    return _.contains(KNOWN_HELPERS, key);
  });
}


/**
 *
 * @param  {String|Object}   target      [description]
 * @param  {Object}          scope [description]
 * @param  {Function} cb          [description]
 * @return {[type]}               [description]
 */
function parseTarget(target, scope, cb) {

  if (typeof target === 'string') {
    target = {
      generator: target
    };
  }

  // Interpret generator definition
  if (targetIsHelper(target)) {
    return cb(null, target);
  }

  if (target.generator) {

    // Normalize the subgenerator reference
    var subGeneratorRef;
    if (typeof target.generator === 'string') {
      subGeneratorRef = {
        module: target.generator
      };
    } else if (typeof target.generator === 'object') {
      subGeneratorRef = target.generator;
    }
    if (!subGeneratorRef) {
      return cb(new Error('Generator Error: Invalid subgenerator referenced for target "' + scope.rootPath + '"'));
    }

    // Now normalize the sub-generator
    var subGenerator;

    // No `module` means we'll treat this subgenerator as an inline generator definition.
    if (!subGeneratorRef.module) {
      subGenerator = subGeneratorRef;
      if (subGenerator) return cb(null, subGenerator);
    }



    //
    // Otherwise, we'll attempt to load this subgenerator.
    //


    if (typeof subGeneratorRef.module === 'string') {
      // Lookup the generator by name if a `module` was specified
      // (this allows the module for a given generator to be
      //  overridden.)
      var configuredReference = scope.modules && scope.modules[subGeneratorRef.module];

      // Refers to a configured module (i.e. sailsrc or comparable)
      // so keep going.
      if (configuredReference) {
        return cb(null, configuredReference);
      }

      // If this generator type is explicitly set to `false`,
      // disable the generator.
      else if (configuredReference === false) {
        return cb(null, NOOP_GENERATOR);
      }

      // If `configuredReference` is undefined, continue on
      // and try to require the module.
      //
      // ||
      // \/
    }

    // At this point, subGeneratorRef.module should be a string,
    // and the best guess at the generator module we're going
    // to get.
    var module = subGeneratorRef.module;
    var requireError;

    // Try requiring it directly as a path
    try {
      subGenerator = require(module);
    } catch (e0) {
      requireError = e0;
    }

    // Try the scope's rootPath
    if (!subGenerator) {
      try {
        var asDependencyInRootPath = path.resolve(scope.rootPath, 'node_modules', module);
        subGenerator = require(asDependencyInRootPath);
      } catch (e1) {
        requireError = e1;
      }
    }

    // Try the current working directory
    if (!subGenerator) {
      try {
        subGenerator = require(path.resolve(process.cwd(), 'node_modules', module));
      } catch (e1) {
        requireError = e1;
      }
    }


    // If we couldn't find a generator using the configured module,
    // try requiring "sails-generate-<module>" to get the core generator
    if (!subGenerator && !module.match(/^sails-generate-/)) {
      try {
        subGenerator = require('sails-generate-' + module);
      }

      // Ok, we give up.
      catch (e1) {
        requireError = e1;
      }
    }


    // If we were able to find it, send it back!
    if (subGenerator) return cb(null, subGenerator);


    // But if we still can't find it, give up.

    // TODO: look for subGeneratorRef on npm
    // TODO: emit a message to scope.output letting user know what's going on
    return cb(
      new Error('Generator Error: Failed to load "' +
        subGeneratorRef.module + '"...' +
        (requireError ? ' (' + requireError + ')' : '') +
        ''));



  } //fi// target.generator


  return cb(new Error(
    'Unrecognized generator syntax in `targets["' + scope.keyPath + '"]` ::\n' +
    util.inspect(target)));
}



/**
 *
 * @param  {[type]}  target [description]
 * @return {Boolean}        [description]
 */
function isValidTarget(target) {
  var ok = true;

  ok = ok && typeof target === 'object';

  // Is using a helper
  // Or is another generator def.
  ok = ok && (targetIsHelper(target) || _.has(target, 'targets'));

  return ok;
}
