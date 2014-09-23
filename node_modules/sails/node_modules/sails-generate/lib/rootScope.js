module.exports = {

  // Configurable misc. options
  engine: 'ejs',
  linker: true,
  adapter: 'sails-disk',
  _maxHops: 100,

  // starting point
  // (should be overidden as needed in generators' `before()` method)
  rootPath: process.cwd(),



  // i.e. command-line arguments
  //
  // For example, if this is `sails-generate-foo`:
  // `sails generate foo bar`
  // -> args = ['bar']
  //
  args: [],


  // current recursion depth w/i a generator's target set
  // (useful for preventing infinite loops)
  _depth: 0

};
