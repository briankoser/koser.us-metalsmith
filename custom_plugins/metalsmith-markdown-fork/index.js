
var basename = require('path').basename;
var debug = require('debug')('metalsmith-markdown');
var dirname = require('path').dirname;
var extname = require('path').extname;
var marked = require('marked');

/**
 * Expose `plugin`.
 */

module.exports = plugin;

/**
 * Metalsmith plugin to convert markdown files.
 *
 * @param {Object} options (optional)
 *   @property {Array} keys
 * @return {Function}
 */

function plugin(options){
  options = options || {};
  var keys = options.keys || [];
  
  var noParagraphsRenderer = new marked.Renderer();
  noParagraphsRenderer.paragraph = (function(text) { return text; });
  var noParagraphsOptions = {};
  noParagraphsOptions = Object.assign(noParagraphsOptions, options);
  noParagraphsOptions.renderer = noParagraphsRenderer;

  return function(files, metalsmith, done){
    setImmediate(done);
    Object.keys(files).forEach(function(file){
      debug('checking file: %s', file);
      if (!markdown(file)) return;
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
     
      if(file.toString().startsWith('recipes/')){
        options.recipe_keys.forEach(function(key) {
          if(Array.isArray(data.data[key]) && data.data[key].length > 0) {
            var items = data.data[key];
            items.forEach(function(item, index) {
              items[index] = marked(item, noParagraphsOptions);
            });
            data.data[key] = items;
          }
          else if (data.data[key] != undefined) {
            data.data[key] = marked(data.data[key], noParagraphsOptions);
          }
        })
      }

      delete files[file];
      files[html] = data;
    });
  };
}

/**
 * Check if a `file` is markdown.
 *
 * @param {String} file
 * @return {Boolean}
 */

function markdown(file){
  return /\.md|\.markdown/.test(extname(file));
}