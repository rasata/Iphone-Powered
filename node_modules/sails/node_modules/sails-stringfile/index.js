/**
 * Module dependencies
 */
var _ = require('lodash')
	, util = require('util')
	, deprecation = require('./deprecation')
	, links = require('./links')
	, gettext = require('./gettext');



module.exports = gettext;
_.extend(gettext, {
	get: gettext,
	logDeprecationNotice: deprecation.logDeprecationNotice,
	logUpgradeNotice: deprecation.logUpgradeNotice,
	logMoreInfoLink: links.logMoreInfoLink,
	logLinks: links.logLinks,
	terminalLinkHelp: links.terminalLinkHelp
});