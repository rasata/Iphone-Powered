/**
 * Module dependencies
 */

var util = require('util');
var _ = require('lodash');
_.defaults = require('merge-defaults');
var async = require('async');
var path = require('path');
var reportback = require('reportback')();
var pathRegexp = require('./util').pathRegexp;
var rootGenerator = require('./rootGenerator');
var rootScope = require('./rootScope');
var generateTarget = require('./target');



/**
 * Run a generator given an existing scope.
 *
 * @param  {Object} Generator
 * @param  {Object} scope
 * @param  {Switchback} cb
 */

function generate(Generator, scope, cb) {

  var sb = reportback.extend(cb, {
    error: cb.error,
    invalid: cb.invalid,
    alreadyExists: 'error'
  });

  // Merge with root scope
  _.defaults(scope, rootScope);

  // TODO: validate args more thoroughly
  if (!_.isArray(scope.args)) {
    return sb(new Error('Invalid `scope.args` passed to generator: ' + util.inspect(scope.args)));
  }

  // Ensure that `rootPath` exists
  // TODO: Ensure that `rootPath` is reasonable
  // (i.e. within highest acceptable path-- prevents accidental smashing of file-system, etc.)
  if (!scope.rootPath) {
    return sb(new Error('Invalid `scope.rootPath` passed to generator: ' + util.inspect(scope.rootPath)));
  }

  // TODO: deprecate this:
  //
  // Alias first handful of arguments on scope object
  // for easy access and use as :params in `targets` keys
  // _.defaults(scope, {
  // 	arg0: scope.args[0],
  // 	arg1: scope.args[1],
  // 	arg2: scope.args[2],
  // 	arg3: scope.args[3]
  // });

  // Resolve string shorthand for generator defs
  // to `{ generator: 'originalDef' }`
  if (typeof Generator === 'string') {
    var generatorName = Generator;
    Generator = {
      generator: generatorName
    };
  }

  // Merge with root generator
  _.defaults(Generator, rootGenerator);

  // Run the generator's `before()` method proceeding
  Generator.before(scope, reportback.extend({
    error: sb.error,
    invalid: sb.invalid,
    success: function() {

      // Emit output
      sb.log.verbose('Generating ' + util.inspect(Generator) + ' at ' + scope.rootPath + '...');

      // Process all of the generator's targets concurrently
      async.each(Object.keys(Generator.targets), function(keyPath, async_each_cb) {
          var async_each_sb = reportback.extend(async_each_cb);


          // Create a new scope object for this target,
          // with references to the important bits of the original.
          // (depth will be passed-by-value, but that's what we want)
          //
          // Then generate the target, passing along a reference to
          // the base `generate` method to allow for recursive generators.
          var target = Generator.targets[keyPath];
          if (!target) return async_each_sb(new Error('Generator error: Invalid target: {"' + keyPath + '": ' + util.inspect(target) + '}'));

          // Input tolerance
          if (keyPath === '') keyPath = '.';

          // Interpret `keyPath` using express's parameterized route conventions,
          // first parsing params, then replacing them with their proper values from scope.
          var params = [];
          pathRegexp(keyPath, params);
          var err;
          var parsedKeyPath = _.reduce(params, function(memoKeyPath, param, i) {
            if (err) return false;

            try {
              var paramMatchExpr = ':' + param.name;
              var actualParamValue = scope[param.name];
              if (!actualParamValue) {
                err = new Error(
                  'Generator error:\n' +
                  'A scope variable (`' + param.name + '`) was referenced in target: `' + memoKeyPath + '`,\n' +
                  'but `' + param.name + '` does not exist in the generator\'s scope.'
                );
                return false;
              }
              actualParamValue = String(actualParamValue);

              return memoKeyPath.replace(paramMatchExpr, actualParamValue);
            } catch (e) {
              err = new Error('Generator error: Could not parse target key: ' + memoKeyPath);
              err.message = e;
              return false;
            }
          }, keyPath);
          if (!parsedKeyPath) return async_each_sb(err);

          // Create path from `rootPath` to `keyPath` to use as the `rootPath`
          // for any generators or helpers in this target.
          // (use a copy so that child generators don't mutate the scope)
          var targetScope = _.merge({}, scope, {
            rootPath: path.resolve(scope.rootPath, parsedKeyPath),
            // Include reference to original keypath for error reporting
            keyPath: keyPath
          });



          // If `target` is an array, run each item
          if (_.isArray(target)) {
            async.eachSeries(target, function(targetItem, async_eachSeries_cb) {

              generateTarget({
                target: targetItem,
                parent: Generator,
                scope: _.cloneDeep(targetScope),
                recursiveGenerate: generate
              }, async_eachSeries_cb);

            }, async_each_sb);
            return;
          }

          // Otherwise, just run the single target generator/helper
          generateTarget({
            target: target,
            parent: Generator,
            scope: targetScope,
            recursiveGenerate: generate
          }, async_each_sb);

        }, // </async.each.iterator>

        function done(err) {

          // Expose a `error` handler in generators
          if (err) {
            var errorFn = Generator.error || function defaultError(err, scope, _cb) {
                return _cb(err);
              };
            return errorFn(err, scope, sb);
          }

          // Expose a `after` handler in generators (on success only)
          var afterFn = Generator.after || function defaultAfter(scope, _cb) {
              return _cb();
            };
          return afterFn(scope, sb);

        }); // </async.each>

    } // </Generator.before -> success>
  })); // </Generator.before>
}


module.exports = generate;
