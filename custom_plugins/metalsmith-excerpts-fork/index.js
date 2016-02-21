
var debug = require('debug')('metalsmith-excerpts');
var extname = require('path').extname;

/**
 * Expose `plugin`.
 */

module.exports = plugin;

/**
 * A Metalsmith plugin to extract an excerpt from Markdown files.
 *
 * @param {Object} options
 * @return {Function}
 */

function plugin(options){
  return function(files, metalsmith, done){
    setImmediate(done);
    Object.keys(files).forEach(function(file){
      debug('checking file: %s', file);
      if (!md(file)) return;
      var data = files[file];

      debug('storing excerpt: %s', file);
      if (data.contents != undefined) {
          data.excerpt = getExcerpt(data.contents.toString());
      }
    });
  };
}

/**
 * Check if a `file` is markdown.
 *
 * @param {String} file
 * @return {Boolean}
 */

function md(file){
  return /\.md?/.test(extname(file));
}

function getExcerpt(data) {
    var re = /[^\r\n]+/;
    //console.log(data);
    var excerpt = re.exec(data);
    
    return excerpt != null ? excerpt[0].trim() : '';
}