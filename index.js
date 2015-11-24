var Metalsmith = require('metalsmith'),
    collections = require('metalsmith-collections'),
    define = require('metalsmith-define'),
    excerpts = require('metalsmith-excerpts'),
    inplace = require('metalsmith-in-place'),
    json_to_files = require('metalsmith-json-to-files'),
    layouts = require('metalsmith-layouts'),
    markdown = require('metalsmith-markdown'),
    permalinks = require('metalsmith-permalinks'),
    serve = require('metalsmith-serve'),
    watch = require('metalsmith-watch');

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
        },
        recipes: {
            pattern: 'recipes/**.json',
            sortBy: 'title',
            reverse: false
        }
    }))
    
    .use(json_to_files({
        source_path: 'src/recipes/data/'
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