const express = require('express');
const router = express.Router();
const validator = require('lodash');
const REST_API_STATUS_CODE = require("../../responses");
const verifier_function = require("../verifier");

router.get('/activities',verifier_function.verifier,(req,res)=>{
	var ActivitiesResponse = {
    "responseCode": 200,
    "message": "ambassador filter record",
    "response": [
            {
                "category_title":"Catregory title",
                "category_image": "https://img.huffingtonpost.com/asset/57f260301b00007f08ef4042.jpeg?cache=2vrfwcracv&ops=scalefit_720_noupscale",
                "activities" : [
                    {
                    "title":"Tiltel",
                    "description": "sucessome discription",
                    "image":"https://img.huffingtonpost.com/asset/57f260301b00007f08ef4042.jpeg?cache=2vrfwcracv&ops=scalefit_720_noupscale",
                    "weblink":"URL if contaings other wise empty"
                     },
                     {
                    "title":"Tiltel",
                    "description": "some discription",
                    "image":"https://img.huffingtonpost.com/asset/57f260301b00007f08ef4042.jpeg?cache=2vrfwcracv&ops=scalefit_720_noupscale",
                    "weblink":"URL if contaings other wise empty"
                     },
                     {
                    "title":"Tiltel",
                    "description": "some discription",
                    "image":"https://img.huffingtonpost.com/asset/57f260301b00007f08ef4042.jpeg?cache=2vrfwcracv&ops=scalefit_720_noupscale",
                    "weblink":"URL if contaings other wise empty"
                     }
                        ]
            },
             {
                    "category_title":"Catregory title",
                    "category_image": "https://img.huffingtonpost.com/asset/57f260301b00007f08ef4042.jpeg?cache=2vrfwcracv&ops=scalefit_720_noupscale",
                    "activities" : [
                            ]
            },
            {
                    "category_title":"Catregory title",
                    "category_image": "https://img.huffingtonpost.com/asset/57f260301b00007f08ef4042.jpeg?cache=2vrfwcracv&ops=scalefit_720_noupscale",
                        "activities" : [
                        {
                        "title":"Tiltel",
                        "description": "some discription",
                        "image":"https://img.huffingtonpost.com/asset/57f260301b00007f08ef4042.jpeg?cache=2vrfwcracv&ops=scalefit_720_noupscale",
                        "weblink":"URL if contaings other wise empty"
                         },
                         {
                        "title":"Tiltel",
                        "description": "some discription",
                        "image":"https://img.huffingtonpost.com/asset/57f260301b00007f08ef4042.jpeg?cache=2vrfwcracv&ops=scalefit_720_noupscale",
                        "weblink":"URL if contaings other wise empty"
                         },
                         {
                        "title":"Tiltel",
                        "description": "some discription",
                        "image":"https://img.huffingtonpost.com/asset/57f260301b00007f08ef4042.jpeg?cache=2vrfwcracv&ops=scalefit_720_noupscale",
                        "weblink":"URL if contaings other wise empty"
                         }
                            ]
            }
             ]
            }
	//REST_API_STATUS_CODE.sucess.response = tourResponse;
 	res.json(ActivitiesResponse);
	

});

module.exports = router;