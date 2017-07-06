/*
 * Objective ZERO
 * Author: Ghazanfar Ali
 * Copyright: adc-oz
 */
"user strict"

const express = require('express');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');

// database connection
const app = express();
 
var Cryptr = require('cryptr'),
    cryptr = new Cryptr('myTotalySecretKey');
             
const _ = require('underscore');
var helmet = require('helmet')
const cors = require('cors');
          
app.use(cors());
app.options('*', cors());
app.use(helmet())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressValidator());
app.use(bodyParser.json());
app.use(express.static(__dirname + '/bin'));
 
const configuration = require('./config')();
const databaseUtil  = require('./utils/database_utils');
app.use(express.static('dist'))
app.use(express.static('api'))
app.set('absolutepaths',configuration.host+":"+configuration.port);
app.set('current_directory', __dirname);
var Client = require('mariasql');

var client = new Client();

let db_conf = configuration.db;
app.set('view engine', 'ejs'); 

// using middlware for token authentication
app.use(function (req, res, next) {

   let  response = {
         "firstName" : "",
            "lastName" : "",
            "fb_id" : "",
            "fb_access_token" : "",
            "email" : "",
            "name":"",
            "gender" : "",
            "status" : "",
            "emailStatus" : "",
            "id" : "",
            "user_role" : "" ,
            "access_token" : "",
            "username" : "" ,
            "deviceId" : "" ,           
            "deviceType": "" ,
            "isverified": ""
    };

    let path = req.url;
    let key = req.headers.access_token;
    let token = req.param('token');
    //console.log("Params Found ",token + "    " + req.url + "   " + __dirname);
    var dbObj  = req.app.get('db');


    // provide this action for register API

    if(path !== '/mobile/register'){

        if(path === '/mobile/signin'){
            // check if already token exist against requested email
            let table = 'users';

            new Promise((resolve, reject)=>{

                let dataobj = {
                    deviceId : req.body.deviceId,
                    email : req.body.email
                }

                let query = 'UPDATE users SET deviceId = :deviceId  WHERE email = :email';
                    
                    databaseUtil.updateMultiRecord(dbObj,query,dataobj,function (err,data){
                        if(err){
                            console.log("I am in err 1",err);
                            reject(err);
                        }else{
                            resolve({result : data})
                        }

                });


            }).then((result)=>{
                let table = 'users';
                let dataobj = {
                    email:req.body.email,
                    password : cryptr.encrypt(req.body.password)
                };

                let query  = 'SELECT * FROM users WHERE email = :email AND password= :password' ;

                databaseUtil.getSingleRecord(dbObj,query,dataobj,function (err,data) {
                    if(err){
                         console.log("I am in err 2",err);
                        res.json({responseCode:202 ,message:"Some error occured while transaction",response:"{}"});
                    }else{
                        if(_.isEmpty(data)){
                            res.json({responseCode:401 ,message:"no user exist in database,please register",response:"{}"});
                        }else{
                            if(_.isEmpty(data[0].access_token)){
                                next();
                            }else{
                                response.id =data[0].id;
                                response.email =data[0].email;
                                response.access_token =data[0].access_token;
                                response.deviceId =data[0].deviceId;
                                response.deviceType =data[0].deviceType;
                                response.deviceType =data[0].fb_id;
                                response.deviceType =data[0].fb_access_token;
                                response.username =data[0].username;
                                response.isverified = data[0].isverified;
                                response.user_role = data[0].user_role;
                                res.json({responseCode:200 ,message:"user already loggedin",response:response});
                                // may be send you back your profile details
                            }
                        }
                    }
                });
            })
            
        }
        else if(path === '/mobile/facebook'){
            let table = 'users';
            console.log('Hello i am  in')
            new Promise((resolve, reject)=>{

                let dataobj = {
                    fb_id:req.body.fb_id,
                    deviceId : req.body.deviceId,
                }

                let query = 'UPDATE users SET deviceId = :deviceId  WHERE fb_id = :fb_id';
                    
                    databaseUtil.updateMultiRecord(dbObj,query,dataobj,function (err,data){
                        if(err){
                             console.log("I am in err 3",err);
                            console.log('Rejection');
                            reject(err);
                        }

                        else{
                            console.log(data)
                            resolve({result : data})
                        }

                });


            }).then((result)=>{
                let table = 'users';
                let dataobj = {
                    fb_id:req.body.fb_id
                };

                console.log("facebook",dataobj)
                let query  = 'SELECT * FROM users WHERE fb_id = :fb_id' ;
                databaseUtil.getSingleRecord(dbObj,query,dataobj,function (err,data) {
                    if(err){
                        res.json({responseCode:503 ,message:"Some error occured while transaction",response:"{}"});
                    }else{
                        if(_.isEmpty(data)){
                            next();
                        }else{
                            response.id =data[0].id;
                            response.email =data[0].email;
                            response.name =data[0].name;
                            response.access_token =data[0].access_token;
                            response.deviceId =data[0].deviceId;
                            response.deviceType =data[0].deviceType;
                            response.fb_id =data[0].fb_id;
                            response.fb_access_token =data[0].fb_access_token;
                            response.username =data[0].username;
                            response.isverified = data[0].isverified;
                            response.user_role = data[0].user_role;
                            res.json({responseCode:200 ,message:"user already registered with facebook",response:response});

                        }
                    }
                });
            })

            
        }
        else if (path === '/mobile/forget_password'){
            let table = 'users';
            let dataobj = {
                email:req.body.email
            };
            let query  = 'SELECT * FROM users WHERE email = :email' ;
            databaseUtil.getSingleRecord(dbObj,query,dataobj,function (err,data) {
                if(err){
                    res.json({responseCode:503 ,message:"Some error occured while transaction",response:"{}"});
                }else{
                    if(_.isEmpty(data)){
                        res.json({responseCode:404 ,message:"no user registered with such email id",response:"{}"});
                    }else{
                        next();
                    }
                }
            });
        }
        else{

            if (key == '' || token == ''){

                console.log('key',key+"----------"+token);
                res.json({responseCode:401 ,message:"please provide access token"});
            }else{
                //varify key from database
                if(_.isEmpty(key)){
                    key = token;
                }
                let table = 'users';
                let dataobj = {
                    access_token:key
                };
                let query  = 'SELECT * FROM users WHERE access_token = :access_token' ;

                databaseUtil.getSingleRecord(dbObj,query,dataobj,function (err,data) {
                    if(err){
                        res.json({responseCode:503 ,message:"Some error occured while transaction",response:"{}"});
                    }else{
                        if (data['info'].affectedRows === '0'){
                            res.json({responseCode:401 , message:"you are not authorized for this action",response:"{}"});
                        }else{

                            req.userData = data[0];
                            req.token = token;
                        
                            next();
                        }
                    }
                });
            }
        }

    }
    else{
        next();
    }


});

client.connect(db_conf, function(err, db) {
    if(err){
     res.end(err);
    }else{
     console.log('database connection sucessfully');
        app.set('db', client);
    }

});

// setting routes directoryss
let mobileRoutes = require('./app/mobile/routes/index');
app.use(mobileRoutes);

app.get('/',(req,res)=>{
    res.status(200).json({message:"Objective Zero API is working :)"});
})


app.listen(configuration.port, configuration.host, function () {
    console.log('objective zero is working on ', configuration.host, ':', configuration.port);
});
