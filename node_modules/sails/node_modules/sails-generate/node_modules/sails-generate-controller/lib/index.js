/**
 * sails-generate-controller
 *
 * Usage:
 * `sails generate controller`
 *
 * @type {Object}
 */

module.exports = {

	templatesDirectory: require('path').resolve(__dirname,'../templates'),

	before: require('./before'),

	targets: {
		'./api/controllers/:filename': { template: './controller.template' }
	}
};

