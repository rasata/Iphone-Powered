/**
 * Test dependencies
 */
var lifecycle = require('./helpers/lifecycle')
	, Generator = require('../lib');



//
// Fixtures
//
var SCOPE = {

	rootPath: '.',

	// Other scope variables to include in tests
	// ...

};



/**
 * Test the generator.
 */

describe('generator', function () {

	before( lifecycle.setup(Generator, SCOPE) );

	it('should work', function () {
		// For now, just run the generator.
	});

	after( lifecycle.teardown() );
});
