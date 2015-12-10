var Metalsmith = require('metalsmith');
var collections = require('metalsmith-collections');
var define = require('metalsmith-define');
var excerpts = require('metalsmith-excerpts');
var filepath = require('metalsmith-filepath');
var ignore = require('metalsmith-ignore');
var inplace = require('metalsmith-in-place');
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
    
    .use(filepath({
        absolute: true,
        permalinks: true
    }))
    
    /* inplace before layouts because that's how it is in all examples */
    /* inplace before markdown so we can convert markdown in data to html after put in swig template */
    .use(inplace({
        engine: 'swig',
        pattern: '**/*.md'
    }))
    
    .use(markdown({
        recipe_keys: ['comments', 'yield', 'ingredients', 'instructions']
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
    
    .use(ignore([
        'recipes/data/*'
    ]))
    
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