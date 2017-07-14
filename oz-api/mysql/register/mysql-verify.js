
const databaseUtil = require('../../../utils/database_utils');
const apiUtil = require('../../../utils/api_utils');
const configration = require('../../../config')();
let mysql = require('../mysql-client');
var Cryptr = require('cryptr');
cryptr = new Cryptr('Objective Zero');
var Verify = function() {
    return {
        verifyLink : function(params){
            var query = "select * from users where email_verification_code=:email_verification_code";
            var dataObj = {
                email_verification_code: params
            }
            return new Promise((resolve,reject)=>{
                databaseUtil.getSingleRecord(mysql,query,dataObj,function(err,data){
                    if(err){
                        reject(err)
                    }
                    else{
                        resolve(data);
                    }
                });
            });
        },
        activateEmail : function(params){
            var query = "update users set email_status=:email_status ,email_verification_code=:email_verification_code where email=:email";
            var dataObj = {
                email_verification_code : '',
                email_status : 'true',
                email : params
            }
            return new Promise((resolve,reject)=>{
                databaseUtil.updateMultiRecord(mysql,query,dataObj,function(err,data){
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
module.exports =  new Verify;


