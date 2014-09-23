/**
 * Module dependencies
 */
var fs = require('fs-extra'),
  path = require('path'),
  async = require('async'),
  _ = require('lodash'),
  reportback = require('reportback')();



/**
 * Generate a file using the specified string.
 *
 * @option {String} rootPath
 * @option {String} contents - the string contents to write to disk
 * [@option {Boolean} force=false]
 * [@option {Boolean} dry=false]
 *
 * @sb success
 * @sb error
 * @sb invalid
 * @sb alreadyExists
 */
module.exports = function(options, sb) {

  // provide default values for switchback
  sb = reportback.extend(sb, {
    alreadyExists: 'error'
  });

  // Provide defaults and validate required options
  _.defaults(options, {
    force: false
  });
  var missingOpts = _.difference([
    'contents',
    'rootPath'
  ], Object.keys(options));
  if (missingOpts.length) return sb.invalid(missingOpts);

  // In case we ended up here w/ a relative path,
  // resolve it using the process's CWD
  var rootPath = path.resolve(process.cwd(), options.rootPath);
  // console.log('FileHelper trying to generate:',rootPath);

  // Only override an existing file if `options.force` is true
  fs.exists(rootPath, function(exists) {
    if (exists && !options.force) {
      return sb.alreadyExists('Something else already exists at ::' + rootPath);
    }

    // Don't actually write the file if this is a dry run.
    if (options.dry) return sb.success();

    async.series([

      function deleteExistingFileIfNecessary(cb) {
        if (!exists) return cb();
        return fs.remove(rootPath, cb);
      },
      function writeToDisk(cb) {
        fs.outputFile(rootPath, options.contents, cb);
      }
    ], sb);

  });

};
