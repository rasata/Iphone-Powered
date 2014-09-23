var Attributes = require('../lib/waterline-schema/attributes'),
    assert = require('assert');

describe('Attributes', function() {

  describe('with automatic attribute flags', function() {
    var collection;

    before(function() {
      collection = function() {};
      collection.prototype = {
        tableName: 'FOO',
        autoPK: false,
        autoCreatedAt: false,
        autoUpdatedAt: false,
        attributes: {
          foo: 'string',
          bar: 'string',
          fn: function() {}
        }
      };
    });

    it('should build an attributes definition containing two keys', function() {
      var obj = new Attributes([collection]);

      assert(obj.foo);
      assert(Object.keys(obj.foo.attributes).length === 2);
      assert(obj.foo.attributes.foo);
      assert(obj.foo.attributes.bar);
    });

    it('should strip functions', function() {
      var obj = new Attributes([collection]);
      assert(!obj.foo.attributes.fn);
    });

    it('should set defaults for adapters', function() {
      var obj = new Attributes([collection]);
      assert(obj.foo.connection === '');
    });
  });


  describe('with automatic attribute flags not set', function() {
    var collectionFn;

    before(function() {
      collectionFn = function() {
        var collection = function() {};
        collection.prototype = {
          tableName: 'FOO',
          attributes: {
            foo: 'string',
            bar: 'string',
            fn: function() {}
          }
        };

        return collection;
      };
    });

    it('should add auto attributes to the definition', function() {
      var coll = collectionFn();
      var obj = new Attributes([coll]);
      assert(obj.foo);
      assert(Object.keys(obj.foo.attributes).length === 5);
      assert(obj.foo.attributes.foo);
      assert(obj.foo.attributes.bar);
      assert(obj.foo.attributes.id);
      assert(obj.foo.attributes.createdAt);
      assert(obj.foo.attributes.updatedAt);
    });

    it('should inject flags into the collection', function() {
      var coll = collectionFn();
      var obj = new Attributes([coll]);

      assert(coll.prototype.autoPK);
      assert(coll.prototype.autoCreatedAt);
      assert(coll.prototype.autoUpdatedAt);
    });

    it('should normalize tableName to identity', function() {
      var coll = collectionFn();
      var obj = new Attributes([coll]);
      assert(coll.prototype.identity === 'foo');
    });

    it('should add a primary key field', function() {
      var coll = collectionFn();
      var obj = new Attributes([coll]);
      assert(obj.foo.attributes.id);
      assert(obj.foo.attributes.id.primaryKey);
      assert(obj.foo.attributes.id.unique);
    });

    it('should add in timestamps', function() {
      var coll = collectionFn();
      var obj = new Attributes([coll]);
      assert(obj.foo.attributes.createdAt);
      assert(obj.foo.attributes.updatedAt);
    });
  });

  describe('with invalid attribute name', function() {
    var collection;

    before(function() {
      collection = function() {};
      collection.prototype = {
        tableName: 'FOO',
        attributes: {
          foo: 'string',
          'foo.bar': 'string'
        }
      };
    });

    it('should error with message', function() {
      assert.throws(
        function() {
          new Attributes([collection]);
        }
      );
    });

  });

});
