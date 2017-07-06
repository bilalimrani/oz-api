/**
 * Created by ghazanfar on 5/12/17.
 */

"user strict"

const commonUtil = require('../../../utils/utils');
const databaseUtil = require('../../../utils/database_utils');
const apiUtil = require('../../../utils/api_utils');

const _ = require('underscore');
var Cryptr = require('cryptr');
cryptr = new Cryptr('myTotalySecretKey');



//var UserModel = require("../model/users").User;
//var square = require('../model/users').square;

function register(req, res) {

    console.log("req",req.body)
    var globalResObj = {
        responseCode: "",
        message : "",
        response : {
            "firstName" : "",
            "lastName" : "",
            "fb_id" : "",
            "fb_access_token" : "",
            "email" : "",
            "gender" : "",
            "name":"",
            "status" : "",
            "emailStatus" : "",
            "id" : "",
            "access_token" : "",
            "user_role" : "" ,
            "username" : "" , 
            "deviceId" : "" ,
            "deviceType" : "",
            "isverified": ""
        }
    };
    //var cryptr = new Cryptr('myTotalySecretKey');

    console.log("password",req.body.password)

    req.assert('password', 'please put 6 digit password').len(6).notEmpty();
    req.assert('email', 'please put valid email id').isEmail().notEmpty(); 
    req.assert('deviceId', 'please enter device id').notEmpty();
    req.assert('deviceType', 'please enter device type').notEmpty();

    let email = req.body.email;
    let password = req.body.password;
    //let db = req.app.get(db);
    let body = req.body;
    let table = 'users';
    var dbObj  = req.app.get('db');
    let obj = {
        body:body
    };



        var checkUserExist = function (req){
            let table = 'users';
            let dataobj = {
                email:email
            };
            let query  = 'SELECT * FROM users WHERE email = :email' ;
            return new Promise((resolve,reject)=>{
                    // implement logic
                    databaseUtil.getSingleRecord(dbObj,query,dataobj,function (err,data){
                    if(err){
                        console.log("error 1",err)
                        reject(err);
                    }else{
                        if(_.isEmpty(data)){
                            resolve(obj);
                        }else{
                            globalResObj.responseCode = 201;
                            globalResObj.message = 'email already registered';
                            res.json(globalResObj);
                        }
                    }

                });
            });

        };




    var insertUser = function (obj) {



            let bodyyy = obj.body;
            bodyyy.password = cryptr.encrypt(password);
            let access_token = commonUtil.randomString();
            //set session token
            let table = 'users';
            bodyyy.access_token = access_token;
            console.log(req.body);
            return new Promise((resolve,reject)=>{

                databaseUtil.insertSingleRecord(dbObj,table,bodyyy,function (err,result) {
                    if(err){
                         console.log("error 2",err)
                        reject(err);
                    }else {
                        if(_.isEmpty(result.info.insertId)){
                            reject(new Error({responseCode:202,message:"An error occured during insertion",response:{}}))
                        }else{
                            obj.insertedRecordId = result.info.insertId;
                            resolve(obj);
                        }

                    }
                });


            });


    };

        var sendMail = function (obj) {
            return new Promise ((resolve,reject)=>{
                apiUtil.sendMail(email,function (err,result) {
                    if(err){
                         console.log("error 3",err)
                        reject(err);
                    }else{


                        resolve(obj);



                    }
                });
              });
        };

        var returnUser = function (obj) {

            let table = 'users';
            let dataobj = {
                id:obj.insertedRecordId
            };
            let query  = 'SELECT * FROM users WHERE id = :id' ;

            return new Promise((resolve,reject)=>{
                    // implement logic
                    databaseUtil.getSingleRecord(dbObj,query,dataobj,function (err,data){
                    if(err){
                        reject(err);
                    }else{
                        if(_.isEmpty(data)){
                            reject(new Error({responseCode:202,message:"An error occured during insertion",response:{}}))
                        }else{
                            globalResObj.responseCode = 200;
                            globalResObj.message = 'User registered successfully';
                            globalResObj.response.id = parseInt(data[0].id);
                            globalResObj.response.email = data[0].email;
                            globalResObj.response.access_token = data[0].access_token;
                            globalResObj.response.deviceId = data[0].deviceId;
                            globalResObj.response.deviceType = data[0].deviceType;
                            globalResObj.response.fb_id = data[0].fb_id;
                            globalResObj.response.fb_access_token = data[0].fb_access_token;
                            globalResObj.response.username = data[0].username;
                            globalResObj.response.name = data[0].name;
                            globalResObj.response.user_role = data[0].user_role;
                            globalResObj.response.isverified = data[0].isverified;
                            res.json(globalResObj);
                        }
                    }

                });
            });
     
        };



    req.getValidationResult().then(function(result) {
        if(_.isEmpty(result.useFirstErrorOnly().array()[0])){
            checkUserExist(req)
                .then(insertUser)
                .then(sendMail)
                .then(returnUser)
                .catch((e) => {
                res.status(299).json({e});
        });
        }else{
            res.json({responseCode:510,message:"validation error",response:result.useFirstErrorOnly().array()[0]});
        }
    });




}


