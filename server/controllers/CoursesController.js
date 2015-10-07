var Course = require('mongoose').model('Course');

module.exports.getAllCourses = function(req, res, next){
    Course.find({}).exec(function(err, collection) {
        if (err) {
            console.log('Courses could not be loaded: ' + err);
        }
        res.send(collection);
    })
};