var JoinTables = require('../lib/waterline-schema/joinTables'),
    assert = require('assert');

describe('JoinTables', function() {

  describe('auto mapping of foreign keys', function() {
    var collections = {};

    before(function() {

      collections.foo = {
        tableName: 'foo',
        connection: 'bar',
        attributes: {
          id: {
            type: 'integer',
            autoIncrement: true,
            primaryKey: true,
            unique: true
          },
          bars: {
            collection: 'bar',
            via: 'foos',
            dominant: true
          }
        }
      };

      collections.bar = {
        tableName: 'bar',
        connection: 'bar',
        attributes: {
          id: {
            type: 'integer',
            autoIncrement: true,
            primaryKey: true,
            unique: true
          },
          foos: {
            collection: 'foo',
            via: 'bars'
          }
        }
      };
    });

    it('should add a junction table for a many to many relationship', function() {
      var obj = new JoinTables(collections);
      assert(obj.bar_foos__foo_bars);
      assert(obj.bar_foos__foo_bars.identity === 'bar_foos__foo_bars');
      assert(obj.bar_foos__foo_bars.tables.indexOf('bar') > -1);
      assert(obj.bar_foos__foo_bars.tables.indexOf('foo') > -1);
      assert(obj.bar_foos__foo_bars.junctionTable === true);


      assert(obj.bar_foos__foo_bars.attributes.foo_bars);
      assert(obj.bar_foos__foo_bars.attributes.foo_bars.type === 'integer');
      assert(obj.bar_foos__foo_bars.attributes.foo_bars.columnName === 'foo_bars');
      assert(obj.bar_foos__foo_bars.attributes.foo_bars.foreignKey === true);
      assert(obj.bar_foos__foo_bars.attributes.foo_bars.references === 'foo');
      assert(obj.bar_foos__foo_bars.attributes.foo_bars.on === 'id');
      assert(obj.bar_foos__foo_bars.attributes.foo_bars.groupKey === 'foo');

      assert(obj.bar_foos__foo_bars.attributes.bar_foos);
      assert(obj.bar_foos__foo_bars.attributes.bar_foos.type === 'integer');
      assert(obj.bar_foos__foo_bars.attributes.bar_foos.columnName === 'bar_foos');
      assert(obj.bar_foos__foo_bars.attributes.bar_foos.foreignKey === true);
      assert(obj.bar_foos__foo_bars.attributes.bar_foos.references === 'bar');
      assert(obj.bar_foos__foo_bars.attributes.bar_foos.on === 'id');
      assert(obj.bar_foos__foo_bars.attributes.bar_foos.groupKey === 'bar');
    });

    it('should update the parent collection to point to the join table', function() {
      var obj = new JoinTables(collections);

      assert(obj.foo.attributes.bars.references === 'bar_foos__foo_bars');
      assert(obj.foo.attributes.bars.on === 'foo_bars');

      assert(obj.bar.attributes.foos.references === 'bar_foos__foo_bars');
      assert(obj.bar.attributes.foos.on === 'bar_foos');
    });
  });


  describe('mapping of custom foreign keys', function() {
    var collections = {};

    before(function() {

      collections.foo = {
        tableName: 'foo',
        connection: 'bar',
        attributes: {
          uuid: {
            type: 'string',
            primaryKey: true
          },
          bars: {
            collection: 'bar',
            via: 'foos'
          }
        }
      };

      collections.bar = {
        tableName: 'bar',
        connection: 'bar',
        attributes: {
          area: {
            type: 'integer',
            primaryKey: true
          },
          foos: {
            collection: 'foo',
            via: 'bars',
            dominant: true
          }
        }
      };
    });

    it('should add a junction table for a many to many relationship', function() {
      var obj = new JoinTables(collections);

      assert(obj.bar_foos__foo_bars);
      assert(obj.bar_foos__foo_bars.identity === 'bar_foos__foo_bars');
      assert(obj.bar_foos__foo_bars.tables.indexOf('bar') > -1);
      assert(obj.bar_foos__foo_bars.tables.indexOf('foo') > -1);
      assert(obj.bar_foos__foo_bars.junctionTable === true);


      assert(obj.bar_foos__foo_bars.attributes.foo_bars);
      assert(obj.bar_foos__foo_bars.attributes.foo_bars.type === 'string');
      assert(obj.bar_foos__foo_bars.attributes.foo_bars.columnName === 'foo_bars');
      assert(obj.bar_foos__foo_bars.attributes.foo_bars.foreignKey === true);
      assert(obj.bar_foos__foo_bars.attributes.foo_bars.references === 'foo');
      assert(obj.bar_foos__foo_bars.attributes.foo_bars.on === 'uuid');
      assert(obj.bar_foos__foo_bars.attributes.foo_bars.groupKey === 'foo');

      assert(obj.bar_foos__foo_bars.attributes.bar_foos);
      assert(obj.bar_foos__foo_bars.attributes.bar_foos.type === 'integer');
      assert(obj.bar_foos__foo_bars.attributes.bar_foos.columnName === 'bar_foos');
      assert(obj.bar_foos__foo_bars.attributes.bar_foos.foreignKey === true);
      assert(obj.bar_foos__foo_bars.attributes.bar_foos.references === 'bar');
      assert(obj.bar_foos__foo_bars.attributes.bar_foos.on === 'area');
      assert(obj.bar_foos__foo_bars.attributes.bar_foos.groupKey === 'bar');
    });
  });


  describe('self-referencing associations', function() {
    var collections = {};

    before(function() {

      collections.foo = {
        tableName: 'foo',
        connection: 'bar',
        attributes: {
          id: {
            type: 'integer',
            autoIncrement: true,
            primaryKey: true,
            unique: true
          },

          isFollowing: {
            collection: 'foo',
            via: 'followedBy'
          },

          followedBy: {
            collection: 'foo',
            via: 'isFollowing'
          }
        }
      };
    });

    it('should add a junction table for the self referencing attributes', function() {
      var obj = new JoinTables(collections);

      assert(obj.foo_followedby__foo_isfollowing);
      assert(!obj.foo_isfollowing__foo_followedby);

      assert(obj.foo_followedby__foo_isfollowing.attributes.foo_isFollowing);
      assert(obj.foo_followedby__foo_isfollowing.attributes.foo_isFollowing.type === 'integer');
      assert(obj.foo_followedby__foo_isfollowing.attributes.foo_isFollowing.columnName === 'foo_isFollowing');
      assert(obj.foo_followedby__foo_isfollowing.attributes.foo_isFollowing.foreignKey === true);
      assert(obj.foo_followedby__foo_isfollowing.attributes.foo_isFollowing.references === 'foo');
      assert(obj.foo_followedby__foo_isfollowing.attributes.foo_isFollowing.on === 'id');
      assert(obj.foo_followedby__foo_isfollowing.attributes.foo_isFollowing.groupKey === 'foo');

      assert(obj.foo_followedby__foo_isfollowing.attributes.foo_followedBy);
      assert(obj.foo_followedby__foo_isfollowing.attributes.foo_followedBy.type === 'integer');
      assert(obj.foo_followedby__foo_isfollowing.attributes.foo_followedBy.columnName === 'foo_followedBy');
      assert(obj.foo_followedby__foo_isfollowing.attributes.foo_followedBy.foreignKey === true);
      assert(obj.foo_followedby__foo_isfollowing.attributes.foo_followedBy.references === 'foo');
      assert(obj.foo_followedby__foo_isfollowing.attributes.foo_followedBy.on === 'id');
      assert(obj.foo_followedby__foo_isfollowing.attributes.foo_followedBy.groupKey === 'foo');

      assert(obj.foo.attributes.isFollowing.references === 'foo_followedby__foo_isfollowing');
      assert(obj.foo.attributes.isFollowing.on === 'foo_isFollowing');
      assert(obj.foo.attributes.followedBy.references === 'foo_followedby__foo_isfollowing');
      assert(obj.foo.attributes.followedBy.on === 'foo_followedBy');
    });
  });

});
