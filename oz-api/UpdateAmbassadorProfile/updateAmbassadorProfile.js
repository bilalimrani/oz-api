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
				console.log('AmbassadorProfile Id',data[0].id)
				let mysqlData = require('../mysql/GetAmbassadorMin_Msg_Sec/mysql-min_msg_sec');
				mysqlData.getData(data[0].id)
				.then((obj)=>{
					console.log('Object get ',obj)
					data[0].minutes = obj[0].minutes;
					data[0].messages = obj[0].messages;
					data[0].calls = obj[0].calls;
					REST_API_STATUS_CODE.sucess.response = data[0];
					res.json(REST_API_STATUS_CODE.sucess);
				})
				.catch((err)=>{
					res.status(400).json(REST_API_STATUS_CODE.badrequest);
				})
				
			})
			.catch((err)=>{
				res.status(400).json(REST_API_STATUS_CODE.badrequest);
			})
		})
		.catch((err)=>{
			res.status(400).json(REST_API_STATUS_CODE.badrequest);
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
			console.log('AmbassadorProfile Id',data[0].id)
				let mysqlData = require('../mysql/GetAmbassadorMin_Msg_Sec/mysql-min_msg_sec');
				mysqlData.getData(data[0].id)
				.then((obj)=>{
					console.log('Object get ',obj)
					data[0].minutes = obj[0].minutes;
					data[0].messages = obj[0].messages;
					data[0].calls = obj[0].calls;
					REST_API_STATUS_CODE.sucess.response = data[0];
					res.json(REST_API_STATUS_CODE.sucess);
				})
				.catch((err)=>{
					res.status(400).json(REST_API_STATUS_CODE.badrequest);
				})
		}
	})
	.catch((e)=>{
		res.status(400).json(REST_API_STATUS_CODE.badrequest);
	})
})
module.exports = router;