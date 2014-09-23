/**
 * Module dependencies
 */

var path = require('path');
var _ = require('lodash');
var fsx = require('fs-extra');
var r_buildDiskReceiverStream = require('./standalone/build-disk-receiver-stream');



/**
 * skipper-disk
 *
 * @type {Function}
 * @param  {Object} options
 * @return {Object}
 */

module.exports = function DiskStore(options) {
  options = options || {};

  var log = options.log || function _noOpLog() {};

  var adapter = {

    rm: function(fd, cb) {
      return fsx.unlink(fd, function(err) {
        // Ignore "doesn't exist" errors
        if (err && (typeof err !== 'object' || err.code !== 'ENOENT')) {
          return cb(err);
        } else return cb();
      });
    },

    ls: function(dirpath, cb) {
      return fsx.readdir(dirpath, function (err, files){
        if (err) return cb(err);
        files = _.reduce(_.isArray(files)?files:[], function (m, filename){
          var fd = path.join(dirpath,filename);
          m.push(fd);
          return m;
        }, []);
        cb(null, files);
      });
    },

    read: function(fd, cb) {
      if (cb) {
        return fsx.readFile(fd, cb);
      } else {
        return fsx.createReadStream(fd);
      }
    },

    receive: function (options){
      return r_buildDiskReceiverStream(options);
    }
  };

  return adapter;
};




