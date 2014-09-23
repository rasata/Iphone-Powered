/**
 * sails-generate-views
 *
 * Usage:
 * `sails generate views`
 *
 * @type {Object}
 */

module.exports = {

	templatesDirectory: require('path').resolve(__dirname,'../templates'),

	before: require('./before'),

	targets: {
		'./views/403.ejs': { copy: '403.ejs' },
		'./views/404.ejs': { copy: '404.ejs' },
		'./views/500.ejs': { copy: '500.ejs' },
		'./views/homepage.ejs': { copy: 'homepage.ejs' },
		'./views/layout.ejs': { copy: 'layout.ejs' }
	}

};

