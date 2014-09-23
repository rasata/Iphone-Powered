/**
 * Module dependencies
 */
var fs = require('fs-extra')
	, _ = require('lodash')
	, path = require('path')
	, reportback = require('reportback')();



/**
 * Generate a JSON file
 *
 * @option {String} rootPath
 * @option {Object} data
 * [@option {Boolean} force=false]
 *
 * @handlers success
 * @handlers error
 * @handlers alreadyExists
 */
module.exports = function ( options, handlers ) {

	// Provide default values for handlers
	handlers = reportback.extend(handlers, {
		alreadyExists: 'error'
	});

	// Provide defaults and validate required options
	_.defaults(options, {
		force: false
	});

	var missingOpts = _.difference([
		'rootPath',
		'data'
	], Object.keys(options));
	if ( missingOpts.length ) return handlers.invalid(missingOpts);


	var rootPath = path.resolve( process.cwd() , options.rootPath );

	// Only override an existing file if `options.force` is true
	fs.exists(rootPath, function (exists) {
		if (exists && !options.force) {
			return handlers.alreadyExists('Something else already exists at ::'+rootPath);
		}

		if ( exists ) {
			fs.remove(rootPath, function deletedOldINode (err) {
				if (err) return handlers.error(err);
				_afterwards_();
			});
		}
		else _afterwards_();

		function _afterwards_ () {
			fs.outputJSON(rootPath, options.data, function (err){
				if (err) return handlers.error(err);
				else handlers.success();
			});
		}
	});
};
