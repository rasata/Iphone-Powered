var ForeignKeys = require('../lib/waterline-schema/foreignKeys'),
    assert = require('assert');

describe('ForeignKeys', function() {

  describe('with automatic column names', function() {
    var collections = {};

    before(function() {
      collections.foo = {
        attributes: {
          id: {
            type: 'integer',
            autoIncrement: true,
            primaryKey: true,
            unique: true
          }
        }
      };

      collections.bar = {
        attributes: {
          foo: { model: 'foo' }
        }
      };
    });

    /**
     * Test that a foreign key gets built for the bar table in the following structure:
     *
     * attributes: {
     *   foo: {
     *     columnName: 'foo',
     *     type: 'integer',
     *     foreignKey: true,
     *     references: 'foo',
     *     on: 'id'
     *   }
     * }
     */

    it('should add a foreign key mapping to the bar collection', function() {
      var obj = new ForeignKeys(collections);
      assert(obj.bar.attributes.foo);
      assert(obj.bar.attributes.foo.columnName === 'foo');
      assert(obj.bar.attributes.foo.foreignKey === true);
      assert(obj.bar.attributes.foo.references === 'foo');
      assert(obj.bar.attributes.foo.on === 'id');
    });
  });

  describe('with custom column names', function() {
    var collections = {};

    before(function() {
      collections.foo = {
        attributes: {
          id: {
            type: 'integer',
            autoIncrement: true,
            primaryKey: true,
            unique: true
          }
        }
      };

      collections.bar = {
        attributes: {
          foo: {
            columnName: 'xyz_foo_id',
            model: 'foo'
          }
        }
      };
    });

    /**
     * Test that a foreign key gets built for the bar table in the following structure:
     *
     * attributes: {
     *   foo: {
     *     columnName: 'xyz_foo_id',
     *     type: 'integer',
     *     foreignKey: true,
     *     references: 'foo',
     *     on: 'id'
     *   }
     * }
     */

    it('should add a foreign key mapping to the custom column name', function() {
      var obj = new ForeignKeys(collections);
      assert(obj.bar.attributes.foo);
      assert(obj.bar.attributes.foo.columnName === 'xyz_foo_id');
      assert(obj.bar.attributes.foo.foreignKey === true);
      assert(obj.bar.attributes.foo.references === 'foo');
      assert(obj.bar.attributes.foo.on === 'id');
    });
  });

  describe('with custom primary key', function() {
    var collections = {};

    before(function() {
      collections.foo = {
        attributes: {
          uuid: {
            type: 'string',
            primaryKey: true
          }
        }
      };

      collections.bar = {
        attributes: {
          foo: { model: 'foo' }
        }
      };
    });

    /**
     * Test that a foreign key gets built for the bar table in the following structure:
     *
     * attributes: {
     *   foo: {
     *     columnName: 'foo_uuid',
     *     type: 'integer',
     *     foreignKey: true,
     *     references: 'foo',
     *     on: 'id'
     *   }
     * }
     */

    it('should add a foreign key mapping to the custom column name', function() {
      var obj = new ForeignKeys(collections);
      assert(obj.bar.attributes.foo);

      assert(obj.bar.attributes.foo.columnName === 'foo');
      assert(obj.bar.attributes.foo.foreignKey === true);
      assert(obj.bar.attributes.foo.references === 'foo');
      assert(obj.bar.attributes.foo.on === 'uuid');
    });
  });
});
