var path = require('path');
var rootPath = path.normalize(__dirname + '/../..');

module.exports = {
	root: rootPath,
	port: process.env.PORT || 5000,
	db: process.env.MONGOHQ_URL,
	templateEngine: 'swig'
};