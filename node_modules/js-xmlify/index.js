var _ = require('lodash');
_.str = require('underscore.string');



var localname = function(qName) {
  return qName.split(':').slice(-1)[0];
};



var prerender = function(data, config) {
  var c = config || {};

  c.replaceSpecialChars = c.replaceSpecialChars || true;
  c.wrapArrays = c.wrapArrays || true;

  _.each(data, function(value, key, list) {
    // value modifications
    if (c.transformValue) {
      list[key] = c.transformValue(key, value);
    }

    if (!_.isString(value)) {
      // wrap arrays
      if (c.wrapArrays && _.isArray(value) && !_.isEmpty(value)) {
        list[key] = { list: { item: value } };
      }

      prerender(value, config);
    }

    // key modifications
    if (c.transformKey) {
      var newKey = c.transformKey(key, value);

      if (key !== newKey) {
        list[newKey] = list[key];
        delete list[key];
      }
    }

    if (!_.isNumber(key)) {
      // replace special characters
      if (c.replaceSpecialChars) {
        var newKey = key.replace(/[^a-zA-Z0-9]/g, '_');

        if (_.str.startsWith(newKey, '_')) newKey = 'e' + newKey;

        if (key !== newKey) {
          list[newKey] = list[key];
          delete list[key];
        }
      }
    }
  });
};



var postparse = function(data, config) {
  var c = config || {};

  c.removeNamespaceMeta = c.removeNamespaceMeta || true;
  c.removeSchemaLocation = c.removeSchemaLocation || true;
  c.preferLocalName = c.preferLocalName || true;

  _.each(data, function(value, key, list) {
    // value modifications
    if (c.transformValue) {
      list[key] = c.transformValue(value);
    }

    if (!_.isString(value)) postparse(value, config);

    // key modifications
    if (c.transformKey) {
      var newKey = c.transformKey(key);

      if (key !== newKey) {
        list[newKey] = list[key];
        delete list[key];
      }
    }

    if (!_.isNumber(key)) {
      // remove namespace metadata
      if (c.removeNamespaceMeta &&
           (_.str.startsWith(key, 'xmlns') ||
            _.str.endsWith(key, 'targetNamespace'))) {
        delete list[key];
        return;
      }

      // remove schema location attributes
      if (c.removeSchemaLocation && _.str.endsWith(key, 'schemaLocation')) {
        delete list[key];
        return;
      }

      // convert qnames to local names
      if (c.preferLocalName) {
        var newKey = localname(key);

        if (newKey !== key) {
          list[newKey] = list[key];
          delete list[key];
        }
      }
    }
  });
};



module.exports = {
  localname: localname,
  prerender: prerender,
  postparse: postparse
};
