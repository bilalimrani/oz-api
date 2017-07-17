
const databaseUtil = require('../../../utils/database_utils');
const apiUtil = require('../../../utils/api_utils');
const commonUtil = require('../../../utils/utils');
const configration = require('../../../config')();
let mysql = require('../mysql-client');
var Cryptr = require('cryptr');
cryptr = new Cryptr('Objective Zero');
var SignIn = function() {
    return {
        checkAlreadyLogIn : function(params){
            
            var pass = cryptr.encrypt(params.password)
            let query = "select * from users where email=:email and password=:password";
            let dataObj = {
                email : params.email,
                password : pass
            }
            return new Promise((resolve,reject)=>{
                databaseUtil.getSingleRecord(mysql,query,dataObj,function(err,data){
                    if(err){
                      
                        reject(err);
                    }else{
                        resolve(data);
                    }
                })
            }) 
        },
        newLogin : function(params){
            let access_token = commonUtil.randomString();
            var query = "update users set access_token=:access_token,deviceId=:deviceId,deviceType=:deviceType where email=:email";
            var dataObj = {
                email : params.email,
                access_token : access_token,
                deviceId : params.deviceId,
                deviceType : params.deviceType
            }
            return new Promise((resolve,reject)=>{
                databaseUtil.updateMultiRecord(mysql,query,dataObj,function(err,data){
                    if(err){
                        reject(err);
                    }
                    else{
                        resolve(data);
                    }
                });
            });
        },
        returnResponse : function(params){
            let query = "select * from users where email=:email";
            let dataObj = {
                email : params.email
            }
            return new Promise((resolve,reject)=>{
                databaseUtil.getSingleRecord(mysql,query,dataObj,function(err,data){
                    if(err){
                        reject(err);
                    }
                    else{
                        resolve(data);
                    }
                })
            })
        }
     }
 }
module.exports =  new SignIn;


