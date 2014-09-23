exports.get = function (obj, path) {
  var get = new Function('_', 'return _.' + path);
  return get(obj);
};

exports.set = function (obj, path, value) {  
  var set = new Function('_', 'val', '_.' + path + ' = val');
  set(obj, value);
};