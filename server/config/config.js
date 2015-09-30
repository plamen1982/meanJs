var path = require('path');
var rootPath = path.normalize(__dirname  + '../../..');

module.exports =  {
    development:{
        rootPath: rootPath,
        db:'mongodb://localhost/macodingclub',
        port: process.env.PORT || 3040
    },
    production:{
        rootPath: rootPath,
        db:'mongodb://paxito1982:aaaaaaaaA@ds033797.mongolab.com:33797/macodingclub',
        port: process.env.PORT || 3040
    }
};

