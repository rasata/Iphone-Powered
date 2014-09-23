

/**
 * Contains a list of reserved words. All others should be stripped from
 * a schema when building.
 */

exports.reservedWords = [
  'defaultsTo',
  'primaryKey',
  'autoIncrement',
  'unique',
  'index',
  'columnName',
  'foreignKey',
  'references',
  'on',
  'through',
  'groupKey',
  'required',
  'default',
  'type',
  'collection',
  'model',
  'via',
  'dominant'
];

/**
 * ignore
 */

exports.object = {};

/**
 * Safer helper for hasOwnProperty checks
 *
 * @param {Object} obj
 * @param {String} prop
 * @return {Boolean}
 * @api public
 */

var hop = Object.prototype.hasOwnProperty;
exports.object.hasOwnProperty = function(obj, prop) {
  return hop.call(obj, prop);
};
