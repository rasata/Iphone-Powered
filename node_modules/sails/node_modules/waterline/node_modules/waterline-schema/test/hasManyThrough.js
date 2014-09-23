var References = require('../lib/waterline-schema/references'),
    assert = require('assert');

describe('Has Many Through', function() {

  describe('Should Add', function() {
    var collections = {};

    before(function() {

      collections.foo = {
        tableName: 'foo',
        attributes: {
          id: {
            type: 'integer',
            autoIncrement: true,
            primaryKey: true,
            unique: true
          },
          bars: {
            collection: 'bar' ,
            through: 'foobar'
          }
        }
      };

      collections.foobar = {
        tableName: 'foobar',
        attributes: {
          id: {
            type: 'integer',
            autoIncrement: true,
            primaryKey: true,
            unique: true
          },
          type: {
            type: 'string'
          },
          bar: {
            columnName: 'bar_id',
            foreignKey: true,
            references: 'bar',
            on: 'id'
          }
        }
      };

      collections.bar = {
        tableName: 'bar',
        attributes: {
          id: {
            type: 'integer',
            autoIncrement: true,
            primaryKey: true,
            unique: true
          }
        }
      };
    });


    it('should update the parent collection to point to the join table', function() {
      var obj = new References(collections);

      assert(obj.foo.attributes.bars.references === 'foobar');
      assert(obj.foo.attributes.bars.on === 'bar_id');
    });
  });

});
