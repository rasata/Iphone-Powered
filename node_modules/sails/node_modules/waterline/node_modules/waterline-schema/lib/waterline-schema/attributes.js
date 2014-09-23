
/**
 * Module dependencies
 */

var _ = require('lodash');
var utils = require('./utils');
var hop = utils.object.hasOwnProperty;

/**
 * Expose Attributes
 */

module.exports = Attributes;

/**
 * Build an Attributes Definition
 *
 * Takes a collection of attributes from a Waterline Collection
 * and builds up an initial schema by normalizing into a known format.
 *
 * @param {Array} collections
 * @param {Object} connections
 * @return {Object}
 * @api private
 */

function Attributes(collections, connections, defaults) {
  var self = this;

  this.attributes = {};

  // Ensure a value is set for connections
  connections = connections || {};

  collections.forEach(function (collection) {
    collection = self.normalize(collection.prototype, connections, defaults);
    var conns = _.cloneDeep(collection.connection);
    var attributes = _.cloneDeep(collection.attributes);

    self.stripFunctions(attributes);
    self.stripProperties(attributes);
    self.validatePropertyNames(attributes);

    self.attributes[collection.identity.toLowerCase()] = {
      connection: conns,
      identity: collection.identity.toLowerCase(),
      tableName: collection.tableName || collection.identity,
      attributes: attributes
    };
  });

  return this.attributes;

}

/**
 * Normalize attributes for a collection into a known format.
 *
 * @param {Object} collection
 * @param {Object} connections
 * @return {Object}
 * @api private
 */

Attributes.prototype.normalize = function(collection, connections, defaults) {

  this.normalizeIdentity(collection);
  this.setDefaults(collection, defaults);
  this.autoAttributes(collection, connections);

  return collection;

};

/**
 * Set Default Values for the collection.
 *
 * Adds flags to the collection to determine if timestamps and a primary key
 * should be added to the collection's schema.
 *
 * @param {Object} collection
 * @api private
 */

Attributes.prototype.setDefaults = function(collection, defaults) {

  // Ensure defaults is always set to something
  defaults = defaults || {};

  if(!hop(collection, 'connection')) {
    collection.connection = '';
  }

  if(!hop(collection, 'attributes')) {
    collection.attributes = {};
  }

  var defaultSettings = {
    autoPK: true,
    autoCreatedAt: true,
    autoUpdatedAt: true
  };

  // Override default settings with user defined defaults
  if(hop(defaults, 'autoPK')) defaultSettings.autoPK = defaults.autoPK;
  if(hop(defaults, 'autoCreatedAt')) defaultSettings.autoCreatedAt = defaults.autoCreatedAt;
  if(hop(defaults, 'autoUpdatedAt')) defaultSettings.autoUpdatedAt = defaults.autoUpdatedAt;

  // Override defaults with collection defined values
  if(hop(collection, 'autoPK')) defaultSettings.autoPK = collection.autoPK;
  if(hop(collection, 'autoCreatedAt')) defaultSettings.autoCreatedAt = collection.autoCreatedAt;
  if(hop(collection, 'autoUpdatedAt')) defaultSettings.autoUpdatedAt = collection.autoUpdatedAt;

  var flags = {
    autoPK: defaultSettings.autoPK,
    autoCreatedAt: defaultSettings.autoCreatedAt,
    autoUpdatedAt: defaultSettings.autoUpdatedAt
  };

  for(var flag in flags) {
    collection[flag] = flags[flag];
  }

};

/**
 * Normalize identity
 *
 * @param {Object} collection
 * @api private
 */

Attributes.prototype.normalizeIdentity = function(collection) {

  if(hop(collection, 'tableName') && !hop(collection, 'identity')) {
    collection.identity = collection.tableName.toLowerCase();
  }

  // Require an identity so the object key can be set
  if(!hop(collection, 'identity')) {
    throw new Error('A Collection must include an identity or tableName attribute');
  }

};

/**
 * Add Auto Attribute definitions to the schema if they are not defined.
 *
 * Adds in things such as an Id primary key and timestamps unless they have been
 * disabled in the collection.
 *
 * @param {Object} collection
 * @param {Object} connections
 * @api private
 */

Attributes.prototype.autoAttributes = function(collection, connections) {

  var attributes = collection.attributes;
  var pk = false;
  var mainConnection;

  // Check to make sure another property hasn't set itself as a primary key
  for(var key in attributes) {
    if(hop(attributes[key], 'primaryKey')) pk = true;
  }

  // If a primary key was manually defined, turn off autoPK
  if(pk) collection.autoPK = false;

  // Add a primary key attribute
  if(!pk && collection.autoPK && !attributes.id) {
    attributes.id = {
      type: 'integer',
      autoIncrement: true,
      primaryKey: true,
      unique: true
    };

    // Check if the adapter used in the collection specifies the primary key format
    if(Array.isArray(collection.connection)) {
      mainConnection = collection.connection[0];
    }
    else {
      mainConnection = collection.connection;
    }

    if(hop(connections, mainConnection)) {
      var connection = connections[mainConnection];
      if(hop(connection._adapter, 'pkFormat')) {
        attributes.id.type = connection._adapter.pkFormat;
      }
    }
  }

  // Extend definition with autoUpdatedAt and autoCreatedAt timestamps
  var now = {
    type: 'datetime',
    'default': 'NOW'
  };

  if(collection.autoCreatedAt && !attributes.createdAt) {
    attributes.createdAt = now;
  }

  if(collection.autoUpdatedAt && !attributes.updatedAt) {
    attributes.updatedAt = now;
  }

};

/**
 * Strip Functions From Schema
 *
 * @param {Object} attributes
 * @api private
 */

Attributes.prototype.stripFunctions = function(attributes) {

  for(var attribute in attributes) {
    if(typeof attributes[attribute] === 'function') delete attributes[attribute];
  }

};

/**
 * Strip Non-Reserved Properties
 *
 * @param {Object} attributes
 * @api private
 */

Attributes.prototype.stripProperties = function(attributes) {

  for(var attribute in attributes) {
    this.stripProperty(attributes[attribute]);
  }

};

/**
 * Strip Property that isn't in the reserved words list.
 *
 * @param {Object}
 * @api private
 */

Attributes.prototype.stripProperty = function(properties) {

  for(var prop in properties) {
    if(utils.reservedWords.indexOf(prop) > -1) continue;
    delete properties[prop];
  }

};

/**
 * Validates property names to ensure they are valid.
 *
 * @param {Object}
 * @api private
 */

Attributes.prototype.validatePropertyNames = function(attributes) {

  for(var attribute in attributes) {

    // Check for dots in name
    if(attribute.match(/\./g)) {
      var error = 'Invalid Attribute Name: Attributes may not contain a "."" character';
      throw new Error(error);
    }

  }

};
