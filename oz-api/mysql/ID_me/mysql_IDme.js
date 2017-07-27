const databaseUtil = require('../../../utils/database_utils');
const apiUtil = require('../../../utils/api_utils');
const commonUtil = require('../../../utils/utils');
const configration = require('../../../config')();
const mysql = require('../mysql-client');


var veteranData = function(){
	return {
		updateVeteran : function(data, veteranData){
			
			let dataObj = {
				id : data.id,
				veteranData : veteranData,
				user_role : "veteran",
				isverified : 1
			}
			 let query = "UPDATE users SET user_role = :user_role, veteranData = :veteranData, isverified = :isverified where id = :id";

			let p1 = new Promise((resolve, reject)=>{
			 	databaseUtil.updateMultiRecord(mysql, query, dataObj, (err, res)=>{
			 	
			 		if(err){
			 			reject(err)
			 		}
			 		else{
			 			resolve(res)
			 		}
			 	})
			})

			let p2 = new Promise((resolve, reject)=>{
				let dataObj = {
					id : data.id
				}
				let query = "SELECT * from users where id = :id";

				databaseUtil.getSingleRecord(mysql, query, dataObj, (err, res)=>{
					if(err){
						reject(err)
					}
					else{
						resolve(res)
					}
				})
			})

			return Promise.all([p1,p2])
		}
	}
}

module.exports = new veteranData;