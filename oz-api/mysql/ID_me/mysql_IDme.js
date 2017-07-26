const databaseUtil = require('../../../utils/database_utils');
const apiUtil = require('../../../utils/api_utils');
const commonUtil = require('../../../utils/utils');
const configration = require('../../../config')();
const mysql = require('../mysql-client');


var veteranData = function(){
	return {
		updateVeteran : function(data, veteranData){
			console.log("console.log",veteranData)
			let dataObj = {
				id : data.id,
				veteranData : veteranData,
				user_role : "veteran"
			}
			 let query = "UPDATE users SET user_role = :user_role, veteranData = :veteranData where id = :id";

			 return new Promise((resolve, reject)=>{
			 	databaseUtil.updateMultiRecord(mysql, query, dataObj, (err, res)=>{
			 		console.log(res)
			 		if(err){
			 			reject(err)
			 		}
			 		else{
			 			resolve(res)
			 		}
			 	})
			 })
		}
	}
}

module.exports = new veteranData;