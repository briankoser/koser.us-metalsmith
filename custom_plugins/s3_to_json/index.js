var debug = require('debug')('s3_to_json');
var path = require('path');
var slug = require('slug');


/**
 * Expose `plugin`
 */

module.exports = plugin;

/**
 * Metalsmith plugin to create a JSON file listing files in an S3 bucket.
 *
 * @param {Object} options (optional)
 *   @property {Array} keys
 * @return {Function}
 */

function plugin(options) {
    // options = options || {};
    // options.src_path = options.src_path.replace(/\/$/, '').replace(/(\/|\\)/g, path.sep);
    // options.dest_path = options.dest_path.replace(/\/$/, '').replace(/(\/|\\)/g, path.sep);
    
    // var recipes = [];
    return function(files, metalsmith, done) {
        if(Object.keys(files).indexOf(options.dest_path) > -1) {
            // todo
            // read paths from s3
            // create json file: [ { 'title':'', 'date':'', images:[ { 'name':'image1.jpg', 'height':10, 'width':10 } ] } ]
            
            
            
            
        //     Object.keys(files).forEach(function(file) {
        //         debug('checking file: %s', file);
        //         if (path.dirname(file) != options.src_path) return;
        //         if (!isTextFile(file)) return;
    
        //         debug('converting file: %s', file);
        //         recipes.push(recipeToJson(files[file].contents.toString(), options));
    
        //         // delete files[file];
        //     });
    
        //     var data = files[options.dest_path];
        //     data.contents = new Buffer(JSON.stringify(recipes));
        //     files[options.dest_path] = data;
        }
        
        setImmediate(done);
    };
}

/**
 * Check if a `file` is a text file.
 *
 * @param {String} file
 * @return {Boolean}
 */

var isTextFile = function(file) {
    return /\.txt/.test(path.extname(file));
}

/**
 * Convert a Koser Recipe `src` to a JSON object.
 *
 * @param {String} src
 * @param {Object} options (optional)
 * @return {Object}
 */

var recipeToJson = function(src, options) {
    if (src == '') return src;
    
    var json = {};
    
    json['datemodified'] = new Date();
    
    var name = src.match(/(Name: )([A-Za-z0-9&'",\- ]+)/);
    if (name != undefined)
    {
        json['name'] = name[2];
        json['urlname'] = slug(name[2], {lower: true});
    }
    
    var keywords = src.match(/(Tags: )([A-Za-z0-9&'\- ]+)/);
    if (keywords != undefined)
    {
        json['keywords'] = keywords[2].split(' ');
    }
    
    var author = src.match(/(Author: )([A-Za-z0-9 ]+)/);
    if (author != undefined)
    {
        json['author'] = author[2];
    }
    
    var comments = src.match(/(Comments: )(.+)/);
    if (comments != undefined)
    {
        json['comments'] = comments[2];
    }
    
    var recipe_yield = src.match(/(Yield: )([A-Za-z0-9\-" ]+)/);
    if (recipe_yield != undefined)
    {
        json['yield'] = recipe_yield[2];
    }
    
    // ['Name', 'Author', 'Comments', 'Yield'].forEach(function(item, index) {
        // var pattern = '/(' + item + ": )([A-Za-z0-9&'\\- ]+)/";
        // var regex = new RegExp(pattern);
        // var field = src.match(regex);
        // json['koser'] = field;
        // if(field != undefined)
        // {
            // json[item.toLowerCase()] = field[2];
        // }
    // });
    
    var ingredients = src.match(/(?:Ingredients:)([\s\S]*)(?=Directions)/);
    if (ingredients != undefined)
    {
        ingredients = ingredients[1]
            .split('\n- ')
            .filter(function(n){ return n.trim() != '' });
        ingredients.forEach(function(item, index){ ingredients[index] = item.trim()});
        json['ingredients'] = ingredients;
    }
    
    var directions = src.match(/(?:Directions:)([\s\S]*)(?=Yield)/);
    if (directions != undefined)
    {
        directions = directions[1]
            .split('\n- ')
            .filter(function(n){ return n.trim() != '' });
        directions.forEach(function(item, index){ directions[index] = item.trim()});
        json['instructions'] = directions;
    }
    
    return json;
}