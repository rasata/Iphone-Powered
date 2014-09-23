/**
 * Module dependencies
 */

var _ = require('lodash');
var util = require('util');
var X_ISO_DATE = require('./X_ISO_DATE.constant');



/**
 * Sort the tuples in `data` using `comparator`.
 *
 * @param  { Object[] }  data
 * @param  { Object }    comparator
 * @param  { Function }    when
 * @return { Object[] }
 */
module.exports = function(data, comparator, when) {
  if (!comparator || !data) return data;

  // Equivalent to a SQL "WHEN"
  when = when||function rankSpecialCase (record, attrName) {

    // null ranks lower than anything else
    if ( typeof record[attrName]==='undefined' || record[attrName] === null ) {
      return false;
    }
    else return true;
  };

  return sortData(_.cloneDeep(data), comparator, when);
};



//////////////////////////
///
/// private methods   ||
///                   \/
///                   
//////////////////////////






/**
 * Sort `data` (tuples) using `sortVector` (comparator obj)
 *
 * Based on method described here:
 * http://stackoverflow.com/a/4760279/909625
 *
 * @param  { Object[] } data         [tuples]
 * @param  { Object }   sortVector [mongo-style comparator object]
 * @return { Object[] }
 */

function sortData(data, sortVector, when) {

  // Constants
  var GREATER_THAN = 1;
  var LESS_THAN = -1;
  var EQUAL = 0;
  
  return data.sort(function comparator(a, b) {
    return _(sortVector).reduce(function (flagSoFar, sortDirection, attrName){


      var outcome;

      // Handle special cases (defined by WHEN):
      var $a = when(a, attrName);
      var $b = when(b, attrName);
      if (!$a && !$b) outcome = EQUAL;
      else if (!$a && $b) outcome = LESS_THAN;
      else if ($a && !$b) outcome = GREATER_THAN;

      // General case:
      else {
        // Coerce types
        $a = a[attrName];
        $b = b[attrName];
        if ( $a < $b ) outcome = LESS_THAN;
        else if ( $a > $b ) outcome = GREATER_THAN;
        else outcome = EQUAL;
      }

      // Less-Than case (-1)
      // (leaves flagSoFar untouched if it has been set, otherwise sets it)
      if ( outcome === LESS_THAN ) {
        return flagSoFar || -sortDirection;
      }
      // Greater-Than case (1)
      // (leaves flagSoFar untouched if it has been set, otherwise sets it)
      else if ( outcome === GREATER_THAN ) {
        return flagSoFar || sortDirection;
      }
      // Equals case (0)
      // (always leaves flagSoFar untouched)
      else return flagSoFar;

    }, 0);
  });
}






/**
 * Coerce a value to its probable intended type for sorting.
 * 
 * @param  {???} x
 * @return {???}
 */
function coerceIntoBestGuessType (x) {
  switch ( guessType(x) ) {
    case 'booleanish': return (x==='true')?true:false;
    case 'numberish': return +x;
    case 'dateish': return new Date(x);
    default: return x;
  }
}


function guessType (x) {

  if (!_.isString(x)) {
    return typeof x;
  }

  // Probably meant to be a boolean
  else if (x === 'true' || x === 'false') {
    return 'booleanish';
  }

  // Probably meant to be a number
  else if (+x === x) {
    return 'numberish';
  }

  // Probably meant to be a date
  else if (x.match(X_ISO_DATE)) {
    return 'dateish';
  }

  // Just another string
  else return typeof x;
}
