var debug = require('debug')('s3_to_json');
var path = require('path');
var slug = require('slug');
var _ = require('underscore');
var AWS = require('aws-sdk');
var async = require('async');


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
            var param = {};
            
            var s3 = new AWS.S3();
            ReadS3Objects();
            
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
        
        function ReadS3Objects() {			
			var filteritems = [];
			var patternitems = {};

			patternitems.prefix = '(^';
			patternitems.suffix = '.*|.*\/$)';
			patternitems.match = false;
			
			param.Bucket = options['bucket'];
			
            if ((options['ignore']) == null) {
                options.ignore = [];
            }
            
			if (!Array.isArray(options['ignore'])) {
				filteritems = [options['ignore']];
			} else {
				filteritems = options['ignore'];
			}
			
			async.waterfall([
				function(next) {
					s3.listObjects(param, next);
				},
				function(response, next) {
					filterList(response, filteritems, patternitems, next);
				},
				function(response, next) {
					listToJSON(response, next);
				}
				],
				function(err, res) {
					result(err, res);
				}
			);
		}
        
        function filterList(response, filteritems, patternitems, next) {
			var contents = response.Contents;
			contents = _.filter(contents, function(obj) {
				if (filteritems.some(function(item) {
					var regx = new RegExp(patternitems.prefix + item + patternitems.suffix);
					return regx.test(obj['Key']);
				})) {
					debug("filtering: " + obj['Key']);
					return patternitems.match;
				}
				return !patternitems.match;
			});
			next(null, contents);			
		}
        
        function listToJSON(list, next) {
// 			async.each(list, function(obj, callback) {
// 				param.Key = obj.Key
// 				s3.getObject(param).on('success', function(response) {
// 					var path = response.request.httpRequest.path;
// 					var spath = "/".concat(response.request.params.Bucket).concat("/");
// 					var data = response.data;
// 					var parsed = front(data.Body.toString());
// 					var file = {};

// 					path = path.replace(spath, '');

// 					file = parsed.attributes;
// 					file.contents = new Buffer(parsed.body);
// 					files[path] = file;
// 					debug("adding file: ", path);
// console.log(path);
// 					callback();
// 				}).send();
// 			}, function(err) {
// 				next(err, 'read from S3 done');
// 			});
		}
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