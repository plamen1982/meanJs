var express = require('express');
var stylus = require('stylus');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var passport = require('passport');
var favicon = require('serve-favicon');

module.exports = function(app, config){

    app.set('view engine', 'jade');

    app.set('views', config.rootPath  + '/server/views');
    app.use(favicon(config.rootPath + '/public/img/favicon.ico'));
    app.use(cookieParser());
    app.use(bodyParser.urlencoded({
        extended: true
    }));
    app.use(bodyParser.json());
    app.use(session({
        'secret':'SecretQuestionForEncryption',
        resave: true,
        saveUninitialized: true
    }));
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