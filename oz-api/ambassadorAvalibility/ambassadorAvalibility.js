const express = require('express');
const router = express.Router();
const validator = require('lodash');
const REST_API_STATUS_CODE = require("../../responses");
const verifier_function = require("../verifier");
const configration = require('../../config')();

router.put('/ambassadorAvalibility', verifier_function.verifier,  (req, res)=>{
	const ambassadorAvailability = require('../mysql/ambassadorAvailability/mysql-ambassadorAvailability');
	let user_id = res.locals
	let globalResObj = {}
	new Promise((resolve, reject)=>{
		ambassadorAvailability.checkambassadorAvailability(req.body, user_id)
		.then((data)=>{
			resolve("ok")
		})
	}).then((data)=>{
		ambassadorAvailability.getAmbassador(req.body)
		.then((data)=>{
			
						globalResObj.id = data[0].id;
                    	globalResObj.user_id = data[0].user_id;
                    	globalResObj.name = data[0].name;
	                    globalResObj.age = data[0].age;
						globalResObj.gender = data[0].gender;
						globalResObj.email = data[0].email;
						globalResObj.contact = data[0].contact;
						globalResObj.date_of_birth = data[0].date_of_birth;
						globalResObj.city = data[0].city;
						globalResObj.state = data[0].state;
						globalResObj.zip_code = data[0].zip_code;
						globalResObj.service_member = data[0].service_member;
						globalResObj.service = data[0].service;
						globalResObj.veteran = data[0].veteran;
						globalResObj.mos = data[0].mos;
						globalResObj.component = data[0].component;
						globalResObj.days_available = data[0].days_available;
						globalResObj.lat = data[0].lat;
				        globalResObj.lng = data[0].lng;
				        globalResObj.time_range_start = data[0].time_range_start;
				        globalResObj.time_range_end = data[0].time_range_end;
				        globalResObj.is_available_voiceCall = data[0].is_available_voiceCall;
				        globalResObj.is_available_textChat = data[0].is_available_textChat;
				        globalResObj.is_available_videoCall = data[0].is_available_videoCall;
				        globalResObj.thumbnail = data[0].thumbnail;
				       	globalResObj.is_favourite = data[0].is_favourite;
                    	globalResObj.profile_pic = data[0].profile_pic;
                        res.json({responseCode : 200, message : "Data Retrived Sucessfully", response : globalResObj});
		})
	})
	

})


module.exports = router 