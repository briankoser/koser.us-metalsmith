var basename = require('path').basename;
var debug = require('debug')('metalsmith-markdown');
var dirname = require('path').dirname;
var extname = require('path').extname;
var slug = require('slug');


/**
 * Expose `plugin`.
 */

module.exports = plugin;

/**
 * Metalsmith plugin to convert recipe files to JSON.
 *
 * @param {Object} options (optional)
 *   @property {Array} keys
 * @return {Function}
 */

function plugin(options){
  options = options || {};
  var keys = options.keys || [];

  return function(files, metalsmith, done){
    setImmediate(done);
    Object.keys(files).forEach(function(file){
      debug('checking file: %s', file);

      var data = files[file];
      var dir = dirname(file);
      var html = basename(file, extname(file)) + '.html';
      if ('.' != dir) html = dir + '/' + html;

      debug('converting file: %s', file);
      var str = marked(data.contents.toString(), options);
      data.contents = new Buffer(str);
      keys.forEach(function(key) {
        data[key] = marked(data[key], options);
      });

      delete files[file];
      files[html] = data;
    });
  };
}
