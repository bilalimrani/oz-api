/**
 * Created by ghazanfar on 5/25/17.
 */

"user strict"
var accountSid = 'ACf6bb32df84cb654bbae5ff743ef1c95f';
var authToken = 'b949114c58583bace9a3abbec430bedf';
const commonUtil = require('../../../utils/utils');
const databaseUtil = require('../../../utils/database_utils');
const apiUtil = require('../../../utils/api_utils');
const randomstring = require("randomstring");
const _ = require('underscore');
var AccessToken = require('twilio').AccessToken;

var twilio = require('twilio');
var AccessToken = require('twilio').jwt.AccessToken;
const VideoGrant = AccessToken.VideoGrant;

var serverKey = 'AAAAiIVMfYw:APA91bHjyGZBOmVm0DbaGIqWx_hGlOwvIrIp1_vIzArSdfGXC_zG5_OpB3JnnmAqC3DFGI6bKKabuPqutDnD4jEcKMMlgli5DhumbG5wgqJCnQmzze0Mj-zUx-Vghavt6ucYw_e5qnu-';
var ACCOUNT_SID = 'AC66dd2217bb7590e00ed3e3b6de6d86b0';
var API_KEY_SID = 'SK57a3f01aa2ab80609a9d59f427b4934c';
var API_KEY_SECRET = 'NDHbH3ujBCe6diMiqEpd5JzrabPHso8A';
var APP_SID = 'AP15fb163f116a59de8a753dea5a147474';

const FCM = require('fcm-push');


function assignUserRole(req,res) {

    let globalResObject = {
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
            "access_token" : "",
            "user_role" : "" , 
            "username" : "" ,
            "deviceId" : "" ,
            "deviceType" : "",
            "isverified": ""

        }
    };

    // validations
    req.assert('user_role', 'user role field can not be empty').notEmpty();
    let role  = req.body.user_role;
    let token = req.headers.access_token;
    let body = req.body;
    var dbObj  = req.app.get('db');
    let obj = {
        body:body
    };
   var updateUserRole  = function (req) {

     return new Promise ((resolve,reject)=>{

             let query = 'UPDATE users SET user_role = :user_role  WHERE access_token = :access_token';

             let dataobj = {user_role: role ,  access_token : token};

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
       let dataobj = {
           access_token:token
       };
       let query  = 'SELECT * FROM users WHERE access_token = :access_token' ;

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
                       globalResObject.message = 'user role updated successfully';
                       globalResObject.response.id = data[0].id;
                       globalResObject.response.email = data[0].email;
                       globalResObject.response.access_token = data[0].access_token;
                       globalResObject.response.fb_id = data[0].fb_id;
                       globalResObject.response.fb_access_token = data[0].fb_access_token;
                       globalResObject.response.user_role = data[0].user_role;
                       globalResObject.response.username = data[0].username;
                       globalResObject.response.deviceId = data[0].deviceId;
                       globalResObject.response.deviceType = data[0].deviceType;
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

           // console.log('Face some Problems',result.useFirstErrorOnly().array()[0]);
            updateUserRole(req)
                .then(returnUser)
                .catch((e) => {
                res.json({responseCode:503,message: "something wrong happend while processsing request", error: e});
           });
        }else{
            res.json({responseCode:510,message:"validation error",response:result.useFirstErrorOnly().array()[0]});
        }

    });

};

