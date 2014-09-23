captains-log
============

Simple logger for use with Sails, allowing easy custom configuration.


#### Default log levels

Based on [npm's log levels](https://github.com/isaacs/npmlog#loglevelprefix-message-)


+ `log.silly()`
+ `log.verbose()`
+ `log.info()`
+ `log.debug()`
  + (npm calls this level `log.http()`, but we call it `debug`.  If you use `log()`, the logger sees this as a call to `log.debug()`)
+ `log.warn()`
+ `log.error()`




#### Custom Examples

```javascript


/**
 * Using Winston
 * ====================================
 * 
 * Formerly, this module encapsulated Winston, a popular logger
 * by @indexzero and the gals/guys over at Nodejitsu.
 * Recently, we made Winston optional to make CaptainsLog as
 * lightweight as possible and reduce `npm install`/`require()`
 * for its usage in other modules.
 *
 * But Winston is awesome!  And it's a great fit for many apps,
 * giving you granular control over how log output is handled,
 * including sending emails, logging to multiple transports,
 * and other production-time concerns.
 *
 * More info/docs on Winston:
 * https://github.com/flatiron/winston
 * 
 * To use Winston w/ captains-log, do the following:

		var captains = CaptainsLog({
			custom: new (require('winston').Logger)({
				levels     : ...,
				transports : ...
			})
		});
 *
 */

/**
 *
 * Using your own custom logger
 * ====================================
 * 
 * To use a different library, `overrides.custom` must already
 * be instantiated and ready to go with (at minimum) an n-ary `.debug()`
 * method.  i.e. by n-ary, I mean that the following should
 * work (with any # of arguments):
	
		customLogger.debug()
		customLogger.debug('blah')
		customLogger.debug('blah', 'foo')
		customLogger.debug('blah', 'foo', {bar: 'baz'})
		customLogger.debug('blah', 'foo', {bar: 'baz'}, ['a', 3], 2, false);
		// etc.

		// To use a custom logged
		var captains = CaptainsLog({
			custom: customLogger
		});
 *
 */

```
