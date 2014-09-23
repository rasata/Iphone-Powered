/**
 * Dependencies
 */
var StreamObserver = require('fixture-stdout');
var _ = require('lodash');
var expect  = require('../assertions');
var fixtures = require('../fixtures');
var _recordAll = require('../fixtures/_record-all');
var _pauseAll = require('../fixtures/_pause-all');

// Prepare suites of tests
module.exports = {


  console: {

    /**
     * Ensure output value is correct.
     *
     * @param  {[type]} testFn            [description]
     * @param  {[type]} valueExpected     [description]
     * @return {[type]}                   [description]
     */
    checkOutputValue: function ( testFn, valueExpected ) {
      before(function emptyLogsAndInterceptors () {
        this.logs = {};
        this.interceptors = {};
        this.interceptors.stderr = new StreamObserver(process.stderr);
        this.interceptors.stdout = new StreamObserver(process.stdout);
        this.logs.stderr = [];
        this.logs.stdout = [];
      });

      // First build a mock log, then run the test function,
      // passing it as the first argument.
      it('runs the test function', function (){

        var ctx = this;
        var mockLog = _.reduce(_.functions(ctx.log), function (memo, key) {

          var origFn = ctx.log[key];
          memo[key] = function (){
            _recordAll(ctx);
            origFn.apply(ctx.log, Array.prototype.slice.call(arguments));
            _pauseAll(ctx);
          };

          return memo;
        }, function _baseLogFn(){mockLog.debug.apply(ctx.log, Array.prototype.slice.call(arguments));});


        testFn(mockLog);

      });

      // Check for the expected results
      it('should have written: "' + valueExpected + '"' , expect.equals({
        value: valueExpected
      }));
    },

    /**
     * Ensure total number of writes is correct.
     *
     * @param  {[type]} logFn             [description]
     * @param  {[type]} numWritesExpected [description]
     * @return {[type]}                   [description]
     */
    countWrites: function ( logFn, numWritesExpected ) {
      before(function emptyLogsAndInterceptors () {
        this.logs = {};
        this.interceptors = {};
        this.interceptors.stderr = new StreamObserver(process.stderr);
        this.interceptors.stdout = new StreamObserver(process.stdout);
        this.logs.stderr = [];
        this.logs.stdout = [];
      });

      it('works with no arguments', logFn() );
      it('works with one argument', logFn('a thing') );
      it('works with many arguments', logFn('lots', 'of', 'things') );
      it('should have written ' + numWritesExpected + ' things', expect.numWrites({
        numWrites: numWritesExpected
      }));
    },

    /**
     * Ensure console output is written to the proper streams.
     *
     * @param  {[type]} logFn              [description]
     * @param  {[type]} outputExpectations [description]
     * @return {[type]}                    [description]
     */
    countWritesToSpecificStreams: function ( logFn, outputExpectations ) {
      before(function emptyLogsAndInterceptors () {
        this.logs = {};
        this.interceptors = {};
        this.interceptors.stderr = new StreamObserver(process.stderr);
        this.interceptors.stdout = new StreamObserver(process.stdout);
        this.logs.stderr = [];
        this.logs.stdout = [];
      });

      describe('::', function () {
        it('works with no arguments', logFn() );
        it('works with one argument', logFn('a thing') );
        it('works with many arguments', logFn('lots', 'of', 'things') );
      });
      describe('::', function () {
        it('should have written to stderr', expect.numWritesToStream({
            streamId: 'stderr',
            numWrites: outputExpectations.stderr
          }));
        it('should NOT have written to stdout', expect.numWritesToStream({
            streamId: 'stdout',
            numWrites: outputExpectations.stdout
          }));
      });
    }
  }

};



