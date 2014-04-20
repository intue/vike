var express = require('express');
var app = express();
var fs = require('fs');
var uuid = require('uuid');
var crypto = require('crypto');
var decryptKey = 'vx6r9Dy7Li6PG3LsiAOP';

/**
 * Main application entry file.
 * Please note that the order of loading is important.
 */

// Load configurations
// Set the node environment variable if not set before
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

// Express settings
require('./config/express')(app);

require('./api/googledata')(app);

app.get('/api/v2/user/initialize', function (req, res) {
    var cipher = crypto.createCipher('aes-256-cbc', decryptKey);
    var encryptedUserId = cipher.update(userId, 'utf8', 'base64');
    encryptedUserId = encryptedUserId + cipher.final('base64');
    res.end(encryptedUserId);
});

app.post('/api/v2/userbehaviour', function (req, res) {
    var decipher = crypto.createDecipher('aes-256-cbc', decryptKey);
    var decryptedUser = decipher.update(decodeURIComponent(req.headers.vikeyr), 'base64', 'utf8');
    decryptedUser = decryptedUser + decipher.final('utf8');
    console.log('statistics ', decryptedUser, req.body);
    res.status(201);
    res.end();
});

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