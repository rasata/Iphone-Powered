/**
 * Module dependencies
 */

var util = require('util'),
  _ = require('lodash'),
  fs = require('fs'),
  path = require('path');

// Make _.defaults recursive
_.defaults = require('merge-defaults');
_.str = require('underscore.string');


// Fetch stub attribute template on initial load.
var ATTRIBUTE_TEMPLATE = path.resolve(__dirname, '../templates/attribute.template');
ATTRIBUTE_TEMPLATE = fs.readFileSync(ATTRIBUTE_TEMPLATE, 'utf8');



/**
 * This `before` function is run before generating targets.
 * Validate, configure defaults, get extra dependencies, etc.
 *
 * @param  {Object} scope
 * @param  {Function} cb    [callback]
 */

module.exports = function(scope, cb) {

  // scope.args are the raw command line arguments.
  //
  // e.g. if you run:
  // sails generate controlller user find create update
  // then:
  // scope.args = ['user', 'find', 'create', 'update']
  //
  _.defaults(scope, {
    id: _.str.capitalize(scope.args[0]),
    attributes: scope.args.slice(1)
  });

  if (!scope.rootPath) {
    return cb.invalid('Usage: sails generate model <modelname> [attribute|attribute:type ...]');
  }
  if (!scope.id) {
    return cb.invalid('Usage: sails generate model <modelname> [attribute|attribute:type ...]');
  }


  // Validate optional attribute arguments
  var attributes = scope.attributes;
  var invalidAttributes = [];
  attributes = _.map(attributes, function(attribute, i) {

    var parts = attribute.split(':');

    if (parts[1] === undefined) parts[1] = 'string';

    // Handle invalidAttributes
    if (!parts[1] || !parts[0]) {
      invalidAttributes.push(
        'Invalid attribute notation:   "' + attribute + '"');
      return;
    }
    return {
      name: parts[0],
      type: parts[1]
    };

  });

  // Handle invalid action arguments
  // Send back invalidActions
  if (invalidAttributes.length) {
    return cb.invalid(invalidAttributes);
  }

  // Make sure there aren't duplicates
  if ((_.uniq(attributes)).length !== attributes.length) {
    return cb.invalid('Duplicate attributes not allowed!');
  }

  //
  // Determine default values based on the
  // available scope.
  //
  _.defaults(scope, {
    globalID: _.str.capitalize(scope.id),
    ext: (scope.coffee) ? '.coffee' : '.js',
    attributes: []
  });

  // Take another pass to take advantage of
  // the defaults absorbed in previous passes.
  _.defaults(scope, {
    rootPath: scope.rootPath,
    filename: scope.globalID + scope.ext,
    lang: scope.coffee ? 'coffee' : 'js',
    destDir: 'api/models/'
  });



  //
  // Transforms
  //


  // Render some stringified code from the action template
  // and make it available in our scope for use later on.
  scope.attributes = _.map(attributes, function(attribute) {

    return _.str.rtrim(
      _.unescape(
        _.template(ATTRIBUTE_TEMPLATE, {
          name: attribute.name,
          type: attribute.type,
          lang: scope.coffee ? 'coffee' : 'js'
        })
      )
    );
  }).join((scope.coffee) ? '\n' : ',\n');


  // Trigger callback with no error to proceed.
  return cb.success();
};