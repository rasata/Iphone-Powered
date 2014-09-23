/**
 * Module dependencies
 */

var fs = require('fs-extra');
var _ = require('lodash');
var path = require('path');
var async = require('async');



/**
 * Runs after this generator has finished.
 *
 * @param  {Object}   scope
 * @param  {Function} cb
 */

module.exports = function afterGenerate (scope, cb) {

	// Keep track of non-fatal errors.
	var nonFatalErrors = [];

	// Read the new package.json file
	var packageJson = require(scope.rootPath+'/package.json');

	// Delete the sails dependency--we'll add it separately
	delete packageJson.dependencies.sails;

	async.auto({
		// Create the node_modules folder
		node_modules: function(cb) {
			fs.mkdir(scope.rootPath+'/node_modules', cb);
		},
		// Create links to all necessary dependencies
		dependencies: ['node_modules', function(cb) {
			async.parallel(_.map(_.keys(packageJson.dependencies), copyDependency), cb);
		}],
		// Create a link to the sails we used to create the app
		sails: ['node_modules', function(cb) {
			fs.symlink(scope.sailsRoot, scope.rootPath+'/node_modules/sails', 'junction', function (symLinkErr) {
				// If a symbolic link fails, push it to the `nonFatalErrors` stack,
				if (symLinkErr) { nonFatalErrors.push(symLinkErr); }
				// but keep going either way.
				cb();
			});
		}]
	},

	function doneGeneratingApp (err) {
		if (err) return cb(err);

		// SUCCESS!
		cb.log.info('Created a new Sails app `'+scope.appName+'`!');

		// Warn that user needs to run `npm install`:
		if (nonFatalErrors.length) {
			cb.log.warn('Could not create symbolic links in the newly generated `node_modules` folder');
			cb.log.warn('(usually this is due to a permission issue on your filesystem)');
			cb.log.warn('Before you run your new app, `cd` into the directory and run:');
			cb.log.warn('$ npm install');
		}
		return cb();				
	});

	// Make a symlink between the dependency in the sails node_modules folder,
	// and the new app's node_modules
	function copyDependency(moduleName) {
		return function _copyDependency (cb) {
			var srcModulePath = path.resolve(scope.sailsRoot, 'node_modules', moduleName);
			var destModulePath = path.resolve(scope.rootPath, 'node_modules',moduleName);
			
			// Use the "junction" option for Windows
			fs.symlink(srcModulePath, destModulePath, 'junction', function (symLinkErr) {
				// If a symbolic link fails, push it to the `nonFatalErrors` stack,
				if (symLinkErr) { nonFatalErrors.push(symLinkErr); }
				// but keep going either way.
				cb();
			});
		};
	}


};