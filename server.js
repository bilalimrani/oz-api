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
app.use(helmet())
app.use(helmet.noCache())
app.use(helmet.frameguard())

app.use(express.static(__dirname + '/bin'));
app.use(cors());

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
const mobileAssignUserName = require('./oz-api/assignUserName/assignusername');
const mobileAssignUserRole = require('./oz-api/AssignUserRole/assignuserrole');
const mobileBecomeAmbassadorPages = require('./oz-api/BecomeAmbassadorPages/becomeambassadorpages');
const mobileForgetPassword = require('./oz-api/forgetPassword/forgetPassword');
const mobileGetAmbassadorData = require('./oz-api/GetAmbassadorData/getAmbassadorData');
const mobileSignIn = require('./oz-api/signIn/signIn');
const mobileSignOut = require('./oz-api/signOut/signout');
const mobileTwilioChat = require('./oz-api/TwilioChat/twiliochat');
const mobileUpdateAMbassadorProfile = require('./oz-api/UpdateAmbassadorProfile/updateAmbassadorProfile');
const mobileFacebookRegistration = require('./oz-api/FacebookRegistration/facebookregistration')
const mobileAddToFavourite = require('./oz-api/AddToFavourite/addtofavourite');
const mobileID_me = require('./oz-api/ID_me/ID_me')
const mobileFilters = require('./oz-api/FiltersApi/filters')
const mobileambassadorAvalibility = require('./oz-api/ambassadorAvalibility/ambassadorAvalibility')
const mobileResources = require('./oz-api/Resources/resources');
const mobileRecentActivities = require('./oz-api/AmbassadorRecentActivities/ambassadorRecentActivities')
const mobileTour = require('./oz-api/Tour/tour');
const mobileActivities = require('./oz-api/Activities/activities')


app.use('/mobile', mobileRegister)
app.use('/mobile', mobileAssignUserName)
app.use('/mobile', mobileAssignUserRole)
app.use('/mobile', mobileBecomeAmbassadorPages)
app.use('/mobile', mobileForgetPassword)
app.use('/mobile', mobileGetAmbassadorData)
app.use('/mobile', mobileSignIn)
app.use('/mobile', mobileSignOut)
app.use('/mobile', mobileTwilioChat)
app.use('/mobile', mobileUpdateAMbassadorProfile)
app.use('/mobile', mobileFacebookRegistration)
app.use('/mobile', mobileAddToFavourite)
app.use('/mobile', mobileID_me)
app.use('/mobile', mobileFilters)
app.use('/mobile', mobileambassadorAvalibility)
app.use('/mobile', mobileResources)
app.use('/mobile', mobileRecentActivities)
app.use('/mobile', mobileTour)
app.use('/mobile', mobileActivities)
 
var httpServer = http.createServer(app);
//var httpsServer = https.createServer(credentials, app);



httpServer.listen(configuration.port, configuration.host, function () {
    console.log('objective zero is working on ', configuration.host, ':', configuration.port);
});

//httpsServer.listen(configuration.port, configuration.host, function () {
//    console.log('objective zero is working on ', configuration.host, ':', configuration.port);
//});


