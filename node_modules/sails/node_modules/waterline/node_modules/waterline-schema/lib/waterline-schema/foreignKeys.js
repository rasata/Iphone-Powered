
/**
 * Module Dependencies
 */

var _ = require('lodash');
var utils = require('./utils');
var hop = utils.object.hasOwnProperty;

/**
 * Expose Foreign Keys
 */

module.exports = ForeignKeys;

/**
 * Adds Foreign keys to a Collection where needed for belongsTo associations.
 *
 * @param {Object} collections
 * @return {Object}
 * @api private
 */

function ForeignKeys(collections) {

  collections = collections || {};
  this.collections = _.clone(collections);

  for(var collection in collections) {
    this.replaceKeys(collections[collection].attributes);
  }

  return collections;

}

/**
 * Replace Model Association with a foreign key attribute
 *
 * @param {Object} attributes
 * @api private
 */

ForeignKeys.prototype.replaceKeys = function(attributes) {

  for(var attribute in attributes) {

    // We only care about adding foreign key values to attributes
    // with a `model` key
    if(!hop(attributes[attribute], 'model')) continue;

    var modelName = attributes[attribute].model.toLowerCase();
    var primaryKey = this.findPrimaryKey(modelName);
    var columnName = this.buildColumnName(attribute, attributes[attribute]);
    var foreignKey = {
      columnName: columnName,
      type: primaryKey.attributes.type,
      foreignKey: true,
      references: modelName,
      on: primaryKey.attributes.columnName || primaryKey.name,
      onKey: primaryKey.name
    };

    // Remove the attribute and replace it with the foreign key
    delete attributes[attribute];
    attributes[attribute] = foreignKey;
  }

};

/**
 * Find a collection's primary key attribute
 *
 * @param {String} collection
 * @return {Object}
 * @api private
 */

ForeignKeys.prototype.findPrimaryKey = function(collection) {

  if(!this.collections[collection]) {
    throw new Error('Trying to access a collection ' + collection + ' that is not defined.');
  }

  if(!this.collections[collection].attributes) {
    throw new Error('Collection, ' + collection + ', has no attributes defined.');
  }

  var primaryKey = null;

  for(var key in this.collections[collection].attributes) {
    var attribute = this.collections[collection].attributes[key];

    if(!hop(attribute, 'primaryKey')) continue;

    primaryKey = {
      name: key,
      attributes: attribute
    };
  }

  if(!primaryKey) {
    var error = 'Trying to create an association on a model that doesn\'t have a Primary Key.';
    throw new Error(error);
  }

  return primaryKey;

};

/**
 * Build A Column Name
 *
 * Uses either the attributes defined columnName or the user defined attribute name
 *
 * @param {String} key
 * @param {Object} attribute
 * @param {Object} primaryKey
 * @return {String}
 * @api private
 */

ForeignKeys.prototype.buildColumnName = function(key, attribute) {

  if(hop(attribute, 'columnName')) return attribute.columnName;
  return key;

};
