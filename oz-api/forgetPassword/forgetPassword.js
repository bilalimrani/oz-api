const express = require('express');
const router = express.Router();
const validator = require('lodash');
const REST_API_STATUS_CODE = require("../../responses");
const verifier_function = require("../verifier");
const configration = require('../../config')();
router.put('/forget_password',verifier_function.verifier,(req,res)=>{
	let reqparams = req.body;
	console.log("I am in forget_password router");
	let mysqlForgetPassword = require('../mysql/ForgetPassword/mysql-forgetpassword');
	mysqlForgetPassword.forgetPassword(reqparams)
	.then((data)=>{
		console.log("data     ...... . .. . . . .. . ")
		if(data == 'code'){
			res.json({responseCode:200,message:"An email sent to your email",response:"{}"});
		}
		else if(data == 'Not Verified'){
			res.json({responseCode:204,message:"sorry code not match with database",response:{}});
		}
		else if(data == 'verified'){
			res.json({responseCode:200,message:"code varified sucessfully" , response:{}});
		}
		else if(data === 'range'){
			res.json({responseCode:206,message:"Please Size must be greater than 6" , response:{}});
		}
		else if(data === 'sucess'){
			res.json({responseCode:200,message:"password Change sucessfully" , response:{}});
		}
		else if(data === 'not found'){
			res.json({responseCode:204,message:"No Account Found",response:"{}"});
		}
	})
	.catch((err)=>{
		res.status(400).json(REST_API_STATUS_CODE.badrequest);
	})
})
module.exports = router;