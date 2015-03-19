var express = require('express');
var app = express();
var http = require('http');
var server = http.createServer(app);
var io = require('socket.io').listen(server);
var fs = require('fs');
var uuid = require('uuid');
var crypto = require('crypto');
var decryptKey = 'vx6r9Dy7Li6PG3LsiAOP';
var EventEmitter = require('events').EventEmitter;
var emitter = new EventEmitter();

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
    //var decipher = crypto.createDecipher('aes-256-cbc', decryptKey);
    //var decryptedUser = decipher.update(decodeURIComponent(req.headers.vikeyr), 'base64', 'utf8');
    //decryptedUser = decryptedUser + decipher.final('utf8');
    emitter.emit('userPlaying', {
        data: req.body,
        channel: 'abc'
    });
    //console.log('statistics ', decryptedUser, req.body);
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

server.listen(process.env.PORT || 5000);

io.sockets.on('connection', function (socket) {
    //https://github.com/LearnBoost/socket.io/wiki/Rooms
    //http://stackoverflow.com/questions/16423150/socket-io-subscribe-to-multiple-channels
    //https://github.com/LearnBoost/Socket.IO/wiki/Configuring-Socket.IO
    socket.on('subscribe', function (channel) {
        console.log('joining channel', channel);
        socket.join(channel);
    });

    socket.on('unsubscribe', function (channel) {
        console.log('leaving channel', channel);
        socket.leave(channel);
    });
});


emitter.on('userPlaying', function (channeldata) {
    io.sockets.in(channeldata.channel).emit('event', channeldata.data);
});

console.log("App listening on port 5800");