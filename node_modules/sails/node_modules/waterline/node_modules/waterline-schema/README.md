Waterline Schema
====================

This is the core schema builder used in the Waterline ORM. It is responsible for taking an
attributes object from a Collection and turning it into a fully fledged schema object.

It's mainly tasked with figuring out and expanding associations between Collections.

## Schema Format

A Waterline schema is a javascript object that maps to a generalized database schema format.
An adapter should be able to take it and build out a schema definition including join tables in
a relational database.

#### Belongs To

Belongs to relationships are defined by adding a property to a collection's attributes with a
`model` property that points to another collection.

```javascript
attributes: {
  user: { model: 'user' }
}
```

Should create the following after being run through the schema.

```javascript
attributes: {
  user: {
    columnName: 'user_id',
    type: 'integer',
    foreignKey: true,
    references: 'user',
    on: 'id'
  }
}
```

#### Has Many

Has many relationships are defined by adding a property to a collection's attributes with a
`collection` property that points to another collection. This isn't used for the actual database
structure in a relational system but could be helpful in a nosql database. It is also used
internally inside of Waterline. A `via` key is required to point to a foriegn key.

```javascript
attributes: {
  users: {
    collection: 'user',
    via: 'foo'
  }
}
```

Should create the following after being run through the schema.

```javascript
attributes: {
  users: {
    collection: 'user',
    references: 'user',
    on: 'user_id',
    via: 'foo'
  }
}
```

#### Many To Many

Many To Many relationships are defined by adding a `collection` property on two Collections that
point to each other. This will create an additional collection in the schema that maps out the
relationship between the two. It will rewrite the foreign keys on the two collections to
reference the new join collections. A `via` key is required on both so that the relationships can
be properly mapped.

```javascript
// Foo Collection
attributes: {
  bars: {
    collection: 'bar',
    via: 'foos'
  }
}

// Bar Collection
attributes: {
  foos: {
    collection: 'foo',
    via: 'bars'
  }
}
```

Should create the following after being run through the schema.

```javascript
// Foo Collection
attributes: {
  id: {
    type: 'integer',
    autoIncrement: true,
    primaryKey: true,
    unique: true
  },
  bars: {
    collection: 'bar_foos__foo_bars',
    references: 'bar_foos__foo_bars',
    on: 'foo__bars',
    via: 'bar_foos'
  }
}

// Bar Collection
attributes: {
  id: {
    type: 'integer',
    autoIncrement: true,
    primaryKey: true,
    unique: true
  },
  foos: {
    collection: 'bar_foos__foo_bars',
    references: 'bar_foos__foo_bars',
    on: 'bar_foos',
    via: 'foo_bars'
  }
}

// bar_foos__foo_bars Collection
attributes: {
  bar_foos: {
    columnName: 'bar_foos',
    type: 'integer',
    foreignKey: true,
    references: 'bar',
    on: 'id',
    groupKey: 'bar'
  },
  foo_bars: {
    columnName: 'foo_bars',
    type: 'integer',
    foreignKey: true,
    references: 'foo',
    on: 'id',
    groupKey: 'foo'
  }
}
```
