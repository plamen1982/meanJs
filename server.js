var express = require('express');
var passport = require('passport');

//env with values 'production' or 'development'
var env = process.env.NODE_ENV || 'development';

var app = express();

// The config object is a container of everything that is in config.js file,
// the value of env depend from the environment and in this case is working as an string object index with values 'development' or 'production'
var config = require('./server/config/config')[env];

// The objects app and config are included into express.js file and then we have to apply these object into the express.js file with  the next syntax
// module.exports = function(app, config) {and here we can use app and config object}
require('./server/config/express')(app, config);
require('./server/config/mongoose')(config);
require('./server/config/routes')(app, passport);

app.listen(config.port);
console.log('Server running on port: %s , and the NODE_ENV = %s', config.port, process.env.NODE_ENV);