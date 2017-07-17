const express = require('express');
const router = express.Router();
const validator = require('lodash');
const REST_API_STATUS_CODE = require("../../responses");
const verifier_function = require("../verifier");
router.put('/signout',verifier_function.verifier,(req,res)=>{
	console.log("I am verift Function 12",res.locals)
	let mysqlSignOut = require('../mysql/signOut/mysql-signout');
	mysqlSignOut.LogOut(req.headers.access_token)
	.then((data)=>{
		if(data.info.affectedRows == '1'){
			REST_API_STATUS_CODE.ok_userAlreadyLogIn.message = "User SignOut Sucessfully";
			REST_API_STATUS_CODE.ok_userAlreadyLogIn.response = "{}"
			res.json(REST_API_STATUS_CODE.ok_userAlreadyLogIn);
		}
		else{

		}
	})
	.catch((e)=>{
		res.status(400).json(REST_API_STATUS_CODE.badrequest);
	})
});
module.exports = router; 