const express = require('express');
const router = express.Router();
const validator = require('lodash');
const REST_API_STATUS_CODE = require("../../responses");
const verifier_function = require("../verifier");
const configration = require('../../config')();
const date = require('date-and-time');
let Validator = (req,res,next) =>{
    let params = req.body;
    let result = false;
    if(params.type && params.user_id)
    {
        if(params.type === 'video' || params.type === 'voice' || params.type === 'sent_message' || params.type === 'receive_message'){
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
				.catch((err)=>{
					console.log('I am in errorssssssssss', err)
					REST_API_STATUS_CODE.badrequest.response = err;
					res.send(REST_API_STATUS_CODE.badrequest);		
				})
			
				
			})
			.catch((err)=>{
				console.log('I am in 2nd Catch', err)
				res.send(REST_API_STATUS_CODE.badrequest);
			})
			
		}
	})
	.catch((err)=>{
		console.log('errorssssssssss');
		res.send(REST_API_STATUS_CODE.badrequest);
	})
});

router.get('/time',(req,res)=>{
	console.log('HEEEEEEEEEEEEEEEEEEE')
	let now = new Date(1500987701906);
	let after = new Date(1500991838483);
	console.log('Now ',now)
	let x = '1500987701906';
	console.log('Time at the Moment  ',date.format(now, 'YYYY/MM/DD HH:mm:ss'));
	console.log('Time at the Moment 233 ',date.format(after, 'YYYY/MM/DD HH:mm:ss'));
	console.log('Time After Calculation   -- ',date.subtract(after, now).toSeconds() % 3600 / 60);
	
	var h = Math.floor(date.subtract(after, now).toSeconds() / 3600);
    var m = Math.floor(date.subtract(after, now).toSeconds() % 3600 / 60);
    var s = Math.floor(date.subtract(after, now).toSeconds() % 3600 % 60)
	
	var hDisplay = h > 0 ? h + (h == 1 ? ":" : ":") : "";
    var mDisplay = m > 0 ? m + (m == 1 ? ":" : ":") : "";
    var sDisplay = s > 0 ? s + (s == 1 ? "" : "") : "";

    console.log('Final Time - ',hDisplay + mDisplay + sDisplay)
})
module.exports = router;