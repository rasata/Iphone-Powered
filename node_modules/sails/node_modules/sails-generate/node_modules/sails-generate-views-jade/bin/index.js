/**
 * Module dependencies
 */

var sailsgen = require('sails-generate')
	, path = require('path');



//
// This script exists so we can run our generator
// directly from the command-line for convenience
// during development.
//

var scope = {
	generatorType: 'views-jade',
	rootPath: process.cwd(),
	modules: {
		'views-jade': path.resolve(__dirname, '../lib')
	},

	// For the NEW generator we're generating:
	generatorName: process.argv[2],
};
sailsgen(scope, function (err) {
	if (err) throw err;

	// It worked.
	console.log('Done.');
});

