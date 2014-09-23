/**
 * Dependencies
 */
var suites = require('./suites');
var fixtures = require('./fixtures');
var CaptainsLog = require('../');


describe('printf-usage', function() {

  before(function newLog() {
    this.log = new CaptainsLog({
      prefix: '',
      prefixes: null
    });
  });

  describe('sanity check to make sure suite/assertion is working as expected', function() {
    suites.console.checkOutputValue(function customTest(log) {
      log.debug('oh hi');
    }, 'oh hi\n');
  });

  describe('log.debug', function() {
    suites.console.checkOutputValue(function customTest(log) {
      log.debug('foo %d', 3);
    }, 'foo 3\n');
  });

  describe('log', function() {
    suites.console.checkOutputValue(function customTest(log) {
      log('foo %d', 3);
    }, 'foo 3\n');
  });

});