function assignUserName(req,res) {
    let globalResObject = {
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
            "access_token" : "",
            "user_role" : "" , 
            "username" : "" ,
            "deviceId" : "" ,
            "deviceType" : "",
            "isverified": ""
        }
    };

    // validations
    req.assert('username', 'user name field can not be empty').notEmpty();

    let username  = req.body.username;
    let token = req.headers.access_token;
    let body = req.body;
    var dbObj  = req.app.get('db');
    let obj = {
        body:body
    };

    var checkUserAvailibility  = function (req) {

        let dataobj = {
            username:username
        };
        let query  = 'SELECT * FROM users WHERE username = :username' ;
        return new Promise ((resolve,reject)=>{
        databaseUtil.getSingleRecord(dbObj,query,dataobj,function (err,data){
            if(err){
                reject(err);
            }else{
                if(_.isEmpty(data)){
                    resolve(obj);
                }else{
                    res.json({responseCode:404,message: "username already exist, please choose another one", response:{}});
                }
            }
        });
    });
    };

    var updateUserRole  = function (obj) {

        return new Promise ((resolve,reject)=>{

                let query = 'UPDATE users SET username = :username  WHERE access_token = :access_token';

        let dataobj = {username: username ,  access_token : token};

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
        let dataobj = {
            access_token:token
        };
        let query  = 'SELECT * FROM users WHERE access_token = :access_token' ;

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
                        globalResObject.message = 'user name updated successfully';
                        globalResObject.response.id = data[0].id;
                        globalResObject.response.email = data[0].email;
                        globalResObject.response.access_token = data[0].access_token;
                        globalResObject.response.fb_id = data[0].fb_id;
                        globalResObject.response.fb_access_token = data[0].fb_access_token;
                        globalResObject.response.user_role = data[0].user_role;
                        globalResObject.response.username = data[0].username;
                        globalResObject.response.deviceId = data[0].deviceId;
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
            checkUserAvailibility(req)
                .then(updateUserRole)
                .then(returnUser)
                .catch((e) => {
                res.json({responseCode:503,message: "something wrong happend while processsing request", error: e});
        });
        }else{
            res.json({responseCode:510,message:"validation error",response:result.useFirstErrorOnly().array()[0]});
        }

    });
};


function ambassadorData(req,res){
   let lat = 31.5043031;
   let lng = 74.3293853;
   var dbObj = req.app.get('db');

     var checkUserExist = function (req){
           console.log('Get ambassedor data');
            let query  = 'SELECT * FROM ambassedor';
            console.log(query);

            let dataobj = {

            }
            return new Promise((resolve,reject)=>{
                    // implement logic
                    databaseUtil.getSingleRecord(dbObj,query,dataobj,function(err,data){
                    if(err){
                      console.log("Error ",err);
                        reject(err);
                    }else{

                        console.log('users ',data);
                        resolve(data);
                    }

                });
            });

        };

        var sendResponse = function(data){
           return new Promise((resolve,reject)=>{
                      res.json({responseCode:200,message:"Ambassador record",response: data});
            });
        
        };
        checkUserExist(req)
        .then(sendResponse)
        .catch((e)=>{
             res.status(299).json({message: "something wrong happend while processsing request", error: e});
        });


   var globalResObj = {
    "responseCode" : "200",
    "message" : "Data Retrived Sucessfully",
    "response":{
        "name" : "", 
        "age" : "",
        "gender" : "",
        "email" : "",
        "contact" : "",
        "date_of_birth" : "",
        "city" : "",
        "state" : "",
        "zip_code" : "",
        "service_member" : "", 
        "contact_type" : "",
        "service" : "", 
        "veteran" : "", 
        "mos" : "",
        "component" : "",
        "days_available" : "",
        "lat": 0,
            "lng": 0,
            "time_range_start" : "",
            "time_range_end" :"",
            "is_available_voiceCall" : "",
            "is_available_textChat" : "",
            "is_available_videoCall" : "",
            "profile_pic" : "",
            "thumbnail" : ""

    }
  };
   let ambassadorData = 
  
    [
     {  
        ambasadorId : 3,
        name : "dummy",
        profile_pic : "https://static.pexels.com/photos/423364/pexels-photo-423364.jpeg",
        thumbnail : "https://static.pexels.com/photos/423364/pexels-photo-423364.jpeg",
        age : 23,
        service : "dummy",
        component : "dummy",
        veteran : "dummy",
        mos : 202,
        lat : lat,
        lng : lng
       },
        {
        ambasadorId : 3,
        name : "dummy",
        profile_pic : "https://static.pexels.com/photos/423364/pexels-photo-423364.jpeg",
        thumbnail : "https://static.pexels.com/photos/423364/pexels-photo-423364.jpeg",
        age : 23,
        service : "dummy",
        component : "dummy",
        veteran : "dummy",
        mos : 0202,
        lat : lat,
        lng : lng
       }
    ];

 //  res.json({responseCode:200,message:"Ambassador record",response: ambassadorData});
}


function veteran_verification(){
    ACCOUNT_SID = "SK5565271de7eb25a9d017083bb06123b0";
    APP_SID = "APdd3df2655bbf8b2d46d74807e517b20e";
    API_KEY_SECRET = "Kov0GkslWi4T99roFez33UEI79AI3Hwz";
}

