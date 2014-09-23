var References = require('../lib/waterline-schema/references'),
    assert = require('assert');

describe('References', function() {

  describe('with automatic column name', function() {
    var collections = {};

    before(function() {

      collections.foo = {
        tableName: 'foo',
        attributes: {
          name: 'string',
          bars: { collection: 'bar' }
        }
      };

      collections.bar = {
        tableName: 'bar',
        attributes: {
          foo: {
            columnName: 'foo_id',
            foreignKey: true,
            references: 'foo',
            on: 'id'
          }
        }
      };
    });

    /**
     * Test that a reference to bar gets built for the foo table:
     *
     * attributes: {
     *   bars: {
     *     collection: 'foo'
     *     references: 'bar',
     *     on: 'bar_id'
     *   }
     * }
     */

    it('should add a reference to the bar table', function() {
      var obj = new References(collections);
      assert(obj.foo.attributes.bars);
      assert(obj.foo.attributes.bars.collection === 'bar');
      assert(obj.foo.attributes.bars.references === 'bar');
      assert(obj.foo.attributes.bars.on === 'foo_id');
    });

  });
});
