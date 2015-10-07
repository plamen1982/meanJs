var mongoose = require('mongoose');
var crypto = require('crypto');

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
        lastName: String,
        salt: String,
        hashPass: String,
        roles:[String]
    });
    //
            userSchema.method({
                authenticate: function(password){

                  if (generateHashedPassword(this.salt, password) === this.hashPass){
                      return true;
                  }
                  else {
                      return false;
                  }
              }
            });


    // create mongoose object User, with the userSchema
    var User = mongoose.model('User', userSchema);
    //in this User object extract from the dataBase

    User.find({}).exec(function(err, collection){
        if(err){
            console.log('Cannot find users: ' + err);
            return;
        }
/*User.remove({},function(){});*/
    if(collection.length === 0){
        var salt;
        var hashedPsw;

        salt = generateSalt();
        hashedPsw = generateHashedPassword(salt, 'Plamen');
        User.create({username: 'plamen.hristov', firstName:'Plamen', lastname:'Hristov', salt: salt, hashPass: hashedPsw, roles:['admin']});

        salt = generateSalt();
        hashedPsw = generateHashedPassword(salt, 'Plamen');
        User.create({username: 'ivailo.kenov', firstName:'Ivailo', lastname:'Kenov', salt: salt, hashPass: hashedPsw, roles:['standard']});

        salt = generateSalt();
        hashedPsw = generateHashedPassword(salt, 'Plamen');
        User.create({username: 'nikolai.it', firstName:'Nikolai', lastname:'Hristov', salt: salt, hashPass: hashedPsw});
        console.log('Users added to Database... ')
    }
});


    //create new Instanse of the LocalStrategy, use is for middlewares


    function generateSalt() {
        return crypto.randomBytes(128).toString('base64');
    }

    function generateHashedPassword(salt, pwd) {
        var hmac = crypto.createHmac('sha1', salt);
        return hmac.update(pwd).digest('hex');
    }

};

