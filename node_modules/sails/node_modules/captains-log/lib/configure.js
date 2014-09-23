/**
 * Module dependencies.
 */

var _ = require('lodash');
var rc = require('rc');
var DEFAULT = require('./defaults');
var _defaultsDeep = require('merge-defaults');



/**
 * By default, look for configuration in:
 *   + `.captainslogrc` files
 *   + `CAPTAINSLOG-*` env variables
 *
 * More on `rc` conventions:
 * https://github.com/dominictarr/rc#standards
 *
 * Special overrides:
 *    + overrides.ignoreCLIArgs
 *      -> ignore --verbose, --silent, and --silly
 *    + overrides.rc
 *      -> custom rc prefix to use
 *         (or `false` to disable rc conf completely)
 *      -> defaults to 'captainslog'
 *
 * @api private
 */

module.exports = function(overrides) {

  // Overrides passed in programmatically always
  // take precedence.
  overrides = _defaultsDeep({}, overrides || {}, DEFAULT.OVERRIDES);


  // Then `rc` configuration conventions.
  // (https://github.com/dominictarr/rc#standards)
  var rconf;
  if (overrides.rc === false) {
    rconf = {};
  } else {
    rconf = rc(overrides.rc);

    if (!overrides.ignoreCLIArgs) {
      rconf.level = rconf.level || // Accept command-line shortcuts:
      rconf.verbose ? 'verbose' : // --verbose
      rconf.silent ? 'silent' : // --silent
      rconf.silly ? 'silly' : // --silly
      undefined;
    }
  }

  // Combine overrides and rc config into `options`
  var options = _defaultsDeep(overrides, rconf);



  // If `prefixes` were not explicitly set in user config,
  // and `colors` were not disabled in user config,
  // and NODE_ENV is not set to 'production,
  // load the `colors` dependency and colorize prefixes.
  if (options.prefixes === undefined && options.colors && process.env.NODE_ENV !== 'production') {

    // Ensure `options.colors` is valid, and try to enable the `colors`
    // module if possible, and configured to do so.
    (function() {
      try {
        require('colors')
          .setTheme(
            _.isObject(options.colors) ? options.colors : {}
        );
      } catch (e) {
        // If any errors arise using/requiring colors, ignore them.
      }
    })();

    options.prefixes = {};

    // Use prefixTheme if specified
    var prefixTheme = (options.prefixTheme || DEFAULT.OPTIONS.prefixTheme);
    var prefixes = DEFAULT.OPTIONS.prefixes;
    if (prefixTheme) {
      prefixes = (options.prefixThemes || DEFAULT.OPTIONS.prefixThemes)[prefixTheme];
    }
    DEFAULT.METHODS.forEach(function(logAt) {

      var prefix = prefixes[logAt];

      // If a `prefix` was specified, use it instead
      // (keep in mind this is only if the user didn't define `prefixes`)
      var configuredPrefix = (options.prefix || DEFAULT.OPTIONS.prefix);

      // If `prefix` is explicitly set to `false` or `null`,
      // disable prefixes altogether.
      if (options.prefix === false || options.prefix === null) {
        configuredPrefix = '';
      }

      // Default prefix for each log level to whatever's in the `prefixes conf,
      // as long as no explicit global prefix was defined.
      configuredPrefix = configuredPrefix || prefixes[logAt];

      // Add some color
      var colorizedPrefix = (function() {
        try {
          // defaults to the color of the log level
          // e.g. 'foobar.info'
          return configuredPrefix[logAt];
        } catch (e) { /* ignore */ }
      })();

      options.prefixes[logAt] = colorizedPrefix;
    });
  }

  // Then mix in the rest of the implicit default.
  // (DEFAULT.OPTIONS above)
  _defaultsDeep(options, DEFAULT.OPTIONS);



  return options;
};
