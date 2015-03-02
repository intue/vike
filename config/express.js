// Don't change the order of middlewares.

var express = require('express');
var connect = require('connect');
var evercookie = require('evercookie');
var consolidate = require('consolidate');
var config = require('./config');
var helpers = require('view-helpers');

module.exports = function (app) {

    // assign the swig template engine to .html files
    app.engine('html', consolidate[config.templateEngine]);

    // set .html as the default extension to use when omitted
    app.set('view engine', 'html');

    // Set views path
    app.set('views', config.root + '/app/views');
    
    // Should be placed before express.static
    // To ensure that all assets and data are compressed (utilize bandwidth)
    app.use(express.compress({
        filter: function(req, res) {
            return (/json|text|javascript|css/).test(res.getHeader('Content-Type'));
        },
        // Levels are specified in a range of 0 to 9, where-as 0 is
        // no compression and 9 is best compression, but slowest
        level: 9
    }));

    app.configure(function () {
        
        app.use(express.cookieParser());
        app.use(evercookie.backend());
        app.use(express.session({secret: '1234567890QWERTY'}));
            
        // Request body parsing middleware should be above methodOverride
        app.use(express.urlencoded());
        app.use(express.json()); // parse request body
        app.use(express.methodOverride()); // simulate DELETE and PUT
        
        app.use(connect.logger('short'));
        app.use(connect.favicon('public/img/icons/favicon.ico')); // minimize bandwidth usage utilized by /favicon.ico 
        // Dynamic helpers
        app.use(helpers(config.app.name));
        
        app.use(app.router);
        
        // set the static files location /public/img will be /img for users
        app.use(express.static(config.root + '/public'));
        
        app.use(function (err, req, res, next) {
            // Treat as 404
            if (~err.message.indexOf('not found')) return next();

            // Log it
            console.error(err.stack);

            // Error page
            res.status(500).render('500', {
                error: err.stack
            });
        });
        // Assume 404 since no middleware responded
        app.use(function (req, res) {
            res.status(404).render('404', {
                url: req.originalUrl,
                error: 'Not found'
            });
        });
    });

    // development only
    app.configure('development', function () {
        app.use(express.logger('dev')); // log every request to the console
    });
    
    // Enable jsonp
    app.enable('jsonp callback');
};