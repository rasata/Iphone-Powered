/**
 * English stringfile for output messages in the Sails runtime & command-line tool.
 * 
 * @type {Object}
 */
module.exports = {

	// Strings related to upgrade notices
	upgrade: {
		config: {
			models: {
				connection: 'For now, I\'ll pretend you set `config.models.connection`.'
			},
			connections: {
				0: 'For now, I\'ll pretend you set `config.connections`.',
				'*': {
					adapter: 'For now, I\'ll pretend you set `config.connections["%s"].adapter`.'
				}
			}
		},
		classrooms: 'Please use instance rooms instead (or raw sails.sockets.*() methods.)'
	},


	// Strings used in the Sails command-line interface
	cli: {
		new: {
			success: 'Created a new sails app `%s` at %s.', // [ appName, appPath ]
			missingAppName: 'Please choose the name or destination path for your new app.'
		},
		invalid: 'Sorry, I don\'t understand what that means.',
		toGetHelp: 'To get help using the Sails command-line tool, run:\n` $ sails --help `'
	},

	// Strings used by sails-generate
	generate: {},

	// Strings used during sails[lift|load]
	lift: {},


	// Strings used by the core router
	router: {},


	//
	// Links should be language-agnostic if possible
	// but are included here anyway for more flexibility.
	//

	links: {
		docs: {
			migrationGuide: {
				connections: 'http://links.sailsjs.org/docs/config/connections',
				responses: 'http://links.sailsjs.org/config/responses'
			},
			config: {
				blueprints: 'http://links.sailsjs.org/docs/config/blueprints'
			},
			sockets: {
				pubsub: 'http://links.sailsjs.org/docs/config/pubsub'
			}
		}
	}
};