function signin(req,res){
    console.log('I am in signin');
    var globalResObj = {
        responseCode: "",
        message : "",
        response : {
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
            "access_token" : "",
            "user_role" : "" ,
            "username" : "" ,
            "deviceId" : "" ,           
            "deviceType": "" ,
            "isverified": ""
            
        }
    };


    

    req.assert('email', 'please put valid email id').isEmail().notEmpty();
    req.assert('password', 'please put 6 digit password').len(6).notEmpty();
    req.assert('deviceId', 'please enter device id').notEmpty();
    req.assert('deviceType', 'please enter device type').notEmpty();

        

    let email = req.body.email;
    let password = req.body.password;
    let device_id = req.body.deviceId;
    let device_type = req.body.deviceType;
    let encryptPass = cryptr.encrypt(password);
    let body = req.body;
    let table = 'users';
    var dbObj  = req.app.get('db');
    let obj = {
        body:body
    };
    var userlogin = function (obj) {
        return new Promise((resolve,reject)=>{
                let dataobj = {
                    email:email,
                    password:encryptPass
                };
                let query  = 'SELECT * FROM users WHERE email = :email AND password = :password' ;
                databaseUtil.getSingleRecord(dbObj,query,dataobj,function (err,data){
                if(err){
                    reject(err);
                }else{
                    if(_.isEmpty(data)){
                        res.json({responseCode:203 ,message:"no user exist in database,please register",response:{}});
                    }else{
                        let access_token = commonUtil.randomString();
                        obj.access_token = access_token;
                        resolve(obj);
                    }
                }

            });
        });
    };

    var updateUserSessionToken = function (obj) {

        return new Promise((resolve,reject)=>{

            let query = 'UPDATE users SET access_token = :accessToken , deviceId = :deviceId ,deviceType = :deviceType WHERE email = :email';

            //let dataobj = [obj.access_token,device_id,device_type, email];
            let dataobj = {accessToken: obj.access_token, deviceId: device_id , deviceType : device_type , email : email};
            databaseUtil.updateMultiRecord(dbObj,query,dataobj,function (err,data){
                if(err){
                    reject(err);
                }else{
                    obj.data = data;
                    resolve(obj);
                }

            });

          });
    };

    var returnUser = function (obj) {
        let table = 'users';
        let dataobj = {
            email:email
        };
        let query  = 'SELECT * FROM users WHERE email = :email' ;

        return new Promise((resolve,reject)=>{
                // implement logic
                databaseUtil.getSingleRecord(dbObj,query,dataobj,function (err,data){
                if(err){
                    reject(err);
                }else{
                    if(_.isEmpty(data)){
                        reject(new Error({responseCode:202,message:"An error occured during insertion",response:{}}))
                    }else{

                        console.log(globalResObj);
                        console.log(data);
                        globalResObj.responseCode = 200;
                        globalResObj.message = 'User signin successfully';
                        globalResObj.response.id = parseInt(data[0].id);
                        globalResObj.response.isverified = data[0].isverified;
                        globalResObj.response.firstName = data[0].name;
                        globalResObj.response.email = data[0].email;
                        globalResObj.response.access_token = data[0].access_token;
                        globalResObj.response.username = data[0].username;
                        globalResObj.response.deviceType = data[0].deviceType;
                        globalResObj.response.deviceId = data[0].deviceId;

                        globalResObj.response.user_role = data[0].user_role;
                        
                        res.json(globalResObj);
                    }
                }

            });
    });
    };      
    // calling promises

    req.getValidationResult().then(function(result) {
        if(_.isEmpty(result.useFirstErrorOnly().array()[0])){

            userlogin(req)
                .then(updateUserSessionToken)
                .then(returnUser)
                .catch((e) => {
                res.json({e});
        });
        }else{
            res.json({responseCode:510,message:"validation error",response:result.useFirstErrorOnly().array()[0]});
        }
    });


};

