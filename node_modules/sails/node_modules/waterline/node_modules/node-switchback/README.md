# [<img title="switchback - Delinearizes flow control into a more realistic directed graph" src="http://i.imgur.com/Jgrc9k2.png" width="75px" alt="image of a mountain switchback"/>](https://github.com/balderdashy/switchback) Switchback

[![Bower version](https://badge.fury.io/bo/switchback.png)](http://badge.fury.io/bo/switchback)
[![NPM version](https://badge.fury.io/js/node-switchback.png)](http://badge.fury.io/js/node-switchback) &nbsp; &nbsp;
[![Build Status](https://travis-ci.org/balderdashy/switchback.svg?branch=master)](https://travis-ci.org/balderdashy/switchback)

Normalize a callback to a "switchback" and vice versa.

+ Allows your functions to **"[b](http://en.wikipedia.org/wiki/Branch_table)[r](http://en.wikipedia.org/wiki/Monad_(functional_programming))[a](http://www.afralisp.net/autolisp/tutorials/cond-vs-if.php)[n](http://en.wikipedia.org/wiki/Dispatch_table)[ch](http://en.wikipedia.org/wiki/Virtual_method_table)"**.
+ Makes usage of branching functions **suck less**.
+ Maintains **100% compatibility** with [node callbacks](http://nodeguide.com/style.html#callbacks).
+ Helps keep users of your async functions from "forgetting to return early" **andthentimespaceparadox**
+ Works w/ Node.js and in the browser.
+ [Table the label, wear your own name.](http://news.moviefone.com/2010/05/26/cheesy-mr-t-clip-advises-you-to-table-the-label/)


========================================

## Contents

|     | Jump to...        |
|-----|-------------------------|
| I   | [Usage for Users](#using-a-function-with-a-switchback)
| II  | [Usage for Implementors](#implementing-a-function-with-a-switchback)
| III | [Usage w/ Other Flow Control Libraries](#using-switchbacks-with-other-flow-control-libraries)
| IV  | [Details](#details)
| V   | [License](#license)



========================================

## Usage

### Using a function with a switchback
```javascript

// So you heard about this new function called `mowLawn`
// which accepts a switchback.  We know it has a `success`
// handler, and a catch-all `error` handler, but turns out
// it also has two others: `gasolineExplosion` and `sliceOffFinger`.

// Let's try it!

// Pass in a switchback:
mowLawn('quickly', 'zigzags', {
  // We can omit the `error` handler because the documentation for `mowLawn` says that it's optional.
  // This varies function-to-function.
  // (i.e. its only purpose is to act as a catch-all if the two explicit handlers are not specified)

  gasolineExplosion: function () {
    // Safety goggles next time.
  },
  sliceOffFinger: function (numFingersLost) {
    // Oh my.
  },
  success: function (dollarsEarned) {
    // Lawn was mowed, everything worked.
  }
});

// Or we can pass in a callback function instead:
mowLawn('quickly', 'zigzags', function (err, dollarsEarned) {
  if (err) {
    // Handle the error, count fingers to figure out what happened, etc.
    // Also don't forget to return early or use `else` or something.
    return;
  }

  // Lawn was mowed, everything worked.
});

// Both are cool.


// Finally, it's worth noting that the return value is an EventEmitter:
mowLawn('quickly', 'zigzags')
.on('gasolineExplosion', function (err) {
  // Safety goggles next time.
})
.on('sliceOffFinger', function (numFingersLost) {
  // Oh my.
})
.on('success', function (dollarsEarned) {
  // Lawn was mowed, everything worked.
})
```



### Implementing a function with a switchback


Adding an optional switchback interface to a function is pretty simple.  Just install:

```sh
$ npm install node-switchback --save
```

Require:

```js
var switchback = require('node-switchback');
```

And then call `switchback()` on the callback at the top of your function, overriding the original value:

```javascript
cb = switchback(cb);
```

To enable complete, chainable usage, you should also return the switchback from your function:

```javascript
return cb;
```

For example:

```javascript
var switchback = require('node-switchback');

function myFunction (stuff, cb) {
  cb = switchback(cb);
  // that's it!

  // All the standard callback things work the same
  if (err) return cb(err);

  // But now you can call custom handlers too:
  if (cb.someHandler) {

  }

  // Mix it up!
  // Table the label!
  // Wear your own name!
  cb(null, 'whatever', 'you', 'want');

  // Make it chainable
  return cb;
}

```


========================================


## Details

Switchback is a JavaScript flow control library.  It works alongside async, promises, generators, and conventional Node callbacks to provide support for error negotiation via casefunctions.  It also makes your callbacks EventEmitters.  You might be familiar with a similar concept from `jQuery.ajax` (i.e. `$.ajax({ success: foo, error: bar });`).  It may be helpful to think about this module as the equivalent of something like `async.if()` or `async.switch()`.


##### More examples of exactly what to expect

```javascript
function freeHouseholdPets (cb) {

  // At the very top, upgrade the callback to a switchback.
  // You can also do `var sb = switchback(cb)` to make the distinction explicit.
  cb = switchback(cb);

  // Do your stuff
  // ...


  // If cb was a switchback:
  /////////////////////////////////////////////////

  // Things that trigger the `success` handler:
  return cb();
  return cb(null);
  return cb.success('the results!!!!');
  return cb.success();


  // Things that trigger the `error` handler:
  return cb('bahh!');
  return cb.error('bahh!');
  return cb.error();


  // If cb was a callback function:
  /////////////////////////////////////////////////

  // OK but what about usage with normal node callbacks?
  //
  // If a user of `freeHouseholdPets()` passes in an old-school callback,
  // e.g. function (err, results) {console.log(err,results);}, here's what
  // will get printed to the console in each case:

  cb() // ---> null undefined
  cb(null, 'the results!!!!') // ---> null the results!!!!
  cb.success() // ---> null undefined
  cb.success('the results!!!!'); // ---> null the results!!!!

  cb('bahh!') // ---> bahh! undefined
  cb('bahh!', 'foo') // ---> bahh! foo
  cb.error() // ---> [Error] undefined
  cb.error('bahh!') // ---> bahh! undefined
}


// Now everybody can use a good ole-fashioned callback function:
freeHouseholdPets(function (err, results) {
  if (err) {
    // Something came up, the pets were not freed.
    //
    // Handle the error, but don't forget to return early
    // or use `else` or something..
    return;
  }

  // Pets were freed, we can go about our business
});

// or a switchback:
freeHouseholdPets({
  error: function (err) {
    // Something came up, the pets were not freed.
    // Handle the error.
  },
  success: function (results) {
    // Pets were freed, we can go about our business
  }
});

```

========================================


## Using switchbacks with other flow control libraries

##### with `async`
```javascript
// TODO
```

##### with `q` promises
```javascript
// TODO
```

##### with generators
```javascript
// TODO
```


========================================

## License

**[MIT](./LICENSE)**
&copy; 2014
[Mike McNeil](http://michaelmcneil.com), [Balderdash](http://balderdash.co) & contributors

This module is free and open-source under the [MIT License](http://sails.mit-license.org/).


![image_squidhome@2x.png](http://i.imgur.com/RIvu9.png)


[![githalytics.com alpha](https://cruel-carlota.pagodabox.com/a22d3919de208c90c898986619efaa85 "githalytics.com")](http://githalytics.com/balderdashy/switchback)
