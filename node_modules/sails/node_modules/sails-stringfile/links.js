/**
 * Module dependencies
 */

var _ = require('lodash')
	, util = require('util');



// Used to detect terminal-URL support (for help links)
var IS_MACOS = require('os').platform().match(/darwin/);

module.exports = {

	logMoreInfoLink: function(url, log) {
		log = log || console.log;
		if (IS_MACOS) {
			log('See ' + util.format('%s'.underline, url));
			log('(⌘ + double-click to open link from terminal)'.grey);
		} else return log(util.format('(see %s)', url));
	},

	logLinks: function(urls, log) {
		log = log || console.log;
		_.each(urls, function(url) {
			log(' ->', util.format('%s'.underline, url));
		});
		if (IS_MACOS) {
			log('    (⌘ + double-click to open links from terminal)'.grey);
		}
		module.exports.terminalLinkHelp(log);
	},

	terminalLinkHelp: function (log) {
		log = log || console.log;
		if (IS_MACOS) {
			log('(⌘ + double-click to open links from terminal)'.grey);
		}
	}
};