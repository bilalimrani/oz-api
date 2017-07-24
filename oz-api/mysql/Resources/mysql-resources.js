const databaseUtil = require('../../../utils/database_utils');
const apiUtil = require('../../../utils/api_utils');
const commonUtil = require('../../../utils/utils');
const configration = require('../../../config')();
const mysql = require('../mysql-client');
const _ = require('lodash')
console.log("mysql-filters file")

var Resources = function(){
	return{
		getResources : function(){
			let query = 'select title,description,image from oz_resources';
			let dataObj = {

			}
			return new Promise((resolve,reject)=>{
				databaseUtil.getSingleRecord(mysql,query,dataObj,(err,data)=>{
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
module.exports = new Resources;