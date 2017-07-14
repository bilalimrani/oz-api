const databaseUtil = require('../../../utils/database_utils');
const apiUtil = require('../../../utils/api_utils');
const commonUtil = require('../../../utils/utils');
const configration = require('../../../config')();
const mysql = require('../mysql-client');
console.log("mysql-htmlpags file")

var Pages = function(){
	return{
		checkAmbassadorExistence : function(params){
			console.log("i am in mysql-htmlpags checkAmbassadorExistence Function");
			let dataObj = {
				user_id : params.id
			}
			let query = "select id from ambassedor where user_id=:user_id";
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
		},
		insertNewAmbassador : function(params){
			console.log("i am in mysql-htmlpags insertNewAmbassador function");
			let dataObj = {
				user_id : params.id
			}
			let table = "ambassedor";
			return new Promise((resolve,reject)=>{
				databaseUtil.insertSingleRecord(mysql,table,dataObj,(err,data)=>{
					if(err){
						reject(err);
					}
					else{
						resolve(data);
					}
				});
			});
		},
		verifyAmbassador : function(params){
			console.log("I am in mysql-htmlpags verifyAmbassador function");
			let dataObj = {
				id : params.id,
				isverified: 1 
			}
			let query = "update users set isverified=:isverified where id=:id";
			return new Promise((resolve,reject)=>{
				databaseUtil.updateMultiRecord(mysql,query,dataObj,(err,data)=>{
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
module.exports = new Pages;