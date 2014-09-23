Waterline-Criteria
=======================

Helper module designed for adapters which communicate with key/value stores such as [Sails-Disk](https://github.com/balderdashy/sails-disk), [Sails-Memory](https://github.com/balderdashy/sails-memory), and [sails-redis](https://github.com/balderdashy/sails-redis) (i.e. they already implement the `semantic` interface, but need to implement the `queryable` interface)


========================================

### Contents

|    | Jump to...        |
|-----|-------------------------|
| I   | [Browser](https://github.com/balderdashy/waterline-criteria#for-the-browser)                 |
| II  | [Node.js](https://github.com/balderdashy/waterline-criteria#for-nodejs)                 |
| III | [Version Notes](https://github.com/balderdashy/waterline-criteria#version)          |
| IV  | [License](https://github.com/balderdashy/waterline-criteria#license)                 |

========================================

### For the Browser

#### Installation
```
$ bower install waterline-criteria
```

#### Basic Usage

```html
    <!-- .... -->
  </body>
  <script type="text/javascript" src="./path/to/bower_components/waterline-criteria/index.js"></script>
  <script type="text/javascript">
    var someData = [{
      id: 1,
      name: 'Lyra'
    }, {
      id: 2,
      name 'larry'
    }];
    
    var x = wlFilter(someData, {
      where: {
        name: { contains: 'lyr' }
      }
    }).results;
    
    // x ==> [{name: 'Lyra', id: 1}]
  </script>
</html>
```
========================================

### For Node.js

#### Installation

```sh
$ npm install waterline-criteria
```

#### Basic Usage

```js
var wlFilter = require('waterline-criteria');

var someData = [{
  id: 1,
  name: 'Lyra'
}, {
  id: 2,
  name 'larry'
}];

var x = wlFilter(someData, {
  where: {
    name: { contains: 'lyr' }
  }
}).results;

// x ==> [{name: 'Lyra', id: 1}]
```

========================================

### Version Notes

The master branch of this repository holds waterline-criteria for Sails versions 0.10.0 and up.  If you're looking for the version for the v0.9.x releases of Sails, the source is [located here](https://github.com/balderdashy/waterline-criteria/releases/tag/v0.9.7).


#### Roadmap

1. Benchmark
2. Optimize
3. There is a possibility that waterline-criteria will eventually become a dependency of Waterline core, since it may make sense to merge the integrator submodule from Waterline core (in-memory populates/joins) into this library.




========================================

### License

**[MIT](./LICENSE)**
&copy; 2014
[Mike McNeil](http://michaelmcneil.com), [Balderdash](http://balderdash.co) & contributors

This module is part of the [Sails framework](http://sailsjs.org), and is free and open-source under the [MIT License](http://sails.mit-license.org/).


![image_squidhome@2x.png](http://i.imgur.com/RIvu9.png) 
 
