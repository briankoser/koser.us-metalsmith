/* metalsmith and plugins */
var Metalsmith = require('metalsmith');
var assets = require('metalsmith-assets');
var collections = require('metalsmith-collections');
var define = require('metalsmith-define');
var drafts = require('metalsmith-drafts');
var excerpts = require('./custom_plugins/metalsmith-excerpts-fork');
var filepath = require('metalsmith-filepath');
var fingerprint = require('metalsmith-fingerprint');
var hyphenate = require('metalsmith-hyphenate');
var ignore = require('metalsmith-ignore');
var inplace = require('./custom_plugins/metalsmith-in-place-fork');
var json_to_files = require('./custom_plugins/metalsmith-json-to-files-fork');
var layouts = require('metalsmith-layouts');
var markdown = require('./custom_plugins/metalsmith-markdown-fork');
var metadata = require('./custom_plugins/metalsmith-metadata-fork');
var permalinks = require('metalsmith-permalinks');
var photoswipe = require('./custom_plugins/metalsmith-photoswipe');
var recipes_to_json = require('./custom_plugins/recipes_to_json/index.js');
// var s3 = require('metalsmith-s3');
var s3_to_json = require('./custom_plugins/s3_to_json/index.js');
var serve = require('metalsmith-serve');
var watch = require('metalsmith-watch');



/* to build for prod, pass a '-p' command line parameter */
var dev = process.argv[2] != "-p";

/* metalsmith 'plugin' that does nothing */
var noop = function(options) {
    return (function(files, metalsmith, done) {
        done();
    });
};

/* don't use certain plugins, depending on whether the build is for dev or prod */
if (dev) {
    fingerprint = noop;
}
else {
    serve = noop;
    //watch = noop;
}



/* main metalsmith function */
Metalsmith(__dirname)
    .source('src')
    .destination('build')
    
    /* define before inplace so inplace can use the globals */
    .use(define({
        development: dev,
        sitelocation: 'http://koser.us',
        sitename: 'koser.us'
    }))
    
    /* drafts before collections so files are removed before being added to collection */
    .use(drafts())
    
    /* collections before inplace so we can loop over them in swig */
    /* collections before markdown so we can just get posts */
    .use(collections({
        gamestats: {
            pattern: 'games/**.md',
            sortBy: 'title',
            reverse: false
        },
        posts: {
            sortBy: 'pubdate',
            reverse: true
        }
    }))
    
    // .use(s3({
    //     action: 'read',
    //     bucket: 'cdn.koser.us',
    //     ignore: ['pictures']
    // }))
    
    .use(recipes_to_json({
        src_path: 'recipes/data/',
        dest_path: 'recipes/data/recipes.json'
    }))
    
    .use(s3_to_json({
        bucket: 'cdn.koser.us',
        dest_path: 'gallery/data/galleries.json',
        ignore: ['index.html', 'pictures/memes', "2014-04-12 Brian's Birthday"]
    }))
    
    .use(metadata({
        data_files: {
            recipes: 'recipes/data/recipes.json',
        },
        delete_original: false
    }))
    
    .use(json_to_files({
        source_path: 'recipes/data/'
    }))
    
    .use(photoswipe())
    
    /* excerpts before inplace so we can use swig templates and data in excerpts */
    .use(excerpts())
    
    .use(fingerprint({ 
        pattern: 'css/main.css'
    }))
    
    /* inplace before markdown so we can convert markdown in data after it's in the template */
    /* inplace before layouts because that's how it is in all examples */
    /* inplace before filepath so we can have location of generated pages */
    .use(inplace({
        engine: 'swig',
        pattern: '**/*.md'
    }))
    
    /* markdown before hyphenate so we have HTML elements */
    .use(markdown({
        smartypants: false,
        recipe_keys: ['comments', 'yield', 'ingredients', 'instructions']
    }))
    
    .use(hyphenate())
    
    .use(permalinks({
        relative: false
    }))
    
    /* filepath before layouts so we can use the location in our Open Graph metadata */
    .use(filepath({
        absolute: true,
        permalinks: true
    }))
    
    .use(layouts({
        engine: 'swig',
        default: 'default.swig',
        pattern: '**/*.html'
    }))
    
    .use(ignore([
        'recipes/data/*'
    ]))
    
    .use(assets({
        source: './assets'
    }))
    
    .use(serve({
        http_error_files: {
            404: "/404.html"
        }
    }))
    
    .use(watch({
        livereload: true
    }))
    
    .build(function(err){
        if (err) throw err;
    });