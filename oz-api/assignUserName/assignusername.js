const express = require('express');
const router = express.Router();
const validator = require('lodash');
const REST_API_STATUS_CODE = require("../../responses");
const verifier_function = require("../verifier");
router.put('/assign_username',verifier_function.verifier,(req,res)=>{
 
	console.log("I am in AssignUserName Router");
	const mysqlUsername = require('../mysql/assignUserName/mysql-assignusername');
	mysqlUsername.checkUserNameAvalibility(req)
	.then((data)=>{
		if(validator.isEmpty(data)){
			mysqlUsername.updateUserName(req)
			.then((data)=>{
				if(data.info.affectedRows == "1"){
					mysqlUsername.returnResponse(req)
					.then((data)=>{
						if(validator.isEmpty(data)){
							res.json(REST_API_STATUS_CODE.no_content_found);
						}else{
							REST_API_STATUS_CODE.sucess.response = data;
							res.json(REST_API_STATUS_CODE.sucess);
						}
					})
				}
				else{
					res.json(REST_API_STATUS_CODE.notModified);
				}
			})
		}else{
			REST_API_STATUS_CODE.already_reported.message = "UserName Already Used,Try Another";
			REST_API_STATUS_CODE.already_reported.response = "{}";
			res.json(REST_API_STATUS_CODE.already_reported);
		}
	})
	.catch((err)=>{
		res.status(400).json(REST_API_STATUS_CODE.badrequest);
	})
})
module.exports = router;