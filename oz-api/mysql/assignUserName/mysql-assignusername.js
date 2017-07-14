const databaseUtil = require('../../../utils/database_utils');
const apiUtil = require('../../../utils/api_utils');
const commonUtil = require('../../../utils/utils');
const configration = require('../../../config')();
const mysql = require('../mysql-client');
console.log("mysql-assignUsername file")
var AssignUserName = function(){
	return{
		checkUserNameAvalibility : function(params){
			console.log("I am in mysql-assignUsername checkUserNameAvalibility function");
			let query = "select username from users where username=:username";
			let dataObj = {
				username : params.body.username
			}
			return new Promise((resolve,reject)=>{
				databaseUtil.getSingleRecord(mysql,query,dataObj,(err,data)=>{
					if(err){
						reject(err);
					}
					else{
						resolve(data);
					}
				});
			});
		},
		updateUserName : function(params){
			console.log("I am in mysql-assignUsername updateUserName function");
			let query = "update users set username=:username where access_token=:access_token";
			let dataObj = {
				access_token : params.headers.access_token,
				username : params.body.username
			}
			return new Promise((resolve,reject)=>{
				databaseUtil.updateMultiRecord(mysql,query,dataObj,(err,data)=>{
					if(err){
						reject(err);
					}
					else{
						resolve(data);
					}	
				})
			})
		},
		returnResponse : function(params){
			console.log("I am in mysql-assignUsername returnResponse function");
			let query = "select * from users where access_token=:access_token";
			let dataObj = {
				access_token : params.headers.access_token
			}
			return new Promise((resolve,reject)=>{
				databaseUtil.getSingleRecord(mysql,query,dataObj,(err,data)=>{
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

module.exports = new AssignUserName;