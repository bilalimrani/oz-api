
const commonUtil = require('../../../utils/utils');
const databaseUtil = require('../../../utils/database_utils');
const apiUtil = require('../../../utils/api_utils');
const _ = require('underscore');

const configuration = require('../../../config')();

function addToFavourite(req,res){

	var globalResObj = {
		"responseCode" : "200",
		"message" : "Data Retrived Sucessfully",
		"response":{
				"name" : "", 
				"age" : "",
				"gender" : "",
				"email" : "",
				"contact" : "",
				"date_of_birth" : "",
				"city" : "",
				"state" : "",
				"zip_code" : "",
				"service_member" : "", 
				"service" : "", 
				"veteran" : "", 
				"mos" : "",
				"component" : "",
				"days_available" : "",
				"lat": 0,
		        "lng": 0,
		        "time_range_start" : "",
		        "time_range_end" :"",
		        "is_available_voiceCall" : "",
		        "is_available_textChat" : "",
		        "is_available_videoCall" : "",
		        "profile_pic" : "",
		        "thumbnail" : "",
		        "is_favourite" : ""

		}
	};
	console.log('I am here to add ambassador into my list');

	var user_id = req.userData.id;
	var dbObj = req.app.get('db');
	var amb_id = req.body.amb_id;

	req.assert('amb_id', 'please Enter Ambassador Id').notEmpty();

	var checkIfAlreadyFavourite = function(req){
				var dataobj = {
				user_id: user_id,
				amb_id:amb_id

			};
			console.log(dataobj);
			return new Promise((resolve,reject)=>{
				var query = "Select *from favourite_ambassador where amb_id=:amb_id and user_id=:user_id";

				databaseUtil.getSingleRecord(dbObj,query,dataobj,function(err,data){
					if(err){
						console.log('Oh Problem');
                    	reject({responseCode:202,message:"No Ambassador Record Found",response:{}});
               		 }
               		else
               		{
               		 	
		            if(data.info.numRows > 0)
		                 {
		                 	 reject({responseCode:202,message:"You already add this Ambassador to Favourite List",response:{}})
		                 }
		                else
		                 {
		                 	 resolve(data);
		                 
		                }
                }
				});
			});
	}

	var CheckIfAmbassadorExist = function(obj){

			var dataobj = {
				user_id: amb_id
			};
			return new Promise((resolve,reject)=>{
				var query = "Select *from ambassedor where id=:user_id";
				databaseUtil.getSingleRecord(dbObj,query,dataobj,function(err,data){
					if(err){						
                    	reject(err);
               		 }
               		 else
               		 {
		                if(data.info.numRows > 0)
		                 {
		                 	resolve(data);
		                   
		                 }
		                else
		                 {

		                   reject({responseCode:202,message:"No Ambassador Record Found!",response:{}})
		                    
		                }
                }
				});
			});
		}
	var addToList = function(data){
			console.log('I am in Function');
			var table = 'favourite_ambassador';
			var dataObj = {
				user_id : user_id,
				amb_id : amb_id
			};
			return new Promise((resolve,reject)=>{
					databaseUtil.insertSingleRecord(dbObj,table,dataObj,function (err,result) {
                    if(err){
                    	console.log('Errors',err);
                        reject(err);
                    }
                    else 
                    {
                       if(_.isEmpty(result.info.insertId))
                       {
                            reject({responseCode:202,message:"Please Enter Valid Ambassador Id",response:{}})
                       }
                       else
                       {

                            resolve(result);
                       }

                    }
                });
			})
	}

	var sendResponse = function(obj){

			var dataobj = {
				user_id: amb_id
			};
			return new Promise((resolve,reject)=>{
				var query = "Select *from ambassedor where id=:user_id";

				databaseUtil.getSingleRecord(dbObj,query,dataobj,function(err,data){
					if(err){
                    reject(err);
               		 }
               		 else
               		 {
		                if(_.isEmpty(data))
		                 {
		                    reject({responseCode:202,message:"No Ambassador Record Found!",response:{}})
		                 }
		                else
		                 {

		                    globalResObj.response.name = data[0].name;
		                    globalResObj.response.profile_pic = data[0].profile_pic;
		                    globalResObj.response.days_available = data[0].days_available;
		                    globalResObj.response.time_range_start = data[0].time_range_start;
		                    globalResObj.response.time_range_end = data[0].time_range_end;
		                    globalResObj.response.is_available_voiceCall = data[0].is_available_voiceCall;
		                    globalResObj.response.is_available_textChat = data[0].is_available_textChat;
		                    globalResObj.response.is_available_videoCall = data[0].is_available_videoCall;
		                    globalResObj.response.lat = data[0].lat;
		                    globalResObj.response.lng = data[0].lng;
		                    globalResObj.response.age = data[0].age;
		                    globalResObj.response.gender = data[0].gender;
		                    globalResObj.response.email = data[0].email;
		                    globalResObj.response.contact = data[0].contact;
		                    globalResObj.response.date_of_birth = data[0].date_of_birth;
		                    globalResObj.response.city = data[0].city;
		                    globalResObj.response.state = data[0].state;
		                    globalResObj.response.zip_code = data[0].zip_code;
		                    globalResObj.response.service_member = data[0].service_member;
        					globalResObj.response.service = data[0].service;
        					globalResObj.response.veteran = data[0].veteran;
         					globalResObj.response.mos = data[0].mos;
        					globalResObj.response.component = data[0].component;
        					globalResObj.response.thumbnail = data[0].thumbnail;
        					globalResObj.response.is_favourite = 1;
		                    res.json(globalResObj);
		                    resolve(data);
		                }
                }
				});
			});
		}

		req.getValidationResult().then(function(result) {
        if(_.isEmpty(result.useFirstErrorOnly().array()[0])){
        		checkIfAlreadyFavourite(req)
        		.then(CheckIfAmbassadorExist)
           		 .then(addToList)
                .then(sendResponse)            
                .catch((e) => {
                res.status(299).json(e);
        });
        }else{
            res.json({responseCode:510,message:"validation error",response:result.useFirstErrorOnly().array()[0]});
        }
    });

}

module.exports = {
	addToFavourite:addToFavourite

}