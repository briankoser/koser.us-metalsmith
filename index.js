var Metalsmith = require('metalsmith'),
    inplace = require('metalsmith-in-place'),
    markdown = require('metalsmith-markdown'),
    permalinks = require('metalsmith-permalinks'),
    serve = require('metalsmith-serve'),
    watch = require('metalsmith-watch');

Metalsmith(__dirname)
    .source('src')
    .destination('build')
    .use(permalinks())
    .use(inplace({
        engine: 'handlebars',
        pattern: '**/*.md'
    }))
    .use(markdown())
    .use(serve())
    .use(watch({
        livereload: true
    }))
    .build(function(err){
        if (err) throw err;
    });