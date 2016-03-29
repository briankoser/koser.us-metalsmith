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
 * icon for nav bar
 * 'y' in nav font
 * auto get img height/width
 * generate gallery from json
 * generate list of galleries
 * get thumbnails
 */