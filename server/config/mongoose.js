var mongoose = require('mongoose');
var passport = require('passport');
var LocalPassport = require('passport-local');


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

    // create the Schema with the types of the data and names of the fields, the mongoose object is already connected with the database
    var userSchema = mongoose.Schema({
        username: String,
        firstName: String,
        lastName: String
/*        salt: String,
        hashPass: String*/
    });

    // create mongoose object User, with the userSchema
    var User = mongoose.model('User', userSchema);
    //in this User object extract from the dataBase
    User.find({}).exec(function(err, collection){
        if(err){
            console.log('Cannot find users: ' + err);
            return;
        }

        if(collection.length === 0){
            User.create({username: 'plamen.hristov', firstName:'Plamen', lastName:'Hristov'});
            User.create({username: 'ivailo.kenov', firstName:'Ivailo', lastName:'Kenov'});
            User.create({username: 'nikolai.it', firstName:'Nikolai', lastName:'Hristov'});
            console.log('Users added to Database... ')
        }
    });

    //create new Instanse of the LocalStrategy, use is for middlewares
    passport.use(new LocalPassport(function(username, password, done){
       User.findOne({username: username}).exec(function(err, user){
           if(err){
               console.log('Error loading user: ' + err);
               return;
           }

           if(user){
               return done(null, user)
           }
           else {
               return done(null, false)
           }
       })
    }));

    passport.serializeUser(function(user, done){
        if(user) {
            done(null, user._id);
        }
    });

    passport.deserializeUser(function(id, done){

        //find user by id
        User.findOne({_id:id}).exec(function(err, user){
            if(user){
                return done(null, user)
            }
            else{
                return done(null, false)
            }
        })
    })
};