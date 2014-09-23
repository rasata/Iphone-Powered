/**
 * Module dependencies
 */

var _ = require('lodash');
var util = require('util');
var path = require('path');


module.exports = _.extend(

  // Provide all-in-one top-level function
  require('./query'),

  // but also expose direct access
  // to all filters and projections.
  {
    where: require('./filters/where'),
    limit: require('./filters/limit'),
    skip: require('./filters/skip'),
    sort: require('./sort'),

    // Projections and aggregations are not-yet-officially supported:
    groupBy: require('./projections/groupBy'),
    select: require('./projections/select')

    // Joins are currently supported by Waterline core:
    // , populate : require('./projections/populate')
    // , leftJoin : require('./projections/leftJoin')
    // , join     : require('./projections/join')
    // , rightJoin : require('./projections/rightJoin')

  });



/**
 * Load CommonJS submodules from the specified
 * relative path.
 *
 * @return {Object}
 */
function loadSubModules(relPath) {
  return require('include-all')({
    dirname: path.resolve(__dirname, relPath),
    filter: /(.+)\.js$/
  });
}
