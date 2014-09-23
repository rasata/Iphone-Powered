/**
 * Module dependencies
 */

var _ = require('lodash')
  , util = require('util');


/**
 * Apply a `limit` modifier to `data` using `limit`.
 *
 * @param  { Object[] }  data
 * @param  { Integer }    limit
 * @return { Object[] }
 */
module.exports = function (data, limit) {
  if( limit === undefined || !data ) return data;
  if( limit === 0 ) return null;
  return _.first(data, limit);
};
