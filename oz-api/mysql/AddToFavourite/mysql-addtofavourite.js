const databaseUtil = require('../../../utils/database_utils');
const apiUtil = require('../../../utils/api_utils');
const commonUtil = require('../../../utils/utils');
const configration = require('../../../config')();
const mysql = require('../mysql-client');
console.log("mysql-add_to_favourite file")

var addToFavourite = function(){
	return{
	checkIfAlreadyFavourite : function(params,user_param){
		console.log('i am in checkIfAlreadyFavourite function of mysql-add_to_favourite');
		let dataObj = {
			user_id : user_param,
			amb_id : params.amb_id
		}
		let query = "select * from favourite_ambassador where user_id=:user_id and amb_id=:amb_id";
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
	deleteRecord : function(params,user_param){
		console.log('I am in deleteRecord function of mysql-add_to_favourite');
		let dataObj = {
			user_id : user_param,
			amb_id : params.amb_id
		}
		let query = "delete from favourite_ambassador where user_id = :user_id and amb_id = :amb_id";
		return new Promise((resolve,reject)=>{
			databaseUtil.deleteRecord(mysql,query,dataObj,(err,data)=>{
				if(err){
					reject(err);
				}
				else{
					resolve(data);
				}
			});
		});
	},
	checkAmbassadorExistence : function(params){
		console.log('I am in checkAmbassadorExistence function of mysql-add_to_favourite');
		let dataObj = {
			amb_id : params.amb_id
		}
		let query = "select *from ambassedor where id = :amb_id";
		return new Promise((resolve,reject)=>{
			databaseUtil.getSingleRecord(mysql,query,dataObj,(err,data)=>{
				if(err){
					reject(err)
				}
				else{
					resolve(data)
				}
			})
		})
	},
	insertToList : function(params,user_param){
		console.log('I am in insertToList function of mysql-add_to_favourite')
		let dataObj = {
			amb_id : params.amb_id,
			user_id : user_param
		}
		let table = 'favourite_ambassador';
		return new Promise((resolve,reject)=>{
			databaseUtil.insertSingleRecord(mysql,table,dataObj,(err,data)=>{
				if(err){
					reject(err);
				}
				else{
					resolve(data);
				}
			})
		})
	},
	sendResponse : function(params){
		console.log('I am in sendResponse function of mysql-add_to_favourite');
		let dataObj = {
			amb_id : params.amb_id
		}
		let query = "select *from ambassedor where id = :amb_id";
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
module.exports = new addToFavourite;