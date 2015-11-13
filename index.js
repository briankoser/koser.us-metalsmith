var Metalsmith = require('metalsmith'),
    inplace = require('metalsmith-in-place'),
    markdown = require('metalsmith-markdown');

Metalsmith(__dirname)
    .source('src')
    .destination('build')
    .use(inplace({
        engine: 'handlebars',
        pattern: '**/*.md'
    }))
    .use(markdown())
    .build(function(err){
        if (err) throw err;
    });