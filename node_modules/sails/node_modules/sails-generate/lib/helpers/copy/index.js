/**
 * Module dependencies
 */
var _ = require('lodash'),
  fsx = require('fs-extra'),
  path = require('path'),
  reportback = require('reportback')(),
  FileHelper = require('../file');


/**
 * Copy file from one place to another.
 *
 * @option {String}    rootPath
 * @option {String}    templatePath
 * @option {Boolean}   force[=false]
 *
 * @cb.success
 * @cb.error
 * @cb.alreadyExists
 * @cb.invalid
 */
module.exports = function(options, cb) {
  cb = reportback.extend(cb, {
    alreadyExists: 'error',
    invalid: 'error'
  });

  // Compute the canonical path to copy from
  // given its relative path from its source generator's
  // `templates` directory.
  var absSrcPath = path.resolve(options.templatesDirectory, options.templatePath);

  fsx.readFile(absSrcPath, function(err, contents) {
    if (err) return cb.error(err);
    return FileHelper(_.merge(options, {
      contents: contents
    }), cb);
  });
};
