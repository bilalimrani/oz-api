const express = require('express');
const router = express.Router();
const validator = require('lodash');
const REST_API_STATUS_CODE = require("../../responses");
const verifier_function = require("../verifier");
var AccessToken = require('twilio').AccessToken;
const twilio = require('twilio');
var AccessToken = require('twilio').jwt.AccessToken;
const VideoGrant = AccessToken.VideoGrant;
const databaseUtil = require('../../utils/database_utils');
const apiUtil = require('../../utils/api_utils');
const configration = require('../../config')();
const mysql = require('../mysql/mysql-client');
const serverKey = 'AAAAiIVMfYw:APA91bHjyGZBOmVm0DbaGIqWx_hGlOwvIrIp1_vIzArSdfGXC_zG5_OpB3JnnmAqC3DFGI6bKKabuPqutDnD4jEcKMMlgli5DhumbG5wgqJCnQmzze0Mj-zUx-Vghavt6ucYw_e5qnu-';
const ACCOUNT_SID = 'AC66dd2217bb7590e00ed3e3b6de6d86b0';
const API_KEY_SID = 'SK57a3f01aa2ab80609a9d59f427b4934c';
const API_KEY_SECRET = 'NDHbH3ujBCe6diMiqEpd5JzrabPHso8A';
const APP_SID = 'AP15fb163f116a59de8a753dea5a147474';
const randomstring = require("randomstring");

const FCM = require('fcm-push');

router.post('/twilio_voice',verifier_function.verifier,(req,res)=>{
	let receiver_deviceId;
  var accessToken = new AccessToken(
    ACCOUNT_SID, 
    API_KEY_SID,
    API_KEY_SECRET
  );
  let dataobj = {
    id : req.body.receiver_id
  }
  var p1 = new Promise((resolve, reject)=>{
     let query = `SELECT * FROM users WHERE id = :id`

      databaseUtil.getSingleRecord(mysql,query,dataobj,function (err,data){
        if(err){
          reject(err);
        }
        else{
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
       id : res.locals.id
      }
      let query = `SELECT * FROM users WHERE id = :id`

      databaseUtil.getSingleRecord(mysql,query,dataobj,function (err,data){
        if(err){
          console.log(err)
          reject(err);
        }
        else{
          console.log("response",data)
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

    var message = { 
          to: result[0].receiver_deviceId,
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

    result = {
      sender_accessToken : result[1].sender_Token , 
      type : req.body.type,
    }

    res.send({responseCode : 200, message : "push notification data", response : result})
  });
})

router.post('/cancel_call',verifier_function.verifier,(req,res)=>{
	console.log("Data in body    ",req.body);
  	console.log('id',req.body.user_id);
  let dataobj = {
    id : req.body.user_id
  }

  new Promise((resolve, reject)=>{
    console.log(dataobj)
    let query = `SELECT * FROM users WHERE id = :id`

      databaseUtil.getSingleRecord(mysql,query,dataobj,function (err,data){
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
})

module.exports = router