const express = require('express');
const router = express.Router();
const validator = require('lodash');
const REST_API_STATUS_CODE = require("../../responses");
const verifier_function = require("../verifier");
const configration = require('../../config')();

router.put('/ambassadorAvalibility', verifier_function.verifier,  (req, res)=>{
	const ambassadorAvailability = require('../mysql/ambassadorAvailability/mysql-ambassadorAvailability');
	let user_id = res.locals
	console.log("before",req.body)
	new Promise((resolve, reject)=>{

		ambassadorAvailability.checkambassadorAvailability(req.body, user_id)
		.then((data)=>{
			resolve({massage : "Successfull"})
		})
		.catch((err)=>{
			res.status(400).json(REST_API_STATUS_CODE.badrequest);
		})
	}).then((data)=>{
		ambassadorAvailability.getAmbassador(user_id.id)
		.then((data)=>{
			console.log("after",data)
			res.json({responseCode : 200, message : "Data Retrived Sucessfully", response : data});			
		})
		.catch((err)=>{
			res.status(400).json(REST_API_STATUS_CODE.badrequest);
		})
	})
	

})


module.exports = router 