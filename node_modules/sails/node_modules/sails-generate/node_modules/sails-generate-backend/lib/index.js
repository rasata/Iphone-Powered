/**
 * sails-generate-backend
 *
 * Usage:
 * + Automatically called by `sails new`
 *
 * @type {Object}
 */

module.exports = {

  templatesDirectory: require('path').resolve(__dirname,'../templates'),

  before: require('./before'),

  targets: {

    '.': ['views'],
    './api/controllers': { folder: {}},
    './api/models': { folder: {}},
    './api/policies': { folder: {}},
    './api/services': { folder: {}},
    './api/responses': { folder: {}},

    './api/controllers/.gitkeep': { copy: '.gitkeep'},
    './api/models/.gitkeep': { copy: '.gitkeep'},
    './api/services/.gitkeep': { copy: '.gitkeep'},
    './config/connections.js': { copy: 'config/connections.js' },
    './config/models.js': { copy: 'config/models.js' },
    './config/blueprints.js': { copy: 'config/blueprints.js' },
    './config/bootstrap.js': { copy: 'config/bootstrap.js' },
    './config/cors.js': { copy: 'config/cors.js' },
    './config/csrf.js': { copy: 'config/csrf.js' },
    './config/http.js': { copy: 'config/http.js' },
    './config/globals.js': { copy: 'config/globals.js' },
    './config/i18n.js': { copy: 'config/i18n.js' },
    './config/local.js': { copy: 'config/local.js' },
    './config/log.js': { copy: 'config/log.js' },
    './config/policies.js': { copy: 'config/policies.js' },
    './config/routes.js': { copy: 'config/routes.js' },
    './config/sockets.js': { copy: 'config/sockets.js' },

    './config/session.js': { template: 'config/session.js' },
    './config/views.js': { template: 'config/views.js' },

    './config/locales/de.json': { copy: 'config/locales/de.json' },
    './config/locales/en.json': { copy: 'config/locales/en.json' },
    './config/locales/es.json': { copy: 'config/locales/es.json' },
    './config/locales/fr.json': { copy: 'config/locales/fr.json' },
    './config/locales/_README.md': { copy: 'config/locales/_README.md' },

    './config/env/production.js': { copy: 'config/env/production.js' },
    './config/env/development.js': { copy: 'config/env/development.js' },

    './api/policies/sessionAuth.js': { copy: 'api/policies/sessionAuth.js' },

    './api/responses/badRequest.js': { copy: 'api/responses/badRequest.js' },
    './api/responses/forbidden.js': { copy: 'api/responses/forbidden.js' },
    './api/responses/notFound.js': { copy: 'api/responses/notFound.js' },
    './api/responses/serverError.js': { copy: 'api/responses/serverError.js' },
    './api/responses/ok.js': { copy: 'api/responses/ok.js' },

    // Excluding `res.negotiate()` from the generated files for now,
    // since it's best if its definition is consistent between projects.
    // It can still be overridden by creating api/responses/negotiate.js.
    // './api/responses/negotiate.js': { copy: 'api/responses/negotiate.js' },

  }
};

