/**
 * Module dependencies
 */

var _ = require('lodash')
  , util = require('util');


/**
 * Project `tuples` on `fields`.
 * 
 * @param  { Object[] }  tuples    [i.e. filteredData]
 * @param  { String[]/Object{} }  fields    [i.e. schema]
 * @return { Object[] }
 */
function select (tuples, fields) {

  // If `fields` are not an Object or Array, don't modify the output.
  if (typeof fields !== 'object') return tuples;

  // If `fields` are specified as an Array, convert them to an Object.
  if (_.isArray(fields)) {
    fields = _.reduce(fields, function arrayToObj(memo, attrName) {
      memo[attrName] = true;
      return memo;
    }, {});
  }


  // Finally, select fields from tuples.
  return _.map(tuples, function (tuple) {

    // Select the requested attributes of the tuple
    tuple = _.pick(tuple, Object.keys(fields));

    // Take recursive step if necessary to support nested
    // SELECT clauses (NOT nested modifiers- more like nested
    // WHEREs)
    // 
    // e.g.:
    // like this:
    //   -> { select: { pet: { collarSize: true } } }
    //   
    // not this:
    //   -> { select: { pet: { select: { collarSize: true } } } }
    //   
    _.each(fields, function (subselect, attrName) {

      if (typeof subselect === 'object') {
        if (_.isArray(tuple[attrName])) {
          tuple[attrName] = select(tuple[attrName], subselect);
        }
        else if (_.isObject(tuple[attrName])) {
          tuple[attrName] = select([tuple[attrName]], subselect)[0];
        }
      }
    });

    return tuple;
  });
}

module.exports = select;
