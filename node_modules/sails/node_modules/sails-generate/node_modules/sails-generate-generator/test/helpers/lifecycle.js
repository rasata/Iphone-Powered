/**
 * Module dependencies.
 */

var reportback = require('reportback')()
	, sailsgen = require('sails-generate')
	, fsx = require('fs-extra')
	, path = require('path');



//
// Constants
//
// Validate path against "ceiling"
// (failsafe to avoid accidentally deleting your hard disk
//  by limiting highest permissible path for rimrafing)
//
var PATH_CEILING = path.resolve(__dirname, '.test_output');
var CLEANUP_PATH = PATH_CEILING;
if ( !_isSubPath(CLEANUP_PATH, PATH_CEILING) ) {
	throw new Error(
		'Invalid cleanup path: `'+CLEANUP_PATH+'`\n'+
		'(must be within `'+PATH_CEILING+'`)\n'
	);
}



/**
 * Generator lifecycle helpers
 * @type {Object}
 */

module.exports = {

	// Run specified generator using fixtures
	setup: function (Generator, scope) {
		return function _before (done) {
			done = reportback.extend(done);

			// Extend scope.rootPath with our path ceiling:
			scope.rootPath = path.resolve(
				PATH_CEILING,
				scope.rootPath
			);

			_cleanup(reportback.extend({
				success: function () {
					sailsgen(Generator, scope, done);
				}
			}));
		};
	},

	// Delete stray files
	teardown: function () {
		return function _after (done) {
			done = reportback.extend(done);
			_cleanup(done);
		};
	}
};




/**
 * Clean up (delete) whatever is at the PATH_CEILING
 * of this generator.
 *
 * @param  {Function} cb [description]
 * @return {[type]}      [description]
 */
function _cleanup (cb) {
	fsx.remove(PATH_CEILING, cb);
}

/**
 * Convert a string into the escaped string that would
 * match it in a RegExp.
 *
 * @param  {[type]} str [description]
 * @return {String}
 */
function _regExcape(str) {
	return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
}


/**
 * Verify that `subpath` starts with `toppath`
 *
 * @param  {[type]}  subpath [description]
 * @param  {[type]}  toppath [description]
 * @return {Boolean}         [description]
 */
function _isSubPath(subpath, toppath) {
	var regex = new RegExp('^' + _regExcape(toppath));
	return subpath.match(regex);
}
