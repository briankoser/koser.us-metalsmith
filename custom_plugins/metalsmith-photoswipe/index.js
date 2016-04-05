/**
 * Dependencies
 */


/**
 * Helpers
 */


/**
 * Expose `plugin`
 */
module.exports = plugin;

/**
 * Metalsmith plugin for Photoswipe.
 *
 * @param {String or Object} options
 *   @property {String} engine
 *   @property {String} partials (optional)
 *   @property {String} pattern (optional)
 * @return {Function}
 */
function plugin(opts){
    /**
     * Init
     */
    opts = opts || {};

    /**
     * Main plugin function
     */
    return function(files, metalsmith, done){
        done();
    };      
}

/** todo
 * 'y' in nav font
 * img height/width
 * thumbnails
 */