/**
 * sails-generate-adapter
 *
 * Usage:
 * `sails generate adapter`
 *
 * @type {Object}
 */

module.exports = {

	templatesDirectory: require('path').resolve(__dirname,'../templates'),

	before: require('./before'),

	targets: {
	'./:adaptersPath': {folder: {}},
    './:adaptersPath/CONTRIBUTING.md':    { template: 'boilerplate/CONTRIBUTING.md' },
    './:adaptersPath/FAQ.md':             { template: 'boilerplate/FAQ.md' },
    './:adaptersPath/LICENSE':            { template: 'boilerplate/LICENSE' },
    './:adaptersPath/README.md':          { template: 'boilerplate/README.md' },
    './:adaptersPath/.gitignore':         { template: 'boilerplate/gitignore' },
    './:adaptersPath/.jshintrc':          { template: 'boilerplate/.jshintrc' },
    './:adaptersPath/.editorconfig':      { template: 'boilerplate/.editorconfig' },
    './:adaptersPath/package.json':       { template: 'boilerplate/package.json' },
    './:adaptersPath/test/integration/runner.js': { template: 'boilerplate/test/integration/runner.js' },
    './:adaptersPath/test/unit/register.js': { template: 'boilerplate/test/unit/register.js' },
    './:adaptersPath/test/unit/README.md':   { template: 'boilerplate/test/unit/README.md' },
    './:adaptersPath/lib/adapter.js':              { template: 'boilerplate/adapter.js' },
    './:adaptersPath/:adapterMainFile.js':              { template: 'boilerplate/main.js' }
	}
};