function facebookRegistration (req,res){


    var globalResObject = {
        responseCode: "",
        message : "",
        response : {
            "firstName" : "",
            "lastName" : "",
            "name" : '',
            "fb_id" : "",
            "fb_access_token" : "",
            "email" : "",
            "gender" : "",
            "status" : "",
            "emailStatus" : "",
            "id" : "",
            "user_role" : "" ,
            "access_token" : "",
            "username" : "" ,
            "deviceId" : "" ,
            "deviceType" : "",
            "isverified": ""
        }
    };

    req.assert('fb_id', 'Facebook id field can not be empty').notEmpty();
    req.assert('deviceId', 'Device id field can not be empty').notEmpty();
    req.assert('deviceType', 'DeviceType id field can not be empty').notEmpty();
   // req.assert('fb_access_token', 'Facebook access token field can not be empty').notEmpty();


    let email = req.body.email;
    if(email === undefined){
        email = '';
    }
    let body = req.body;
    let table = 'users';
    var dbObj  = req.app.get('db');
    let obj = {
        body:body
    };
    var insertfbUser = function (req) {

        let access_token = commonUtil.randomString();
        //set session token
        body.access_token = access_token;
        return new Promise((resolve,reject)=>{

                databaseUtil.insertSingleRecord(dbObj,table,body,function (err,result) {
                if(err){
                    reject(err);
                }else {
                    if(_.isEmpty(result.info.insertId)){
                        reject(new Error({responseCode:503,message:"An error occured during insertion",response:{}}))
                    }else{
                        obj.insertedRecordId = result.info.insertId;
                        resolve(obj);
                    }
                }

            });

    });

    };

    var returnUser = function (obj) {
        console.log("json")
        let table = 'users';
        let dataobj = {
            id:obj.insertedRecordId
        };
        let query  = 'SELECT * FROM users WHERE id = :id' ;

        return new Promise((resolve,reject)=>{
                // implement logic
                databaseUtil.getSingleRecord(dbObj,query,dataobj,function (err,data){
                if(err){
                    reject(err);
                }else{
                    if(_.isEmpty(data)){
                        reject(new Error({responseCode:202,message:"An error occured during insertion",response:{}}))
                    }else{
                        globalResObject.responseCode = 200;
                        globalResObject.message = 'User registered successfully with facebook';
                        globalResObject.response.id = parseInt(data[0].id);
        
                        globalResObject.response.access_token = data[0].access_token;
                        globalResObject.response.fb_access_token = data[0].fb_access_token;
                        globalResObject.response.fb_id = data[0].fb_id;
                        globalResObject.response.isverified = data[0].isverified;
                        
                       
                        res.json(globalResObject);
                    }
                }

            });
    });
    }
    // calling promises

    req.getValidationResult().then(function(result) {
        if(_.isEmpty(result.useFirstErrorOnly().array()[0])){
            insertfbUser(req)
                .then(returnUser)
                .catch((e) => {
                res.json({e});
        });
        }else{
            res.json({responseCode:510,message:"validation error",response:result.useFirstErrorOnly().array()[0]});
        }

    });

};

