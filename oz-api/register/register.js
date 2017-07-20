
const express = require('express');
const router = express.Router();
const validator = require('lodash');
const REST_API_STATUS_CODE = require("../../responses")

let registerValidator = (req,res,next) =>{
    let params = req.body;
    let result = false;
    if(params.email && params.password && params.deviceId && params.deviceType)
    {
        if(params.email.length > 1 && params.password.length > 5 && params.deviceId.length > 0 && params.deviceType.length > 0){
            let emailValidator = require('isemail');
            let isEmail = emailValidator.validate(params.email);
            if(isEmail)
            result = true;
            else result = false
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

router.post('/register',registerValidator,(req,res)=>{
    let reqParams = req.body;
    let mysqlRegister = require('../mysql/register/mysql-register')
    mysqlRegister.checkUserExistence(reqParams)
    .then((data)=>{
        if(validator.isEmpty(data)){
            mysqlRegister.insertUser(reqParams)
            .then((dataObj)=>{
                mysqlRegister.sendMail(dataObj)
                .then((data)=>{res.json(REST_API_STATUS_CODE.created)
				
				})
				
            })
			
			
        }else{
            res.json(REST_API_STATUS_CODE.already_reported);
        } 
    })
    .catch((err)=>{ 
        res.status(400).json(REST_API_STATUS_CODE.badrequest);
    });
})
router.get('/verify',(req,res)=>{
    let mysqlVerify = require('../mysql/register/mysql-verify')
    mysqlVerify.verifyLink(req.query.id)
    .then((data)=>{
        if(validator.isEmpty(data)){
            res.json(REST_API_STATUS_CODE.no_content_found);
        }else{
             mysqlVerify.activateEmail(data[0].email).then(res.end())
        }

    })
    .catch((e)=>{
        res.status(400).json(REST_API_STATUS_CODE.badrequest);
    })
})
    
module.exports = router;
