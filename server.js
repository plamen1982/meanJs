var port = 3040;

var express = require('express');
var stylus = require('stylus');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var app = express();
var env = process.env.NODE_ENV || 'development';
var port = process.env.PORT || 3030;


var viewEngine = 'jade';
var pathToServerViews = '/server/views';

app.set('view engine', viewEngine);
app.set('views', __dirname + pathToServerViews);
app.use(stylus.middleware(
    {
        src: __dirname + '/public',
        compile: function(str, path) {
            return stylus(str).set('filename', path);
        }
    }
));
app.use(express.static(__dirname + '/public'));

app.get('/partial/:partialName', function(req, res){
    res.render('/parial' + req.paramas.partialName)
});

app.get('*',function(req, res){
    res.render('index',  {message:messageFromDB});
});

if(env == 'development'){
    mongoose.connect('mongodb://localhost/macodingclub');
}
else {
    mongoose.connect('mongodb://admin:98Tu34pA@ds033797.mongolab.com:33797/macodingclub');
}

var db = mongoose.connection;

db.on('open', function(err){
    if(err) {
        console.log('The database could not be opened ' + err);
        return;
    } else {
        console.log('The Database up and rinning....')
    }
});

db.on('error', function(err){
    if(err) {
        console.log('Error : ' + err);
        return;
    }
});

var messageSchema = mongoose.Schema({
    message: String
});

var Message = mongoose.model('Message', messageSchema);
var messageFromDB;


Message.remove({}, function(err){
    if(err){
        console.log('Message cound not be removed: ' + err);
        return;
    }
    else{
        console.log('All Message objects have been removed !!!');
        Message.create({message:'Hi from Mongoose! '})
            .then(function(model){
                console.log(model.message);
                messageFromDB = model.message;
            });
    }
});

app.listen(port);
console.log('Server running on port: %s ', port);
console.log(env);