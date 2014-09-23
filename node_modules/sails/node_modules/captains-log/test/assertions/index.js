/**
 * Module dependencies
 */
var _ = require('lodash');
var assert = require('assert');



/**
 * `expect`
 */
function expect () {}



/**
 * numWritesToStream
 * 
 * @option  {String} streamId [e.g. stderr]
 * @option  {Finite} numWrites [e.g. 2]
 */
expect.numWritesToStream = function (options) {
	return function () {
		var history = this.logs[options.streamId];
		assert.equal(
			history.length,
			options.numWrites,
			'Unexpected number of writes to ' + options.streamId + ' ' +
			'(' + history.length + ' instead of ' + options.numWrites + ').'
			// '\n\tWrites::  '+ '[' + history + ']'
		);
	};
};



/**
 * numWrites
 * 
 * @option  {Finite} numWrites [e.g. 2]
 */
expect.numWrites = function (options) {
	return function () {
		var history = [];
		_.each(this.logs, function (streamHistory, streamId) {
			history = history.concat(streamHistory);
		});

		assert.equal(
			history.length,
			options.numWrites,
			'Unexpected number of total writes ' +
			'(' + history.length + ' instead of ' + options.numWrites + ').'
			// '\n\tWrites::  '+ '[' + history + ']'
		);
	};
};


/**
 * equals
 * 
 * @option  {String} value [e.g. "My name is Rangor the razorblade, and I have 198 crayons!"]
 */
expect.equals = function (options) {
	return function () {
		var history = [];
		_.each(this.logs, function (streamHistory, streamId) {
			history = history.concat(streamHistory);
		});

		var actualConcatenatedValue = history.join('');

		assert.equal(
			actualConcatenatedValue,
			options.value,
			'Unexpected value written to log ' +
			'("' + actualConcatenatedValue + '" instead of "' + options.value + '").'
		);
	};
};



module.exports = expect;