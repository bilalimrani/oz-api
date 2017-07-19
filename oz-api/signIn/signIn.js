
const express = require('express');
const router = express.Router();
const validator = require('lodash');
const REST_API_STATUS_CODE = require("../../responses")

let signInValidator = (req,res,next) =>{
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

router.put('/signin',signInValidator,(req,res)=>{
    let reqParams = req.body;
    let mysqlSignIn = require('../mysql/signIn/mysql-signin')
    mysqlSignIn.checkAlreadyLogIn(reqParams)
    .then((data)=>{
        if(validator.isEmpty(data)){
            console.log("hhhhhhhhhhh");
            res.json(REST_API_STATUS_CODE.no_content_found);
        }
        else if(data[0].deviceId == reqParams.deviceId && data[0].deviceType == reqParams.deviceType && data[0].access_token != ''){
            REST_API_STATUS_CODE.ok_userAlreadyLogIn.response = data;
            res.json(REST_API_STATUS_CODE.ok_userAlreadyLogIn);
        }
       else{

            mysqlSignIn.newLogin(reqParams)
            .then((data)=>{
                if(data.info.affectedRows == '1'){
                    mysqlSignIn.returnResponse(reqParams)
                    .then((data)=>{
                        REST_API_STATUS_CODE.ok_userAlreadyLogIn.response = data[0];
                        REST_API_STATUS_CODE.ok_userAlreadyLogIn.message = "User LogIn Sucessfully"
                        res.json(REST_API_STATUS_CODE.ok_userAlreadyLogIn);
                    })
                }
                else{
                    console.log('finallyyyyyyyyyy')
                    res.json({responseCode : 201 , message : 'Your Account is no activate yet,An email is send please click on it',response : {}});
                }
               
            })
       }
    })
    .catch((e)=>{
        console.log("Helo err")
       res.status(400).json(REST_API_STATUS_CODE.badrequest);
    })

});

module.exports = router;
