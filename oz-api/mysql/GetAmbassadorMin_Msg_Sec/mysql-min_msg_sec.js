const databaseUtil = require('../../../utils/database_utils');
const apiUtil = require('../../../utils/api_utils');
const commonUtil = require('../../../utils/utils');
const configration = require('../../../config')();
const mysql = require('../mysql-client');
console.log("mysql-getAmbassadorData file");

var MinMsgSec = function(){
	return {
		getData : function(params){
			let query = 'Select sum(CASE WHEN type = "voice" or type = "video" then 1 else 0 end) as calls ,sum(total_minutes) as minutes ,sum(CASE WHEN type = "sent_message" or type = "receive_message" then 1 else 0 end) as messages from ambassedorrecentactivity where amb_id = :amb_id ';
			let dataObj = {
				amb_id : params
			}
			return new Promise((resolve,reject)=>{
				databaseUtil.getSingleRecord(mysql,query,dataObj,(err,obj)=>{
					if(err){
						reject(err);
					}
					else{
						resolve(obj);
					}
				});
			});
		}
	}

}

module.exports = new MinMsgSec;