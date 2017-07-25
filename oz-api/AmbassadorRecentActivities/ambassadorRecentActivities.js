const express = require('express');
const router = express.Router();
const validator = require('lodash');
const REST_API_STATUS_CODE = require("../../responses");
const verifier_function = require("../verifier");
const configration = require('../../config')();

let Validator = (req,res,next) =>{
    let params = req.body;
    let result = false;
    if(params.type && params.user_id)
    {
        if(params.type === 'video' || params.type === 'voice' || params.type === 'text'){
           result = true;
        }
        else{
            result = false
        }
        if(result){
            next();
        }
        else{ 
            res.json(REST_API_STATUS_CODE.param_missing)
        }
        
    }else{
        result = false;
        res.json(REST_API_STATUS_CODE.param_missing)
    } 
}


router.post('/add_recent_activity',verifier_function.verifier,Validator,(req,res)=>{
	let reqparams = req.body;
	console.log('I am in add_recent_activity router')
	let mysqlActivities = require('../mysql/AmbassadorRecentActivity-mysql/mysql-ambassadorRecentActivity');
	mysqlActivities.checkUserExist(reqparams.user_id)
	.then((data)=>{
		if(validator.isEmpty(data)){
			res.json({responseCode : 204, message: "No User Found",response:{}});
		}
		else{
			mysqlActivities.getAmbassadorId(res.locals.id)
			.then((data)=>{
				mysqlActivities.insertNewActivity(reqparams,data[0].id)
				.then((data)=>{
					res.json({responseCode : 200, message : "Recent Activity Added Sucessfully", response : {}});	
				})
			})	
		}
	})
	.catch((err)=>{
		res.status(400).json(REST_API_STATUS_CODE.badrequest);
	})
});

module.exports = router;