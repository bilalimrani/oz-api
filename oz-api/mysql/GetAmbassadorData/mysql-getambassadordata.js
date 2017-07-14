const databaseUtil = require('../../../utils/database_utils');
const apiUtil = require('../../../utils/api_utils');
const commonUtil = require('../../../utils/utils');
const configration = require('../../../config')();
const mysql = require('../mysql-client');
console.log("mysql-getAmbassadorData file");

var GetData = function(){
	return{
		getData : function(params){
			console.log("I am in getData function of mysql-getAmbassadorData");
			let query = "select *from ambassedor";
			return new Promise((resolve,reject)=>{
				databaseUtil.getSingleRecord(mysql,query,params,(err,data)=>{
					if(err){
						reject(err);
					}
					else{
						resolve(data);
					}
				});
			});

		}
	}
}
module.exports = new GetData;