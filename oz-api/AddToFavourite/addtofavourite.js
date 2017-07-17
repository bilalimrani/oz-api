const express = require('express');
const router = express.Router();
const validator = require('lodash');
const REST_API_STATUS_CODE = require("../../responses");
const verifier_function = require("../verifier");

router.post('/add_to_favourite',verifier_function.verifier,(req,res)=>{
	let reqparams = req.body;
	console.log('I am in add_to_favourite router')
	let mobileAddToFavourite = require('../mysql/AddToFavourite/mysql-addtofavourite');
	mobileAddToFavourite.checkIfAlreadyFavourite(reqparams,res.locals.id)
	.then((data)=>{
		console.log("Data Received from Database",data)
		if(validator.isEmpty(data)){
			mobileAddToFavourite.checkAmbassadorExistence(reqparams)
			.then((data)=>{
				if(validator.isEmpty(data)){
					res.json({code : 204, message: "No Ambassador Found",response:{}});
				}
				else{
					mobileAddToFavourite.insertToList(reqparams,res.locals.id)
					.then((data)=>{

							mobileAddToFavourite.sendResponse(reqparams)
							.then((data)=>{
								REST_API_STATUS_CODE.sucess.response = data;
								res.json(REST_API_STATUS_CODE.sucess);
							})
					})
				}
			})
		}
		else{
			mobileAddToFavourite.deleteRecord(reqparams,res.locals.id)
			.then((data)=>{
				console.log("Found Data after Deletion",data)
				if(data.info.affectedRows === '1'){
					res.json({code : 201, message: "Ambassador unfavourite Sucessfully",response:{}});
				}
				else{
					res.status(400).json(REST_API_STATUS_CODE.badrequest);
				}

			})

		}
	})
	.catch((err)=>{
		res.status(400).json(REST_API_STATUS_CODE.badrequest);
	})
})

module.exports = router;