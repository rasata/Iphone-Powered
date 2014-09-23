switchback
========

Normalize a callback to a "switchback" and vice versa.

+ Allows your functions to "branch".
+ Makes usage of branching functions suck less.
+ Maintains 100% compatibility with node callbacks.
+ Helps keep users of your async functions from "forgetting to return early" andthentimespaceparadox
+ [Table the label, wear your own name.](http://news.moviefone.com/2010/05/26/cheesy-mr-t-clip-advises-you-to-table-the-label/)

> You might be familiar with a simlar concept from `jQuery.ajax` (i.e. `$.ajax({ success: foo, error: bar });`)


## Usage

##### Using a function with a switchback
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
    // Also don't forget to returnearly or use `else` or something.
    return;
  }
  
  // Lawn was mowed, everything worked.
});

// Both are cool.
```

##### Writing a function that takes advantage of switchbacks
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
}

```



## Details

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
