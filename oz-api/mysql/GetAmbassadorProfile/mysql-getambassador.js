const databaseUtil = require('../../../utils/database_utils');
const apiUtil = require('../../../utils/api_utils');
const commonUtil = require('../../../utils/utils');
const configration = require('../../../config')();
const mysql = require('../mysql-client');
console.log("mysql-getAmbassadorProfile file")
var GetProfile = function(){
	return{
		getData : function(params){
			console.log("I am in getData function of GetProfile")
			let dataObj = {
				user_id : params
			}
			let query = "select *from ambassedor where user_id=:user_id";
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
module.exports = new GetProfile;