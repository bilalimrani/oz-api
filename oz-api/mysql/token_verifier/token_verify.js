const databaseUtil = require('../../../utils/database_utils');
const apiUtil = require('../../../utils/api_utils');
const commonUtil = require('../../../utils/utils');
const configration = require('../../../config')();
let mysql = require('../mysql-client');
var verifier = function(){
	return{
		verifyToken : function(param){
			let dataObj = {
				access_token : param
			}
			let query = "select * from users where access_token=:access_token";
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
module.exports = new verifier;