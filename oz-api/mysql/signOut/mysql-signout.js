const databaseUtil = require('../../../utils/database_utils');
const apiUtil = require('../../../utils/api_utils');
const commonUtil = require('../../../utils/utils');
const configration = require('../../../config')();
let mysql = require('../mysql-client');
var signOut = function(){
	return{
		LogOut : function(params){
			let dataObj = {
				access_token : params,
				empty : ''
			}
			let query = "update users set access_token=:empty where access_token=:access_token";
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
module.exports = new signOut;