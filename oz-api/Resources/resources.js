const express = require('express');
const router = express.Router();
const validator = require('lodash');
const REST_API_STATUS_CODE = require("../../responses");
const verifier_function = require("../verifier");

router.get('/resources',verifier_function.verifier,(req,res)=>{
	console.log('I am in resources router')
	let mysqlResources = require('../mysql/Resources/mysql-resources');
	mysqlResources.getResources()
	.then((data)=>{
		REST_API_STATUS_CODE.sucess.response = data;
			res.json(REST_API_STATUS_CODE.sucess);
	})
	.catch((err)=>{
		res.status(400).json(REST_API_STATUS_CODE.badrequest);
	})
})

module.exports = router;