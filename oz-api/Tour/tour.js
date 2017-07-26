const express = require('express');
const router = express.Router();
const validator = require('lodash');
const REST_API_STATUS_CODE = require("../../responses");
const verifier_function = require("../verifier");

router.get('/tour',verifier_function.verifier,(req,res)=>{
	var tourResponse = {
    "responseCode": 200,
    "message": "Tour record",
    "response":[
    {
    "title":"Army",
    "description": "some discription",
    "image":"https://img.huffingtonpost.com/asset/57f260301b00007f08ef4042.jpeg?cache=2vrfwcracv&ops=scalefit_720_noupscale"
     },
     {
    "title":"Army",
    "description": "some discription",
    "image":"https://i.ytimg.com/vi/R8mOrMr3jMM/maxresdefault.jpg"
     }
    ]
};
	//REST_API_STATUS_CODE.sucess.response = tourResponse;
 	res.json(tourResponse);
	

});

module.exports = router;