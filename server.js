var express = require('express');
var app = express();
var fs = require('fs');

/**
 * Main application entry file.
 * Please note that the order of loading is important.
 */

// Load configurations
// Set the node environment variable if not set before
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

// Express settings
require('./config/express')(app);

// Bootstrap routes
//var routes_path = __dirname + '/app/routes';
//var walk = function (path) {
//	fs.readdirSync(path).forEach(function (file) {
//		var newPath = path + '/' + file;
//		var stat = fs.statSync(newPath);
//		if (stat.isFile()) {
//			if (/(.*)\.(js$)/.test(file)) {
//				require(newPath)(app);
//			}
//		}
//	});
//};
//walk(routes_path);

app.listen(5800);
console.log("App listening on port 5800");