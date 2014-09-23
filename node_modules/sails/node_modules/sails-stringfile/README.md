sails-stringfile
===================

Localized stringfile containing messages used in Sails command-line interface and runtime.
This is one part of the effort towards making Sails more accessible to non-native English readers/speakers.



## How This Module Works

These files are here for future use-- this project is an early-stage work in progress.

+ Environment variables are used to determine a user's locale.  (defaults to English)


## Usage


```javascript
// From Sails core, an adapter, a generator, a hook, or some other dependency:
var STRINGFILE = require('sails-stringfile');

// Internally, this module runs node's native `util.format()` method,
// so you can also template strings:
var localizedMessage = STRINGFILE('cli.new.success', ['myApp', {some:'stuff'}, 'more stuff'])

// Then, appropriate msg is brought in auf deutsch, espanol, traditional chinese, english, etc.
console.log(localizedMessage);
```


## Languages

Current language support _targets_ are:

+ English
+ French
+ Spanish
+ Traditional Chinese
+ German

> (please send a PR if you have a request and we'll add it to this list!)






## How Can I Help?

+ The existing strings need to be pulled out of log messages and errors in:
  + sails core
  + anchor core
  + waterline core
  + sails-generate-*
  + sails-hook-*
  + sails-adapter-* (adapters)

+ Code comments and other support files (like README) in newly generated sails modules (or a new project) should be pulled out into the generator scope and brought in using the same mechanism.  This is only relevant for generators:
  + sails-generate-new
  + sails-generate-frontend
  + sails-generate-backend
  + sails-generate-views
  + sails-generate-gruntfile
  + sails-generate-controller
  + sails-generate-model
  + sails-generate-generator

+ A stringfile needs to be created in the `locales` in this repository for each language we want to support, mapping the string keys to a reasonable log message in the target language (the English stringfile is a good reference to see how a particular type of message should be worded, etc.).





## License

MIT c. Mike McNeil 2014
