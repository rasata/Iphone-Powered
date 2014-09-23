var bower = require('bower');
var fsx = require('fs-extra');
var async = require('async');

/**
 * Update client-side dependencies
 */

async.auto({

  'sails.io.js': function(cb) {
    bower.commands
      .install(['sails.io.js'], {
        save: false
      }, { /* custom config */ })
      .on('end', function(installed) {
        fsx.copy(
          'bower_components/sails.io.js/dist/sails.io.js',
          'templates/assets/js/dependencies/sails.io.js',
          cb);
      });
  },

  // ... future front-end dependencies here ...

},
function done(err, async_data) {
  if (err) return console.error(err);

  // Delete bower_components
  fsx.removeSync('bower_components');

  console.log('Done.');
});
