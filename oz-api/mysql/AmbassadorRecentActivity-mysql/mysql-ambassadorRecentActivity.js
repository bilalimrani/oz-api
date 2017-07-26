const databaseUtil = require('../../../utils/database_utils');
const apiUtil = require('../../../utils/api_utils');
const commonUtil = require('../../../utils/utils');
const configration = require('../../../config')();
const mysql = require('../mysql-client');
const date = require('date-and-time');
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
			

			let now = new Date(parseInt(params.call_start_time));
			let after = new Date(parseInt(params.call_end_time));
			console.log('Time at the Moment  ',date.format(now, 'YYYY/MM/DD HH:mm:ss'));
			let h = Math.floor(date.subtract(after, now).toSeconds() / 3600);
		    let m = Math.floor(date.subtract(after, now).toSeconds() % 3600 / 60);
		    let s = Math.floor(date.subtract(after, now).toSeconds() % 3600 % 60)


			let mins = date.subtract(after, now).toMinutes();
			let hDisplay = h > 0 ? h + (h == 1 ? ":" : ":") : "";
		    let mDisplay = m > 0 ? m + (m == 1 ? ":" : ":") : "";
		    let sDisplay = s > 0 ? s + (s == 1 ? "" : "") : "";
		    let total = hDisplay + mDisplay + sDisplay;
		    console.log('Final Time - ',hDisplay + mDisplay + sDisplay)

			let table = 'ambassedorrecentactivity';
			let dataObj = {
				call_start_time : params.call_start_time,
				call_end_time : params.call_end_time,
				user_id : params.user_id,
				type : params.type,
				time_zone : params.time_zone,
				amb_id : ambassador_id,
				duration : total,
				total_minutes : mins 

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