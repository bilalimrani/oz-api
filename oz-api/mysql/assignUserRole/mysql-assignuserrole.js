const databaseUtil = require('../../../utils/database_utils');
const apiUtil = require('../../../utils/api_utils');
const commonUtil = require('../../../utils/utils');
const configration = require('../../../config')();
const mysql = require('../mysql-client');
console.log("mysql-assignUserRole file")

var AssignUserRole = function(){
	return{
		updateUserRole : function(params){
			console.log("I am in updateUserRole function of AssignUserRole")
			let query = "update users set user_role=:user_role where access_token=:access_token";
			return new Promise((resolve,reject)=>{
				databaseUtil.updateMultiRecord(mysql,query,params,(err,data)=>{
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
			console.log("I am in return response function of AssignUserRole");
			let query = "select * from users where access_token=:access_token";
			return new Promise((resolve,reject)=>{
				databaseUtil.getSingleRecord(mysql,query,params,(err,data)=>{
					if(err){
						reject(err);
					}
					else{
						resolve(data);
					}
				});
			});
		}
	}
}
module.exports = new AssignUserRole;