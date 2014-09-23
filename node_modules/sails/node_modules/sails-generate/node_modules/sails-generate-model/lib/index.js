/**
 * sails-generate-model
 *
 * Usage:
 * `sails generate model`
 *
 * @type {Object}
 */

module.exports = {

	templatesDirectory: require('path').resolve(__dirname,'../templates'),

	before: require('./before'),

	targets: {
		'./api/models/:filename': { template: 'model.template' }
	}
};

