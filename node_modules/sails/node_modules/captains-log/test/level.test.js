var suites = require('./suites');
var fixtures = require('./fixtures');
var CaptainsLog = require('../');


describe('new CaptainsLog with configured', function () {


	describe('level (silent)', function () {
		before(function newLog() {
			this.log = new CaptainsLog({
				level: 'silent'
			});
		});
		describe(': calling log.error()', function () {
			suites.console.countWrites(fixtures.log.error, 0);
		});
		describe(': calling log.warn()', function () {
			suites.console.countWrites(fixtures.log.warn, 0);
		});
		describe(': calling log.debug()', function () {
			suites.console.countWrites(fixtures.log.debug, 0);
		});
		describe(': calling log()', function () {
			suites.console.countWrites(fixtures.log._call, 0);
		});
		describe(': calling log.info()', function () {
			suites.console.countWrites(fixtures.log.info, 0);
		});
		describe(': calling log.verbose()', function () {
			suites.console.countWrites(fixtures.log.verbose, 0);
		});
		describe(': calling log.silly()', function () {
			suites.console.countWrites(fixtures.log.silly, 0);
		});
	});


	describe('level (error)', function () {
		before(function newLog() {
			this.log = new CaptainsLog({
				level: 'error'
			});
		});
		describe(': calling log.error()', function () {
			suites.console.countWrites(fixtures.log.error, 3);
		});
		describe(': calling log.warn()', function () {
			suites.console.countWrites(fixtures.log.warn, 0);
		});
		describe(': calling log.debug()', function () {
			suites.console.countWrites(fixtures.log.debug, 0);
		});
		describe(': calling log()', function () {
			suites.console.countWrites(fixtures.log._call, 0);
		});
		describe(': calling log.info()', function () {
			suites.console.countWrites(fixtures.log.info, 0);
		});
		describe(': calling log.verbose()', function () {
			suites.console.countWrites(fixtures.log.verbose, 0);
		});
		describe(': calling log.silly()', function () {
			suites.console.countWrites(fixtures.log.silly, 0);
		});
	});

	describe('level (warn)', function () {
		before(function newLog() {
			this.log = new CaptainsLog({
				level: 'warn'
			});
		});
		describe(': calling log.error()', function () {
			suites.console.countWrites(fixtures.log.error, 3);
		});
		describe(': calling log.warn()', function () {
			suites.console.countWrites(fixtures.log.warn, 3);
		});
		describe(': calling log.debug()', function () {
			suites.console.countWrites(fixtures.log.debug, 0);
		});
		describe(': calling log()', function () {
			suites.console.countWrites(fixtures.log._call, 0);
		});
		describe(': calling log.info()', function () {
			suites.console.countWrites(fixtures.log.info, 0);
		});
		describe(': calling log.verbose()', function () {
			suites.console.countWrites(fixtures.log.verbose, 0);
		});
		describe(': calling log.silly()', function () {
			suites.console.countWrites(fixtures.log.silly, 0);
		});
	});

	describe('level (info)', function () {
		before(function newLog() {
			this.log = new CaptainsLog({
				level: 'info'
			});
		});
		describe(': calling log.error()', function () {
			suites.console.countWrites(fixtures.log.error, 3);
		});
		describe(': calling log.warn()', function () {
			suites.console.countWrites(fixtures.log.warn, 3);
		});
		describe(': calling log.debug()', function () {
			suites.console.countWrites(fixtures.log.debug, 3);
		});
		describe(': calling log()', function () {
			suites.console.countWrites(fixtures.log._call, 3);
		});
		describe(': calling log.info()', function () {
			suites.console.countWrites(fixtures.log.info, 3);
		});
		describe(': calling log.verbose()', function () {
			suites.console.countWrites(fixtures.log.verbose, 0);
		});
		describe(': calling log.silly()', function () {
			suites.console.countWrites(fixtures.log.silly, 0);
		});
	});

	describe('level (verbose)', function () {
		before(function newLog() {
			this.log = new CaptainsLog({
				level: 'verbose'
			});
		});
		describe(': calling log.error()', function () {
			suites.console.countWrites(fixtures.log.error, 3);
		});
		describe(': calling log.warn()', function () {
			suites.console.countWrites(fixtures.log.warn, 3);
		});
		describe(': calling log()', function () {
			suites.console.countWrites(fixtures.log._call, 3);
		});
		describe(': calling log.debug()', function () {
			suites.console.countWrites(fixtures.log.debug, 3);
		});
		describe(': calling log.info()', function () {
			suites.console.countWrites(fixtures.log.info, 3);
		});
		describe(': calling log.verbose()', function () {
			suites.console.countWrites(fixtures.log.verbose, 3);
		});
		describe(': calling log.silly()', function () {
			suites.console.countWrites(fixtures.log.silly, 0);
		});
	});

	describe('level (debug)', function () {
		before(function newLog() {
			this.log = new CaptainsLog({
				level: 'debug'
			});
		});
		describe(': calling log.error()', function () {
			suites.console.countWrites(fixtures.log.error, 3);
		});
		describe(': calling log.warn()', function () {
			suites.console.countWrites(fixtures.log.warn, 3);
		});
		describe(': calling log.debug()', function () {
			suites.console.countWrites(fixtures.log.debug, 3);
		});
		describe(': calling log()', function () {
			suites.console.countWrites(fixtures.log._call, 3);
		});
		describe(': calling log.info()', function () {
			suites.console.countWrites(fixtures.log.info, 0);
		});
		describe(': calling log.verbose()', function () {
			suites.console.countWrites(fixtures.log.verbose, 0);
		});
		describe(': calling log.silly()', function () {
			suites.console.countWrites(fixtures.log.silly, 0);
		});
	});

	describe('level (silly)', function () {
		before(function newLog() {
			this.log = new CaptainsLog({
				level: 'silly'
			});
		});
		describe(': calling log.error()', function () {
			suites.console.countWrites(fixtures.log.error, 3);
		});
		describe(': calling log.warn()', function () {
			suites.console.countWrites(fixtures.log.warn, 3);
		});
		describe(': calling log()', function () {
			suites.console.countWrites(fixtures.log._call, 3);
		});
		describe(': calling log.debug()', function () {
			suites.console.countWrites(fixtures.log.debug, 3);
		});
		describe(': calling log.info()', function () {
			suites.console.countWrites(fixtures.log.info, 3);
		});
		describe(': calling log.verbose()', function () {
			suites.console.countWrites(fixtures.log.verbose, 3);
		});
		describe(': calling log.silly()', function () {
			suites.console.countWrites(fixtures.log.silly, 3);
		});
	});

});




