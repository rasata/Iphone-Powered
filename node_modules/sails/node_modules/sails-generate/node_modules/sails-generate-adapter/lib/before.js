/**
 * Module dependencies
 */

var util = require('util')
	, path = require('path')
	, _ = require('lodash');

// Make _.defaults recursive
_.defaults = require('merge-defaults');




/**
 * This `before` function is run before generating targets.
 * Validate, configure defaults, get extra dependencies, etc.
 *
 * @param  {Object} scope
 * @param  {Function} cb    [callback]
 */

module.exports = function(scope, cb) {

	//
	// scope.args are the raw command line arguments.
	//
	// e.g. if you run:
	// sails generate controlller user find create update
	// then:
	// scope.args = ['user', 'find', 'create', 'update']
	//


	// Look at arguments and set path to adapters (i.e. `:adaptersPath`)
	if (scope.args) {
		if (scope.args[0]) {

			if (!scope.adapterType) {
				scope.adapterType = scope.args[0];
			}

			// Determine path to adapters
			var DEFAULT_ADAPTERS_PATH = 'api/adapters';
			scope.adaptersPath = path.join(DEFAULT_ADAPTERS_PATH, scope.adapterType);
		}
	}

	// Use `adapterType` instead of `adapterName` if it's specified.
	scope.adapterName = scope.adapterType || scope.adapterName;
	scope.adapterType = scope.adapterType || scope.adapterName;
	scope.adapterMainFile = scope.adapterName+'Adapter';
	scope.id = scope.adapterName;
	scope.globalID = scope.adapterMainFile;
	scope.destDir = 'api/adapters/'+scope.adapterName+'/';

	//
	// Validate custom scope variables which
	// are required by this generator.
	//

	if (!scope.adapterType) {
		return cb(new Error(
			'Missing argument: Please provide an `adapterType` for the new adapter.\n' +
			'(should refer to the type of database/webservice/thing it connects to; e.g. `mysql` or `irc`).'
		));
	}


	//
	// Determine default values based on the
	// available scope.
	//

	_.defaults(scope, {
		github: {
			// i.e.
			// Would you mind telling me your username on GitHub?
			// (or favorite pseudonym)
			username: 'balderdashy'
		},
		year: (new Date()).getFullYear(),
		moduleName: 'waterline-' + ('' + scope.adapterType).toLowerCase(),
	});



	//
	// Take multiple "passes" if necessary.
	//

	_.defaults(scope, {
		website: util.format('http://github.com/%s', scope.github.username),
		author: util.format('%s', scope.github.username) || 'a node.js/sails user',
		repository: {
			type: 'git',
			url: util.format('git://github.com/%s/waterline-%s.git', scope.github.username)
		}
	});




	//
	// Trigger callback with no error to proceed.
	//

	cb();
};
