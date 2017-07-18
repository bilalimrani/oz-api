
const databaseUtil = require('../../../utils/database_utils');
const apiUtil = require('../../../utils/api_utils');
const configration = require('../../../config')();
const mysql = require('../mysql-client');
const Cryptr = require('cryptr');
cryptr = new Cryptr('Objective Zero');
var Register = function() {
    return {
        checkUserExistence: function(params){
            let email = params.email;
            var query = "select * from users where email = :email";
            var dataObj = {
            	email : email
            }
            return new Promise((resolve,reject)=>{
            	  	databaseUtil.getSingleRecord(mysql,query,dataObj,function(err,data){
		            	if(err){
		            		reject(err);
		            	}
		            	else{
		            		resolve(data);	
		            	} 
            	});

            }); 
           
 		},
 		insertUser: function(params){
 			rand=Math.floor((Math.random() * 100) + 50);
 			var pass = cryptr.encrypt(params.password);
 			var dataObj = {
 				email : params.email,
 				password : pass,
 				deviceId : params.deviceId,
 				deviceType : params.deviceType,
 				email_status : "false",
 				email_verification_code : rand
 			}
 			var table = 'users';
 			return new Promise((resolve,reject)=>{
 					databaseUtil.insertSingleRecord(mysql,table,dataObj,function(err,data){
 						if(err){
 							reject(err);
 						}
 						else{
 							resolve(dataObj);
 						}
 					});
 			});
 		},
 		sendMail: function(data){
 			console.log("Email Data ",data.email)
 			let links ="http://"+configration.path+"/mobile/verify?id="+data.email_verification_code;
 			let subject = "Please confirm your Email account";

 			return new Promise((resolve,reject)=>{
 					apiUtil.sendMail(data.email,subject,links,function(err,result){
 						if(err){

 							reject(err);
 						}
 						else{
 							console.log("mail Send")
 							resolve(result);
 						}
 					});
 			});
 		}	            
	}       
}
module.exports =  new Register;