function signout(req,res){


    let email = req.body.email;
    if(email === undefined){
        email = '';
    }
    let access_token = req.headers.access_token;
    let body = req.body;
    let table = 'users';
    var dbObj  = req.app.get('db');
    let obj = {
        body:body
    };
    var removeUserToken = function (req) {
        //set session token

        return new Promise((resolve,reject)=>{

        let query = 'UPDATE users SET access_token = :accessTokenValue  WHERE access_token = :access_token';

        //let dataobj = [obj.access_token,device_id,device_type, email];
        let dataobj = {accessTokenValue: '' ,  access_token : access_token};
        databaseUtil.updateMultiRecord(dbObj,query,dataobj,function (err,data){
            if(err){
                reject(err);
            }else{
                obj.data = data;
                res.json({responseCode:200,message:"User signout successfully",response:{}})
            }

        });

    });

    };

    // calling promises
    removeUserToken(req)
        .catch((e) => {
        res.json({e});
});
};

function forgetPassword(req,res) {


    let email = req.body.email;
    let varification_code = req.body.password_reset_code;
    let proceedtochange  = req.body.changepassword;
    let body = req.body;
    let table = 'users';
    var dbObj  = req.app.get('db');
    let obj = {
        body:body
    };

    var forgetPasswordLogic = function (req) {



        if(varification_code === undefined || varification_code === ''){

            let randomNumber = Math.floor(100000 + Math.random() * 900000);
            let data = {
                passCode  : randomNumber
            };

            return new Promise((resolve,reject)=>{
                apiUtil.sendMailTest(email,data,function (err,result){
                    if (err){
                        reject(err);
                    }else{
                        let query = 'UPDATE users SET password_reset_code = :password_reset_code  WHERE email = :email';
                        let dataobj = {password_reset_code: randomNumber ,  email : email};

                        databaseUtil.updateMultiRecord(dbObj,query,dataobj,function (err,data){
                            if(err){
                                reject(err);
                            }else{
                                res.json({responseCode:200,message:"An email sent to your email",response:"{}"});
                            }

                        });
                    }
                });
            });
        }
        else if(varification_code !== '' || varification_code !== undefined){

            if(proceedtochange === 'proceed'){
                req.assert('password', 'Please put 6 digit password').len(6).notEmpty();
                let re_password = req.body.password ;
                 
                return new Promise((resolve,reject)=>{

                        let dataobj = {
                            email:email
                        };
                let query  = 'SELECT * FROM users WHERE email = :email' ;
                // implement logic
                databaseUtil.getSingleRecord(dbObj,query,dataobj,function (err,data){
                    if(err){
                        reject(err);
                    }else{
                        if(_.isEmpty(data[0].password_reset_code)){
                            res.json({responseCode:404,message:"Please create code first to update your password",response:{}});
                        }else{

                            if(data[0].password_reset_code === varification_code && req.body.password.length >= 6 && req.body.password.length != ""){
                                console.log("Password",req.body.password.length);
                                let encryptPass = cryptr.encrypt(re_password);
                                let query = 'UPDATE users SET password = :password , password_reset_code =:password_reset_code WHERE email = :email';
                                let dataobj = {password_reset_code : '' ,password: encryptPass ,  email : email};

                                databaseUtil.updateMultiRecord(dbObj,query,dataobj,function (err,data){
                                    if(err){
                                        reject(err);
                                    }else{
                                        res.json({responseCode:200,message:"Password reset sucessfully" , response:{}});
                                    }

                                });
                            }
                            else{
                                res.json({responseCode:404,message:"Invalid verification code",response:{}});
                            }

                        }
                    }

                });
            });

            }else {

                let dataobj = {
                    password_reset_code : varification_code,
                    email : email
                };
                let query  = 'SELECT * FROM users WHERE password_reset_code = :password_reset_code AND email=:email' ;

                return new Promise((resolve,reject)=>{
                        // implement logic
                        databaseUtil.getSingleRecord(dbObj,query,dataobj,function (err,data){
                        if(err){
                            reject(err);
                        }else{
                            if(_.isEmpty(data)){
                                res.json({responseCode:404,message:"sorry code not match with database",response:{}});
                            }else{
                                let query = 'UPDATE users SET rest_code_time = :rest_code_time  WHERE password_reset_code = :password_reset_code';
                                let dataobj = {rest_code_time: new Date().toISOString().slice(0, 19).replace('T', ' ') ,  password_reset_code : varification_code};

                                databaseUtil.updateMultiRecord(dbObj,query,dataobj,function (err,data){
                                    if(err){
                                        reject(err);
                                    }else{
                                        res.json({responseCode:200,message:"code varified sucessfully" , response:{}});
                                    }

                                });
                            }
                        }

                    });
            });

            }

       }
       else {

            res.json({responseCode:404,message:"please follow process to reset password",response:{}});

        }

    };

        // calling promises

    forgetPasswordLogic(req)
            .catch((e) => {
            res.json({e});
    }); 
};

