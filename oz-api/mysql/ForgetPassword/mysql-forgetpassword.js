const databaseUtil = require('../../../utils/database_utils');
const apiUtil = require('../../../utils/api_utils');
const commonUtil = require('../../../utils/utils');
const configration = require('../../../config')();
const mysql = require('../mysql-client');
const validator = require('lodash');
console.log("mysql-forgetpassword file");
var Cryptr = require('cryptr');
cryptr = new Cryptr('Objective Zero');
var updateVerification = function(params){
			let query = 'UPDATE users SET rest_code_time = :rest_code_time  WHERE email = :email';
            let dataobj = {rest_code_time: new Date().toISOString().slice(0, 19).replace('T', ' ') ,  email : params.email};
            return new Promise((resolve,reject)=>{
                databaseUtil.updateMultiRecord(mysql,query,dataobj,(err,data)=>{
                    if(err){
                        reject(err);
                        }
                    else{
                    console.log("verified...............")
                    data = "verified";
                    resolve(data);
                    }
                }) 
        })
}

var updatePassword = function(params){
			console.log("I am here to updatePassword")
			let encryptPass = cryptr.encrypt(params.password);
            let query = 'UPDATE users SET password = :password , password_reset_code =:password_reset_code WHERE email = :email';
            let dataobj = {password_reset_code : '' ,password: encryptPass ,  email : params.email};
            return new Promise((resolve,reject)=>{
            	databaseUtil.updateMultiRecord(mysql,query,dataobj,function (err,data){
            		if(err){
	                	reject(err);
                   	}else
                   	{
                    	resolve(data);
               		}

                });
        	});
}

var ForgetPassword = function(){
	return{
		forgetPassword : function(params){
			console.log("I am in forgetPassword function of mysql-forgetpassword");
			let varification_code = params.password_reset_code;
			let proceedtochange  = params.changepassword;
			if(varification_code === '' || varification_code === undefined){
				let randomNumber = Math.floor(100000 + Math.random() * 900000);
				let data = {
                passCode  : randomNumber
           		};
            	return new Promise((resolve,reject)=>{
                	apiUtil.sendMailTest(params.email,data,function (err,result){
                    	if (err){
                       		reject(err);
                   		 }
                   		 else{
                        	let query = 'UPDATE users SET password_reset_code = :password_reset_code  WHERE email = :email';
                        	let dataobj = {password_reset_code: randomNumber ,  email : params.email};

                        	databaseUtil.updateMultiRecord(mysql,query,dataobj,function (err,data){
                           		if(err){
                                	reject(err);
                            	}
                            	else{
                            		if(data.info.affectedRows == '1'){
                            			data = "code";
                            		
                                		resolve(data);
                            		}
                            		else{
                            			data = "not found";
                            	
                                		resolve(data);
                            		}
                            		
                            		
                            	}

                        	});
                    	}
                	});
           	 });
			}
			else{
				if(proceedtochange == 'proceed'){
					let dataobj = {
						email : params.email
					}
					let query = "SELECT password_reset_code from users WHERE email =:email";
					return new Promise((resolve,reject)=>{
						databaseUtil.getSingleRecord(mysql,query,dataobj,(err,data)=>{
							if(err){
								reject(err);
							}	
							else{
								if(data[0].password_reset_code === params.password_reset_code){
									if(params.password.length > 5){
										data = "sucess";
										updatePassword(params)
										.then(resolve(data))
										.catch((err)=>{
											reject(err);
										})
									}
									else{
										data = "range"
										resolve(data);
									}
								}
								else{
									data = "Not Verified"
									resolve(data);
								}
							}
						})
					})
				}
				else{
					let dataobj = {
                    password_reset_code : varification_code,
                    email : params.email
               		};
               		let query = "SELECT * FROM users WHERE password_reset_code = :password_reset_code AND email=:email";
               		return new Promise((resolve,reject)=>{
               			databaseUtil.getSingleRecord(mysql,query,dataobj,(err,data)=>{
               				if(err){
               					reject(err);
               				}
               				else{
               					if(validator.isEmpty(data)){
               						console.log("Not verifyyyyyyyyyyyyyyy")
               						data = "Not Verified";
               						resolve(data);
               					}
               					else{
               						data = 'verified'
               						updateVerification(params)
               						.then(resolve(data))
               						.catch((err)=>{
               							reject(err);
               						})
               					}
               				}
               			})
               		})
				}
			}
			
		}
	}
}
module.exports = new ForgetPassword;
