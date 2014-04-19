var express = require('express');
var app = express();
var fs = require('fs');
var uuid = require('uuid');
var crypto = require('crypto');
var decryptKey = '1234567890';



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

app.get('/api/v2/user/recover/:recoveryKey', function (req, res) {
    console.log(req.params.recoveryKey);
    if (req.params.recoveryKey) {
        if (req.params.recoveryKey === 'anonymous') {
            res.setHeader('Content-Type', 'application/javascript');
            if (!req.session.userVikey) {
                var userId = uuid.v1();
                req.session.userVikey = {
                    userId: userId
                };
                var cipher = crypto.createCipher('aes-256-cbc', decryptKey);
                var encryptedUserId = cipher.update(userId, 'utf8', 'base64');
                encryptedUserId = encryptedUserId + cipher.final('base64')
                res.end('restoreUserSession(\'' + encryptedUserId + '\')')
            } else {
                res.end('restoreUserSession(\'known\')');
            }
        } else {
            
            var decipher = crypto.createDecipher('aes-256-cbc', decryptKey);
            var decryptedUserId = decipher.update(req.params.recoveryKey, 'base64', 'utf8');
            decryptedUserId = decryptedUserId + decipher.final('utf8');

            req.session.userVikey = {
                userId: decryptedUserId
            };
            res.end();
        }
    }
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