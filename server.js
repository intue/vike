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

app.get('/api/v1/videocategories', function (req, res) {
    res.send(require('./videocategories.json'));
});

app.get('/api/v1/videos', function (req, res) {
    var category = req.query.category || 1;
    if (category == 1) {
        res.send(require('./videos_1.json'));
    } else {
        res.send(require('./videos.json'));
    }
});

app.get('/api/v1/videos/:id', function (req, res) {
    var video = {
        "video": {
            "id": req.params.id,
            "title": "Everything Wrong With Harry Potter & The Goblet Of Fire",
            "thumbnail": "https://i1.ytimg.com/vi/nyugoCASVy8/mqdefault.jpg"
        }
    };
    res.send(video);
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