const databaseUtil = require('../../../utils/database_utils');
const apiUtil = require('../../../utils/api_utils');
const commonUtil = require('../../../utils/utils');
const configration = require('../../../config')();
const mysql = require('../mysql-client');

var ambassadorPage = function(data){
	return {
		ambassadorvideo : function(data){
			let query = "select file, title from videos"

			return new Promise((resolve, reject)=>{
				databaseUtil.getSingleRecord(mysql, query, (err, res)=>{
					if(err){
						reject(err)
					}
					else{
						resolve(res[0])
					}
				})
			})
		}
	}
}


module.exports = new ambassadorPage