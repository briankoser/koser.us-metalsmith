var debug = require('debug')('s3_to_json');
var path = require('path');
var slug = require('slug');
var _ = require('lodash');
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
    options = options || {};
    options.dest_path = options.dest_path.replace(/\/$/, '').replace(/(\/|\\)/g, path.sep);
    
    return function(files, metalsmith, done) {
        if(Object.keys(files).indexOf(options.dest_path) > -1) {
            var param = {};
            
            var s3 = new AWS.S3();
            ReadS3Objects();
        }
        
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
				},
                function(response, next) {
                    setImmediate(done);
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
            var paths = _.map(list, function(x) {
                return x.Key;
            });
            
            var json = _.map(paths, function(path) {
                var obj = {};
                obj.album = _.trim(path.match(/\/[^\/]+\//)[0], '/');
                
                obj.date = obj.album.slice(0, 10);
                obj.title = obj.album.slice(11);
                
                if (!isValidDate(new Date(obj.date))) {
                    obj.date = obj.album.slice(0, 7);
                    obj.title = obj.album.slice(8);
                    
                    if (!isValidDate(new Date(obj.date))) {
                        obj.date = obj.album.slice(0, 4);
                        obj.title = obj.album.slice(5);
                                
                        if (!isValidDate(new Date(obj.date))) {
                            return null;
                        }
                    }
                }
                
                obj.path = path;
                return obj;
            });
            
            json = _.reduce(json, function(gallery, file) { 
                if (gallery[file.album] == undefined) {
                    var album = {};
                    album.title = file.title;
                    album.date = file.date;
                    album.images = [];
                    
                    if (isZipFileName(file.path)) {
                        album.zip = file.path;
                    }
                    else {
                        var image = { 'src': 'http://' + options.bucket + '/' + file.path,
                    "w": 979, "h": 1306 };
                        album.images.push(image);
                    }
                    
                    gallery[file.album] = album;
                }
                else {
                    if (isZipFileName(file.path)) {
                        gallery[file.album].zip = file.path;
                    }
                    else {
                        var image = { 'src': 'http://' + options.bucket + '/'  + file.path,
                        "w": 979, "h": 1306 };
                        gallery[file.album].images.push(image);
                    }
                }
                
// pictures: [
//     {
//         "src": "http://cdn.koser.us/pictures/2015-09-03-lydia-born/2015-09-03-lydia-born-001.jpg",
//         "w": 384,
//         "h": 512
//     },
//     {
//         "src": "http://cdn.koser.us/pictures/2015-09-03-lydia-born/2015-09-03-lydia-born-002.jpg",
//         "w": 979,
//         "h": 1306
//     },
//     {
//         "src": "http://cdn.koser.us/pictures/2015-09-03-lydia-born/2015-09-03-lydia-born-003.jpg",
//         "w": 979,
//         "h": 1306
//     },
//     {
//         "src": "http://cdn.koser.us/pictures/2015-09-03-lydia-born/2015-09-03-lydia-born-005.jpg",
//         "w": 1306,
//         "h": 979
//     }
// ]
                
                return gallery;
            }, {});
            
            json = _.map(json, function(value, key) { 
                value.path = key;
                return value; 
            });
            
            var data = files[options.dest_path];
            data.contents = new Buffer(JSON.stringify(json));
            files[options.dest_path] = data;
            
            next(null, null);
		}
    };
}

/**
 * Check if a `string` is a valid date.
 *
 * @param {String} date
 * @return {Boolean}
 */

var isValidDate = function (o) {
    return _.isDate(o) && !_.isNaN(o.getTime());
}

/**
 * Check if a `string` is a zip file name.
 *
 * @param {String} fileName
 * @return {Boolean}
 */

var isZipFileName = function(s) {
    return /^.*\.zip$/.test(s);
}