const databaseUtil = require('../../../utils/database_utils');
const apiUtil = require('../../../utils/api_utils');
const commonUtil = require('../../../utils/utils');
const configration = require('../../../config')();
const mysql = require('../mysql-client');
console.log("mysql-Facebook Registration file")

var FacebookRegistration = function(){
	return{
		checkUserExistence : function(params){
			console.log('i am in checkUserExistence function of mysql-Facebook');
			let dataObj = {
				fb_id : params.fb_id,
			}
			console.log("Mydata Get",dataObj)
			let query = 'select * from users where fb_id=:fb_id'
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
		insertUser : function(params){
			let access_token = commonUtil.randomString();
			console.log('I am in insertUser function of mysql-Facebook');
			let dataObj = {
				fb_id : params.fb_id,
				deviceId : params.deviceId,
				deviceType : params.deviceType,
				access_token : access_token
			}
			let table = 'users';
			return new Promise((resolve,reject)=>{
				databaseUtil.insertSingleRecord(mysql,table,dataObj,(err,data)=>{
					if(err){
						reject(err)
					}
					else{
						resolve(data)
					}
				});
			});
		},
		updateRecord : function(params){
			let access_token = commonUtil.randomString();
			console.log('I am in updateRecord function of mysql-Facebook');
			let dataObj = {
				fb_id : params.fb_id,
				deviceId : params.deviceId,
				deviceType : params.deviceType,
				access_token : access_token
			}
			let query = 'update users set deviceType = :deviceType,deviceId = :deviceId,access_token = :access_token where fb_id = :fb_id';
			return new Promise((resolve,reject)=>{
				databaseUtil.updateMultiRecord(mysql,query,dataObj,(err,data)=>{
					if(err){
						reject(err);
					}
					else
					{
						resolve(data);
					}
				})
			})
		}
	}
}
module.exports = new FacebookRegistration;