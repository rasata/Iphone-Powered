/**
 * Module dependencies
 */
var fs = require('fs-extra');
var _ = require('lodash');
var path = require('path');
var async = require('async');
var reportback = require('reportback')();
var FileHelper = require('../file');



/**
 * Read an `ejs` template, compile it using scope.
 * Then use `file` helper to write it to its destination.
 *
 * @option {String}    rootPath
 * @option {String}    templatePath
 * @option {Boolean}   force[=false]
 * @option {Boolean}   escapeHTMLEntities[=false]
 *
 * @sb.success
 * @sb.error
 * @sb.alreadyExists
 * @sb.noTemplate
 */

module.exports = function(options, sb) {
  sb = reportback.extend(sb, {
    noTemplate: 'error',
    alreadyExists: 'error'
  });

  // console.log('In templatehelper for :',options.rootPath);


  // Compute the canonical path to a template
  // given its relative path from its source generator's
  // `templates` directory.
  var absTemplatePath = path.resolve(options.templatesDirectory, options.templatePath);

  fs.readFile(absTemplatePath, 'utf8', function(err, contents) {
    if (err) {
      err = err instanceof Error ? err : new Error(err);
      err.message = 'Template error: ' + err.message;
      err.path = absTemplatePath;
      if (err.code === 'ENOENT') {
        return sb.noTemplate(err);
      } else return sb(err);
    }
    try {
      contents = _.template(contents, options);

      // With lodash teplates, HTML entities are escaped by default.
      // Default assumption is we DON'T want that, so we'll reverse it.
      if (!options.escapeHTMLEntities) {
        contents = _.unescape(contents);
      }
    } catch (e) {
      return sb(e);
    }

    return FileHelper(_.merge(options, {
      contents: contents
    }), sb);
  });
};
