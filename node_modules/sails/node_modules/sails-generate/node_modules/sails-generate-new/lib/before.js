/**
 * Module dependencies
 */

var _ = require('lodash')
	, path = require('path')
	, util = require('util')
	, fs = require('fs');




module.exports = function before (scope, sb) {

	var args0 = scope.args[0];

	// Use a reasonable default app name
	var defaultAppName = args0;
	if ( args0 === '.' || !args0 ) {
		defaultAppName = path.basename(process.cwd());
	}

	_.defaults(scope, {
		author: process.env.USER || 'anonymous node/sails user',
		year: (new Date()).getFullYear(),
		appName: defaultAppName
	});
	_.defaults(scope, {
		github: { username: scope.author }
	});
	_.defaults(scope, {
		website: util.format('http://github.com/%s', scope.github.username)
	});

	if (scope.frontend === false) {
  		scope.modules['frontend'] = scope.modules['gruntfile'] = false;
  	}

	// Make changes to the rootPath where the sails project will be created
	scope.rootPath = path.resolve(process.cwd(), args0 || '');

	// Ensure we aren't going to inadvertently delete any files.
	try {
		var files = fs.readdirSync(scope.rootPath);
		if (files.length) {
			return sb.error('`sails new` can only be called on an empty directory.');
		}
	}
	catch (e) { }

	sb();
};

