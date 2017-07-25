const databaseUtil = require('../../../utils/database_utils');
const apiUtil = require('../../../utils/api_utils');
const commonUtil = require('../../../utils/utils');
const configration = require('../../../config')();
const mysql = require('../mysql-client');
const validator = require('lodash');

var AddRecentActivity = function(){
	return{
		checkUserExist : function(params){
			let query = 'select name from users where id=:user_id';
			let dataObj = {
				user_id : params
			}
			return new Promise((resolve,reject)=>{
				databaseUtil.getSingleRecord(mysql,query,dataObj,(err,data)=>{
					if(err){
						reject(err);
					}else{
						resolve(data);
					}

				});
			});
		},

		getAmbassadorId : function(params){

			let query = 'select * from ambassedor where user_id =:user_id';
			let dataObj = {
				user_id : params
			}
			return new Promise((resolve,reject)=>{
				databaseUtil.getSingleRecord(mysql,query,dataObj,(err,data)=>{
					if(err){
						console.log('error',err)
						reject(err);
					}
					else{
						
						resolve(data);
					}
				})
			})
		},

		insertNewActivity : function(params,ambassador_id){
			console.log('My ambassador_id',ambassador_id)
			let table = 'ambassedorrecentactivity';
			let dataObj = {
				call_start_time : params.call_start_time,
				call_end_time : params.call_end_time,
				user_id : params.user_id,
				type : params.type,
				time_zone : params.time_zone,
				amb_id : ambassador_id
			}
			return new Promise((resolve,reject)=>{
				databaseUtil.insertSingleRecord(mysql,table,dataObj,(err,data)=>{
					if(err){
						console.log('err',err)
						reject(err);
					}else{
						resolve(data);
					}
				});
			});
		}
	}
}

module.exports = new AddRecentActivity;