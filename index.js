var Metalsmith = require('metalsmith'),
    collections = require('metalsmith-collections'),
    excerpts = require('metalsmith-excerpts'),
    inplace = require('metalsmith-in-place'),
    layouts = require('metalsmith-layouts'),
    markdown = require('metalsmith-markdown'),
    permalinks = require('metalsmith-permalinks'),
    serve = require('metalsmith-serve'),
    watch = require('metalsmith-watch');

Metalsmith(__dirname)
    .source('src')
    .destination('build')
    
    .use(inplace({
        engine: 'swig',
        pattern: '**/*.md'
    }))
    
    .use(markdown())
    
    .use(excerpts())
    
    .use(collections({
        posts: {
            pattern: 'blog/**.html',
            sortBy: 'date',
            reverse: true
        }
    }))
    
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