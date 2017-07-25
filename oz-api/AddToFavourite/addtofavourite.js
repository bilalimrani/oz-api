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
		console.log("Data Received from Database")
		if(validator.isEmpty(data)){
			mobileAddToFavourite.checkAmbassadorExistence(reqparams)
			.then((data)=>{
				if(validator.isEmpty(data)){
					res.json({responseCode : 204, message: "No Ambassador Found",response:{}});
				}
				else{
					mobileAddToFavourite.insertToList(reqparams,res.locals.id)
					.then((data)=>{

							mobileAddToFavourite.sendResponse(reqparams)
							.then((data)=>{
								data[0].is_favourite = 1;
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
				}
			})
		}
		else{
			mobileAddToFavourite.deleteRecord(reqparams,res.locals.id)
			.then((data)=>{
				console.log("Found Data after Deletion")
				if(data.info.affectedRows === '1'){

					mobileAddToFavourite.sendResponse(reqparams)
						.then((data)=>{
							REST_API_STATUS_CODE.sucess.response = data[0]; 
							res.json(REST_API_STATUS_CODE.sucess);
						})
						.catch((err)=>{
							res.status(400).json(REST_API_STATUS_CODE.badrequest);
						})
				}
				else{
					res.status(400).json(REST_API_STATUS_CODE.badrequest);
				}

			})
			.catch((err)=>{
				res.status(400).json(REST_API_STATUS_CODE.badrequest);
			})

		}
	})
	.catch((err)=>{
		res.status(400).json(REST_API_STATUS_CODE.badrequest);
	})
})

module.exports = router;