function ambassadorFilter(req, res){

            filter = {
            service : ["USMC", "USMC"],
            veteran : ["OIF", "OIF"],
            component : ["Active Duty", ""],
            MOS : ["MOS", "MOS"],
            distance : ["50 mi", "70 mi", "80 mi"],
            gender : ["Male", "Female"],
            age_range : ["20 to 30", "30 to 40", "40 to 50"]
        }


    res.json({responseCode : 200, message : "ambassador filter record", response :  filter})
    
}

function isFavouriteAmbassador(req, res){
    let isFavourite = {
        responseCode : 200,
        message : "ambassador favourite record",

        isFavouriteAmbassador : {
            access_token : "maZ5glgemNXCrZNOivFnsuallWOIhA8n",
            ambasadorId : 3,
            isavourite : true
        }

    }
    res.json({isFavourite})
}

function favouriteAmbassadorList(req, res){
    let favouriteAmbassadorList = {
        responseCode : 200,
        message : "List of favourite ambassador",
        favouriteAmbassadors : [
            {
              ambasadorId : 3,
              mbassadorName : "devid",
              location : "USA",
              gender : "male",
              service : "USMA"  
            },
           {
              ambasadorId : 3,
              mbassadorName : "devid",
              location : "USA",
              gender : "male",
              service : "USMA"  
            },
            {
              ambasadorId : 3,
              mbassadorName : "devid",
              location : "USA",
              gender : "male",
              service : "USMA"  
            }
        ]
    }

    res.json({favouriteAmbassadorList})
}



function veteran_verification(){

    ACCOUNT_SID = "SK5565271de7eb25a9d017083bb06123b0";
    APP_SID = "APdd3df2655bbf8b2d46d74807e517b20e";
    API_KEY_SECRET = "Kov0GkslWi4T99roFez33UEI79AI3Hwz";
}


function twilio_voice(req, res){

  /*get access_token and receiver_id from reqesut*/
  /*get device id through receiver_id*/

  // Create an Access Token
 let receiver_deviceId;
  var accessToken = new AccessToken(
    ACCOUNT_SID,
    API_KEY_SID,
    API_KEY_SECRET
  );
  var dbObj  = req.app.get('db');

  let dataobj = {
    id : req.body.receiver_id
  }


  var p1 = new Promise((resolve, reject)=>{
     let query = `SELECT * FROM users WHERE id = :id`

      databaseUtil.getSingleRecord(dbObj,query,dataobj,function (err,data){
        if(err){
          reject(err);
        }
        else{
          console.log("data",data)
          receiver_deviceId = data[0].deviceId
          resolve({receiver_deviceId : receiver_deviceId}) 
        }
      });

      
  })

  var p2 = new Promise((resolve, reject)=>{

      let senderapp_identity = randomstring.generate();
      accessToken.identity = senderapp_identity;

      var grant = new VideoGrant();

      let chat_room = randomstring.generate();
      grant.room = chat_room;

      accessToken.addGrant(grant);
      let jwt = accessToken.toJwt();

      var call_obj = {
        chat_room : chat_room,
        sender_Token : jwt
      }

       let dataobj = {
        access_token : req.userData.access_token
      }
      let query = `SELECT * FROM users WHERE access_token = :access_token`

      databaseUtil.getSingleRecord(dbObj,query,dataobj,function (err,data){
        if(err){
          reject(err);
        }
        else{
          var call = Object.assign(data, call_obj)
          resolve(call)
        }
        
      });

      

  })


  Promise.all([p1, p2]).then(result => { 

     var grant = new VideoGrant();
    let receiverapp_identity = randomstring.generate();
    grant.room = result[1].chat_room

    accessToken.identity = receiverapp_identity;
    accessToken.addGrant(grant);
    let jwt = accessToken.toJwt();
    result.receive_Token = jwt

    
    var fcm = new FCM(serverKey);
    
    senderDetail = {
                  "firstName": "",
                  "lastName": "",
                  "name": "",
                  "id": "134",
                  "user_role": "",
                  "username": "",
                 
              }

    let  = Object.assign(senderDetail , result)

    let push = {
      twilio_receivertoken : jwt,
      type : req.body.type,
      receiver_id : req.body.receiver_id,
      senderDetail : {
        "name": result[1][0].name,
        "id": result[1][0].id,
        "user_role": result[1][0].user_role,
        "username": result[1][0].username,
        "profile_img": result[1][0].profile_img        
      }
    }

    /*device id*/
    var message = { 
          to: result[0].receiver_deviceId,
          collapse_key: 'your_collapse_key',
          
          /*notification: {
              title: 'Title of your push notification', 
              body: 'Body of your push notification' 
          },*/
          
          data: {
              push_data : push
          }


    }


    fcm.send(message, function(err, response){
        if (err) {
            console.log("Something has gone wrong!",err)
        } else {
            console.log("Successfully sent with response: ", response)
        }
    })

    result = {
      sender_accessToken : result[1].sender_Token , 
      type : req.body.type,
    }

    res.send({responseCode : 200, message : "push notification data", response : result})
  });
}



