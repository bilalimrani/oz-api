const express = require('express');
const router = express.Router();
const validator = require('lodash');
const REST_API_STATUS_CODE = require("../../responses");
const verifier_function = require("../verifier");

router.put('/updateambassador',verifier_function.verifier,(req,res)=>{
	console.log("I am in updateambassador router");
	let mysqlUpdateAmbassador = require('../mysql/AmbassadorProfile/mysql-ambassadorprofile');
	mysqlUpdateAmbassador.getImage(req,res)
	.then((img_path)=>{
		mysqlUpdateAmbassador.updateProfile(req,img_path,res.locals.id)
		.then((data)=>{
			mysqlUpdateAmbassador.returnResponse(res.locals.id)
			.then((data)=>{
				REST_API_STATUS_CODE.sucess.response = data[0];
				res.json(REST_API_STATUS_CODE.sucess);
			})
		})					             	
	})
	.catch((err)=>{
		res.status(400).json(REST_API_STATUS_CODE.badrequest);
	})
}) 
router.get('/getambassadorprofile',verifier_function.verifier,(req,res)=>{
	console.log("I am in Get AmbassadorProfile Router");
	let mysqlgetAmbassador = require('../mysql/GetAmbassadorProfile/mysql-getambassador');
	mysqlgetAmbassador.getData(res.locals.id)
	.then((data)=>{
		console.log("Data found")
		if(validator.isEmpty(data)){
			res.json(REST_API_STATUS_CODE.no_content_found);
		}
		else{
			REST_API_STATUS_CODE.sucess.response = data[0];
			res.json(REST_API_STATUS_CODE.sucess);
		}
	})
	.catch((e)=>{
		res.status(400).json(REST_API_STATUS_CODE.badrequest);
	})
})
module.exports = router;