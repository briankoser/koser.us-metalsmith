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

/** documentation
 * 1. Install plugin
 * 2. Include js, css: http://photoswipe.com/documentation/getting-started.html > Initialization > Step 1. include JS and CSS files
 * 3. 
 */