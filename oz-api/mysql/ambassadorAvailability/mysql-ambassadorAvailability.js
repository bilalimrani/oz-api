const databaseUtil = require('../../../utils/database_utils');
const apiUtil = require('../../../utils/api_utils');
const commonUtil = require('../../../utils/utils');
const configration = require('../../../config')();
const mysql = require('../mysql-client');
const validator = require('lodash');
console.log("mysql-forgetpassword file");
var Cryptr = require('cryptr');
cryptr = new Cryptr('Objective Zero');


var ambassadorAvailability = function(){
	return{
		checkambassadorAvailability : function(params, user_id){
			let query = null
			let dataobj  = {
				days_available : params.days_available, 
		        time_range_start : params.time_range_start ,
		        time_range_end : params.time_range_end , 
		        is_available_voiceCall : params.is_available_voiceCall,
		        is_available_textChat : params.is_available_textChat,
		        is_available_videoCall : params.is_available_videoCall,
		        user_id:params.user_id
		    };

			query = 'UPDATE ambassedor SET days_available= :days_available, time_range_start = :time_range_start, time_range_end = :time_range_end ,is_available_voiceCall=:is_available_voiceCall,is_available_textChat=:is_available_textChat,is_available_videoCall=:is_available_videoCall WHERE user_id = :user_id';
			
			return new Promise((resolve,reject)=>{
            	databaseUtil.updateMultiRecord(mysql,query,dataobj,function (err,data){
            		if(err){
	                	reject(err);
                   	}else
                   	{
                    	resolve(data);
               		}

                });
        	});
		},


		getAmbassador : function(params){
			console.log("params",params)
			let dataobj = {
				user_id : params
			}
		
			let globalResObj = {}
			let query  = 'SELECT * FROM ambassedor WHERE user_id=:user_id' ;
			return new Promise((resolve, reject)=>{
				databaseUtil.getSingleRecord(mysql,query,dataobj,function (err,data){
	
	                if(err){
	                     reject(err);
	                }else{
	                	console.log("query",data[0])
	                   resolve(data[0])
	                   
	                }

	            });
			})
		}
	}
}


module.exports = new ambassadorAvailability;