function cancel_call(req, res){
  var dbObj  = req.app.get('db');
  console.log("Data in body    ",req.body);
  console.log('id',req.body.user_id);
  let dataobj = {
    id : req.body.user_id
  }

  new Promise((resolve, reject)=>{
    console.log(dataobj)
    let query = `SELECT * FROM users WHERE id = :id`

      databaseUtil.getSingleRecord(dbObj,query,dataobj,function (err,data){
        if(err){


          reject(err);
        }
        else{ 
          resolve(data)
          console.log('Id ',data);
        }
        
      });
  }).then((result)=>{
    var fcm = new FCM(serverKey);


   let push = {
      type : req.body.type,
      receiver_id : parseInt(req.body.user_id)
    }
      var message = { 
          to: result[0].deviceId,

          collapse_key: 'your_collapse_key',
          
          data: {
                push_data : push
          }
    }

    fcm.send(message, function(err, response){
        if (err) {
            console.log("Something has gone wrong!",err)
        } else {
            console.log("Successfully sent with response: ", response)
        }
    })
  })

  res.send({responseCode : 200, message : "Call Disconnected", response : {}})
}


function twilio_chat(req, res){
  
  var accountSid = 'SK5565271de7eb25a9d017083bb06123b0';
  var apiKeySid = 'SK57a3f01aa2ab80609a9d59f427b4934c';
  var apiKeySecret = 'Kov0GkslWi4T99roFez33UEI79AI3Hwz';
  var serviceSid = 'ISfa5ea409d4a94b969401c67dd4404505';
  var identity = '1';

  var token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiIsImN0eSI6InR3aWxpby1mcGE7dj0xIn0.eyJqdGkiOiJTS2FiYjc3OGI1ZDMzMTNhMDRhYzNlOTQ0MWQ0NWRhNTQwLTE0OTcyNTY4MzAiLCJpc3MiOiJTS2FiYjc3OGI1ZDMzMTNhMDRhYzNlOTQ0MWQ0NWRhNTQwIiwic3ViIjoiQUM2NmRkMjIxN2JiNzU5MGUwMGVkM2UzYjZkZTZkODZiMCIsImV4cCI6MTQ5NzI2MDQzMCwiZ3JhbnRzIjp7ImlkZW50aXR5IjoiMTIzNDU2IiwiaXBfbWVzc2FnaW5nIjp7InNlcnZpY2Vfc2lkIjoiSVMwYmU0NDM3ZDBiYTI0ZGVhYWE2ZGYyYTJkNTNjOTkyMSIsImVuZHBvaW50X2lkIjoiaXAtbWVzc2FnaW5nLWRlbW86MTIzNDU2OmRlbW8tZGV2aWNlIn19fQ.Ampy2I-MSOckuzmJZ8rD2xeGxFRIM0OIPjDVOOxK4Ek'
  var endpointId = 'ip-messaging-demo:' + identity + ':demo-device';

 

}


module.exports = {
    assignUserRole:assignUserRole,
    assignUserName : assignUserName,
    ambassadorData : ambassadorData,
    ambassadorFilter : ambassadorFilter,
    isFavouriteAmbassador : isFavouriteAmbassador,
    favouriteAmbassadorList : favouriteAmbassadorList,
    veteran_verification : veteran_verification,
    twilio_voice : twilio_voice,
    twilio_chat : twilio_chat,
    cancel_call : cancel_call
   
};
