var mongoose = require('mongoose');
var user = require('../models/User');


module.exports = function(config) {
    mongoose.connect(config.db);
    var db = mongoose.connection;

    db.once('open', function(err){
        if(err) {
            console.log('The database could not be opened ' + err);
            return;
        }
        console.log('The Database up and running....')
    });

    db.on('error', function(err){
        console.log('Error : ' + err);
        return;
    });
    user.seedInitialData();
};

