const express = require('express');
const router = express.Router();
const validator = require('lodash');
const REST_API_STATUS_CODE = require("../../responses");
const verifier_function = require("../verifier");

router.put('/assignUserRole',verifier_function.verifier,(req,res)=>{
	console.log("I am in Assign User Role Route");
	let reqparams = {
		user_role : req.body.user_role,
		access_token : req.headers.access_token
	} 
	let mysqlUserRole = require('../mysql/assignUserRole/mysql-assignuserrole');
	mysqlUserRole.updateUserRole(reqparams)
	.then((data)=>{
			mysqlUserRole.returnResponse(reqparams)
			.then((data)=>{
				if(validator.isEmpty(data)){
					res.json(REST_API_STATUS_CODE.notModified);
				}
				else{
					REST_API_STATUS_CODE.sucess.response = data;
					res.json(REST_API_STATUS_CODE.sucess);
				}
			})	
	})
	.catch((err)=>{
		res.status(400).json(err);
	})
})

module.exports = router;