const databaseUtil = require('../../../utils/database_utils');
const apiUtil = require('../../../utils/api_utils');
const commonUtil = require('../../../utils/utils');
const configration = require('../../../config')();
const mysql = require('../mysql-client');
const _ = require('lodash')
console.log("mysql-Get Favourite Ambassador")

var FavouriteAMbassador = function(){
	return{
		GetFavouriteAmbassadorList : function(params){
			console.log('I am in GetFavouriteAmbassadorList function')
			let query = 'SELECT ambassedor.* FROM ambassedor Left JOIN favourite_ambassador On favourite_ambassador.amb_id = ambassedor.id and favourite_ambassador.user_id = :user_id'	
			let dataObj = {
				user_id : params
			}
			return new Promise((resolve,reject)=>{
				databaseUtil.getSingleRecord(mysql,query,dataObj,(err,data)=>{
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

module.exports = new FavouriteAMbassador;