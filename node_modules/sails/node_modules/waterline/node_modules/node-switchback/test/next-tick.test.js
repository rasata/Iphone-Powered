/**
 * Module dependencies
 */

var assert = require('assert');
var switchback = require('../lib');

describe('synchronous function w/ a switchback ::', function() {


  var someSynchronousFn = function(foobar, cb) {
    var sb = switchback(cb);
    sb.success('some stuff');
    return sb;
  };


  describe('when that function is called using a traditional node callback', function() {
    it('should ensure that at least one cycle of the event loop has elapsed', function(done) {
      var timer = setTimeout(function() {
        return done(new Error('Should have called the switchback event handlers by now!'));
      }, 5);

      someSynchronousFn({
        blah: 'this other argument doesnt matter',
        blahblah: 'its the callback we care about'
      }, function (err, data) {
        clearTimeout(timer);
        if (err) return done(err);
        assert.equal(data, 'some stuff');
        return done();
      });
    });
  });


  describe('when that function is called using a handlers object', function() {

    it('should ensure that at least one cycle of the event loop has elapsed', function(done) {
      var timer = setTimeout(function() {
        return done(new Error('Should have called the switchback event handlers by now!'));
      }, 5);

      someSynchronousFn({
        blah: 'this other argument doesnt matter',
        blahblah: 'its the callback we care about'
      }, {
        error: function(err) {
          clearTimeout(timer);
          return done(err);
        },
        success: function(data) {
          clearTimeout(timer);
          assert.equal(data, 'some stuff');
          return done();
        }
      });
    });

  });


  describe('when that function returns the switchback and relies on its EventEmitter properties', function() {

    it('should ensure that at least one cycle of the event loop has elapsed (to support `.on()` usage)', function(done) {
      var timer = setTimeout(function() {
        return done(new Error('Should have called the switchback event handlers by now!'));
      }, 5);

      someSynchronousFn({
        blah: 'this other argument doesnt matter',
        blahblah: 'its the callback we care about'
      })
      .on('error', function(err) {
        clearTimeout(timer);
        return done(err);
      })
      .on('success', function(data) {
        clearTimeout(timer);
        assert.equal(data, 'some stuff');
        return done();
      });

    });

  });


});