function change_password(req,res){
     
        console.log("I am in ")
        req.assert('old_password', 'please put 6 digit password').len(6).notEmpty();
        req.assert('new_password', 'please put 6 digit password').len(6).notEmpty();
        console.log(req.headers.access_token);
        var dbObj  = req.app.get('db');

     var varify_password = function(req){
            console.log("I am here to verify Password")
            var x = req.headers.access_token;
             
            let dataobj = {
                access_token:x
            };
            let query  = 'SELECT * FROM users WHERE access_token = :access_token' ;
            return new Promise((resolve,reject)=>{
                    // implement logic
                    databaseUtil.getSingleRecord(dbObj,query,dataobj,function (err,data){
                    if(err){
                        reject(err);
                    }else{
                       var decrypted = cryptr.decrypt(data[0].password);
                            if(decrypted == req.body.old_password){
                                resolve(req)
                            }
                            else{
                                console.log("OHhhh")
                                res.json({responseCode:200,message:"Can't verify password,Try Again",response:{}})
                            }
                    }

                });
            });
     }

     var add_new_password = function(req){
        console.log("I am in")
        var table = 'users';
        query = 'UPDATE users SET password = :password WHERE access_token = :access_token';
        var pass = cryptr.encrypt(req.body.new_password);
        dataobj = {
            password : pass,
            access_token:req.headers.access_token
        }
        return new Promise((resolve,reject)=>{
       databaseUtil.updateMultiRecord(dbObj,query,dataobj,function (err,data){
             if(err){                
                 reject(err);
             }else{
                 res.json({responseCode:200,message:"password change Sucessfully",response:{}})
                 resolve(data);
             }
         });
       });

     }

   req.getValidationResult().then(function(result) {
        if(_.isEmpty(result.useFirstErrorOnly().array()[0])){
                 varify_password(req)
                .then(add_new_password)
                .catch((e) => {
                res.status(299).json({e});
        });
        }else{
            res.json({responseCode:510,message:"validation error",response:result.useFirstErrorOnly().array()[0]});
        }
    });

}
module.exports = { 
    register: register,
    signin : signin,
    facebookRegistration : facebookRegistration,
    signout : signout,
    forgetPassword : forgetPassword,
    change_password:change_password
}