const express = require('express');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const helmet = require('helmet')
const cors = require('cors');

var fs = require('fs');
var http = require('http');
//var https = require('https');
//var privateKey  = fs.readFileSync('sslcert/privkey.pem', 'utf8');
//var certificate = fs.readFileSync('sslcert/fullchain.pem', 'utf8');
//
//var credentials = {key: privateKey, cert: certificate};


const app = express();

app.use(cors());
app.use(helmet())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressValidator());
app.use(bodyParser.json());
app.set('view engine', 'ejs'); 



const configuration = require('./config')();

//var Client = require('mariasql');
//
//var client = new Client();
//let db_conf = configuration.db;
//client.connect(db_conf, function(err, db) {
//    if(err){
//     res.end(err);
//    }else{
//     console.log('database connection sucessfully');
//        app.set('db', client);
//    }
//
//});
//let mysql_connection = require('./oz-api/mysql/mysql-client');


app.get('/',(req,res)=>{
    console.log('OZ-DEV-API: GET  ',req.url )
    res.status(200).json({message:"Objective Zero DEV API is working :)"});
})
const mobileRegister = require('./oz-api/register/register');

app.use('/mobile', mobileRegister)



var httpServer = http.createServer(app);
//var httpsServer = https.createServer(credentials, app);



httpServer.listen(configuration.port, configuration.host, function () {
    console.log('objective zero is working on ', configuration.host, ':', configuration.port);
});
//
//httpsServer.listen(configuration.port, configuration.host, function () {
//    console.log('objective zero is working on ', configuration.host, ':', configuration.port);
//});


