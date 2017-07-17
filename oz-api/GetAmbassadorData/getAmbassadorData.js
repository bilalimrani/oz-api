const express = require('express');
const router = express.Router();
const validator = require('lodash');
const REST_API_STATUS_CODE = require("../../responses");
const verifier_function = require("../verifier");

router.get('/ambassadorData',verifier_function.verifier,(req,res)=>{
	console.log("I am in ambassadorData router");
	let mysqlGetData = require('../mysql/GetAmbassadorData/mysql-getambassadordata');
	mysqlGetData.getData(req)
	.then((data)=>{
		if(validator.isEmpty(data)){
			res.json(REST_API_STATUS_CODE.no_content_found);
		}
		else{
			REST_API_STATUS_CODE.sucess.response = data;
			res.json(REST_API_STATUS_CODE.sucess);
		}
	})
	.catch((err)=>{
		res.status(400).json(REST_API_STATUS_CODE.badrequest);
	})
});

module.exports = router; 