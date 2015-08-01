var express = require('express');
var stylus = require('stylus');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var passport = require('passport');

// I guess the exports property of module in this case is for including app and config , or maybe is just for exporting these objects so they can become viewable for the project
module.exports = function(app, config){

    app.set('view engine', 'jade');

    //config.rootPath is defined into server.js file
    app.set('views', config.rootPath  + '/server/views');
    app.use(cookieParser());
    app.use(bodyParser());
    //the object sectret is a just a normal string and is going to be used for crypting the sessions
    app.use(session({secret:'I am from bulgaria!'}));
    app.use(stylus.middleware(
        {
            src: config.rootPath + '/public',
            compile: function(str, path) {
                return stylus(str).set('filename', path);
            }
        }
    ));

    app.use(passport.initialize());
    app.use(passport.session());
    app.use(express.static(config.rootPath + '/public'));

};