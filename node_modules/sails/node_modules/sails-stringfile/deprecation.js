/**
 * Module dependencies
 */
var _ = require('lodash')
	, logMoreInfoLink = require('./links').logMoreInfoLink
	, util = require('util');


//
// Used for throttling deprecation notices
// 
var featureCache = {};

module.exports = {

	logUpgradeNotice: function(template, values, log) {
		log = log || console.log;
		if (!_.isArray(values)) values = [values];
		log(util.format.apply(null, [template].concat(values)));
	},
	
	logDeprecationNotice: function(feature, moreInfoURL, log) {

		var time = new Date().getTime();
		if (featureCache[feature] && (featureCache[feature] + 5000 > time)) {
			return false;
		} else featureCache[feature] = time;

		log = log || console.log;
		console.log();
		log(util.format('Deprecated:   `%s`', feature).bold);
		if (moreInfoURL) logMoreInfoLink(moreInfoURL, log);
		return true;
	}
};