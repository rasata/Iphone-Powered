/**
 * sails-generate-views-jade
 *
 * Usage:
 * `sails generate views-jade`
 *
 * @type {Object}
 */

module.exports = {

	templatesDirectory: require('path').resolve(__dirname,'../templates'),

	before: require('./before'),

	targets: {
		'./views/403.jade': { copy: '403.jade' },
		'./views/404.jade': { copy: '404.jade' },
		'./views/500.jade': { copy: '500.jade' },
		'./views/homepage.jade': { copy: 'homepage.jade' },
		'./views/layout.jade': { copy: 'layout.jade' }
	}

};

