/**
 * sails-generate-generator
 *
 * Usage:
 * `sails generate generator :type`
 *
 * @scope {String} type    [required, type of generator to create]
 *
 * @type {Object}
 */
module.exports = {

	templatesDirectory: require('path').resolve(__dirname,'../templates'),

	before: require('./before'),

	after: function (scope, cb) {
		// TODO: install this generator's dependencies
		cb();
	},

	targets: {
		'./Generator.js':       { template: 'Generator.js' },
		'./CONTRIBUTING.md':    { template: 'CONTRIBUTING.md' },
		'./FAQ.md':             { template: 'FAQ.md' },
		'./LICENSE':            { template: 'LICENSE' },
		'./README.md':          { template: 'README.md' },
		'./.gitignore':         { template: 'gitignore' },
		'./.jshintrc':          { template: '.jshintrc' },
		'./.editorconfig':      { template: '.editorconfig' },
		'./package.json':       { template: 'package.json' },
		'./templates/.gitkeep': { template: 'templates/.gitkeep' },
		'./templates/example.template.js': { copy: 'templates/example.template.js' },

		// Skip tests for now to keep it simple:
		// './:generatorName/test/runner.js':     { template: _pathTo('test/runner.js') },
		// './:generatorName/test/mocha.opts':    { template: _pathTo('test/mocha.opts') },
		// './:generatorName/test/helpers/lifecycle.js':  { template: _pathTo('test/helpers/lifecycle.js') },
	}
};
