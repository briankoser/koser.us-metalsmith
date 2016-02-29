var Metalsmith = require('metalsmith');
var assets = require('metalsmith-assets');
var collections = require('metalsmith-collections');
var define = require('metalsmith-define');
var excerpts = require('./custom_plugins/metalsmith-excerpts-fork');
var filepath = require('metalsmith-filepath');
var fingerprint = require('metalsmith-fingerprint');
var ignore = require('metalsmith-ignore');
var inplace = require('./custom_plugins/metalsmith-in-place-fork');
var json_to_files = require('./custom_plugins/metalsmith-json-to-files-fork');
var layouts = require('metalsmith-layouts');
var markdown = require('./custom_plugins/metalsmith-markdown-fork');
var metadata = require('./custom_plugins/metalsmith-metadata-fork');
var permalinks = require('metalsmith-permalinks');
var recipes_to_json = require('./custom_plugins/recipes_to_json/index.js');
var serve = require('metalsmith-serve');
var watch = require('metalsmith-watch');

Metalsmith(__dirname)
    .source('src')
    .destination('build')
    
    /* define before inplace so inplace can use the globals */
    .use(define({
        development: true,
        sitelocation: 'http://koser.us',
        sitename: 'koser.us'
    }))
    
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
    
    .use(recipes_to_json({
        src_path: 'recipes/data/',
        dest_path: 'recipes/data/recipes.json'
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
    
    .use(markdown({
        recipe_keys: ['comments', 'yield', 'ingredients', 'instructions']
    }))
    
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