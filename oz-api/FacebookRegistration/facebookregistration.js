const express = require('express');
const router = express.Router();
const validator = require('lodash');
const REST_API_STATUS_CODE = require("../../responses")

let fbValidator = (req,res,next) =>{
    let params = req.body;
    let result = false;
    if(params.fb_id && params.deviceId )
    {
        result = true;
        if(result){
            next();
        }
        else{
            res.status(REST_API_STATUS_CODE.param_missing.code).json(REST_API_STATUS_CODE.param_missing)
        }
        
    }else{
        result = false;
        res.status(REST_API_STATUS_CODE.param_missing.code).json(REST_API_STATUS_CODE.param_missing)
    }
    
    
}

router.post('/facebook',fbValidator,(req,res)=>{
	console.log('I am in facebookRegistration Router')
	let reqparams = req.body;
	const mysqlfacebookRegistration = require('../mysql/FacebookRegistartion/mysql-facebookregistration')
	mysqlfacebookRegistration.checkUserExistence(reqparams)
	.then((data)=>{
		console.log('I am in then')
		if(validator.isEmpty(data)){
			console.log('I am in then1')
			mysqlfacebookRegistration.insertUser(reqparams)

		}
		else{
			mysqlfacebookRegistration.updateRecord(reqparams)
		}
		console.log('Insert Data Sucessfully')
		mysqlfacebookRegistration.checkUserExistence(reqparams)
		.then((data)=>{
			
			REST_API_STATUS_CODE.sucess.response = data[0];
			res.json(REST_API_STATUS_CODE.sucess);
		})
	})
	.catch((e)=>{
		res.status(400).json(REST_API_STATUS_CODE.badrequest);
	})
})
module.exports = router;