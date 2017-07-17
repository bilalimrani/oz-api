var Client = require('mariasql');
var client = new Client();
let db_conf = require('../../config')();

let conf =  db_conf.db;
client.connect(conf, function(err, db) {
    if(err){
     throw err;
    }else{
     console.log('database connection sucessfull');
       // app.set('db', client);
    }

});



module.exports = client; 