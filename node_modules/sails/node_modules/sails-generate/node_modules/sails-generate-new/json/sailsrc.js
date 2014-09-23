/**
 * .sailsrc
 *
 * @param  {[type]} scope [description]
 * @return {[type]}       [description]
 */
module.exports = function(scope) {

	var package = {};
	package.generators = {};
	package.generators.modules = {};

	//
	// if scope has exceptional config, include it in the rc file:
	// The module to use for each known type of generator
	// 
	
	if (scope.coffee) {
		package.generators.modules.model = 'sails-generate-model-coffee';
		package.generators.modules.controller = 'sails-generate-controller-coffee';
	}

	return package;
};