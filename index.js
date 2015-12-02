var Metalsmith = require('metalsmith');
var collections = require('metalsmith-collections');
var define = require('metalsmith-define');
var excerpts = require('metalsmith-excerpts');
var inplace = require('metalsmith-in-place');
var json_to_files = require('metalsmith-json-to-files');
var layouts = require('metalsmith-layouts');
var markdown = require('metalsmith-markdown');
var metadata = require('metalsmith-metadata');
var permalinks = require('metalsmith-permalinks');
var recipes_to_json = require('./custom_plugins/recipes_to_json/index.js');
var serve = require('metalsmith-serve');
var watch = require('metalsmith-watch');

Metalsmith(__dirname)
    .source('src')
    .destination('build')
    
    /* define before inplace so inplace can use the globals */
    .use(define({
        development: true
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
            pattern: 'blog/**.md',
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
    
    .use(markdown())
    
    /* inplace before layouts because that's how it is in all examples */
    .use(inplace({
        engine: 'swig',
        pattern: '**/*.html'
    }))
    
    .use(excerpts())
    
    .use(permalinks({
        relative: false
    }))
    
    .use(layouts({
        engine: 'swig',
        default: 'default.swig',
        pattern: '**/*.html'
    }))
    
    .use(serve())
    .use(watch({
        livereload: true
    }))
    
    .build(function(err){
        if (err) throw err;
    });