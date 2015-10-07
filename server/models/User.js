var mongoose = require('mongoose');
var encryption = require('../utilities/encryption');

var userSchema = mongoose.Schema({
    username: {type: String, require:'{PATH} is required', unique: true},
    firstName: {type: String, require:'{PATH} is required'},
    lastName: {type: String, require:'{PATH} is required'},
    salt: String,
    hashPass: String,
    roles:[String]
});
//
userSchema.method({
    authenticate: function(password){

        if (encryption.generateHashedPassword(this.salt, password) === this.hashPass){
            return true;
        }
        else {
            return false;
        }
    }
});

var User = mongoose.model('User', userSchema);

module.exports.seedInitialData = function(){
    User.find({}).exec(function(err, collection){
        if(err){
            console.log('Cannot find users: ' + err);
            return;
        }
        /*User.remove({},function(){});*/
        if(collection.length === 0){
            var salt;
            var hashedPsw;

            salt = encryption.generateSalt();
            hashedPsw = encryption.generateHashedPassword(salt, 'Plamen');
            User.create({username: 'plamen.hristov', firstName:'Plamen', lastname:'Hristov', salt: salt, hashPass: hashedPsw, roles:['admin']});

            salt = encryption.generateSalt();
            hashedPsw = encryption.generateHashedPassword(salt, 'Plamen');
            User.create({username: 'ivailo.kenov', firstName:'Ivailo', lastname:'Kenov', salt: salt, hashPass: hashedPsw, roles:['standard']});

            salt = encryption.generateSalt();
            hashedPsw = encryption.generateHashedPassword(salt, 'Plamen');
            User.create({username: 'nikolai.it', firstName:'Nikolai', lastname:'Hristov', salt: salt, hashPass: hashedPsw});
            console.log('Users added to Database... ')
        }
    });
}