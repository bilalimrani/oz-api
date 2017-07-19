const express = require('express');
const router = express.Router();
const validator = require('lodash');
const REST_API_STATUS_CODE = require("../../responses");
const verifier_function = require("../verifier");
const configration = require('../../config')();
router.get('/becomeambassador',verifier_function.verifier,(req,res)=>{
	console.log("I am in becomeambassador Page")
	 
	 res.render('../pages/page1' ,  { link: 'http://techslides.com/demos/sample-videos/small.mp4',host:configration.path});

});
router.get('/quessionarepage',verifier_function.verifier,(req,res)=>{
	console.log("I am in Quessionare Page")
 
	let qs1 = "Reasearch on the development of a person in a so-called 'humanistic life outlook' has shown that it is facilitated by:";
    let qs2 = "In the context of group counseling,members that are high in conformity also tend to be high in:";
    let ans1_1 = "formal educational experiances XYZ"
    let ans1_2 = "observational learning experiances"
    let ans1_3 = "deverse interpresonal interaction"
    let ans1_4 = "All of the Above"
    res.render('../pages/quessionarepage',{q1:qs1,q2:qs2,chk1_1:ans1_1,chk1_2:ans1_2,chk1_3:ans1_3,chk1_4:ans1_4,host:configration.path });
})
router.get('/congratulationpage',verifier_function.verifier,(req,res)=>{
	console.log("I am in Congratulation Page");
	let params = {
		id:parseInt(res.locals.id)
	}
	
	const mysqlpages = require('../mysql/HtmlPages/mysql-htmlpages')
	mysqlpages.checkAmbassadorExistence(params)
	.then((data)=>{
		if(validator.isEmpty(data)){
			mysqlpages.insertNewAmbassador(params)
			.then((data)=>{
				console.log("After insertting new Ambassador")
				if(data.info.affectedRows == '1'){
					mysqlpages.verifyAmbassador(params)
					.then((data)=>{
							res.render('../pages/verifiedambassador');
						
						
					})
				}
				else{
					res.json(REST_API_STATUS_CODE.no_content_found);
				}
			})
		}
		else{
			 res.render('../pages/verifiedambassador');
		}
	})
	.catch((e)=>{
		res.status(400).json(REST_API_STATUS_CODE.badrequest);
	})
})
router.get('/setting_screen_page',(req,res)=>{
	 var globalResObj = {
        "responseCode" : "200",
        "message" : "Links posted sucessfully",
        "response":{
                "about_page": "",
                "terms_and_condition_page": "",
                "faq_page" : "",
                "privacy_page":""

        }
    };

    globalResObj.response.about_page = "http://" + configration.path + "/mobile/about_oz_page";
    globalResObj.response.terms_and_condition_page = "http://" + configration.path + "/mobile/terms_condition_page";
    globalResObj.response.faq_page = "http://" + configration.path+ "/mobile/faq_page";
    globalResObj.response.privacy_page = "http://" + configration.path+ "/mobile/privacy_page";

    res.json(globalResObj);
})
router.get('/about_oz_page',(req,res)=>{
	console.log('I am in about_oz_page router')
	let params = 'About'
	const mysqlpages = require('../mysql/HtmlPages/mysql-htmlpages')
	mysqlpages.common(params)
	.then((data)=>{
				if(data.info.numRows == '1'){
					console.log('data',data)
					let title = data[0].title;
                    let description1 = data[0].description;
                    res.render('../pages/about_oz',{title:title,description1:description1});
                }
                else{
                	res.json({responseCode:401,message:"No Record FOund",response : {}})
                }
	})
	.catch((err)=>{
		res.status(400).json(REST_API_STATUS_CODE.badrequest);
	})
	                
})
router.get('/terms_condition_page',(req,res)=>{
	 console.log('I am in terms_and_condition_page router')
	let params = 'TermsAndConditions'
	const mysqlpages = require('../mysql/HtmlPages/mysql-htmlpages')
	mysqlpages.common(params)
	.then((data)=>{
				if(data.info.numRows == '1'){
					console.log('data',data)
					let title = data[0].title;
                    let description1 = data[0].description;
                    res.render('../pages/terms_and_condition_page',{title:title,description1:description1});
                }
                else{
                	res.json({responseCode:401,message:"No Record FOund",response : {}})
                }
	})
	.catch((err)=>{
		res.status(400).json(REST_API_STATUS_CODE.badrequest);
	}) 
})
router.get('/faq_page',(req,res)=>{
	 console.log('I am in faq_page router')
})
router.get('/privacy_page',(req,res)=>{
	 console.log('I am in privacy_page router')
	 let params = 'PrivacyPolicy'
	const mysqlpages = require('../mysql/HtmlPages/mysql-htmlpages')
	mysqlpages.common(params)
	.then((data)=>{
				if(data.info.numRows == '1'){
					console.log('data',data)
					let title = data[0].title;
                    let description1 = data[0].description;
                    res.render('../pages/terms_and_condition_page',{title:title,description1:description1});
                }
                else{
                	res.json({responseCode:401,message:"No Record FOund",response : {}})
                }
	})
	.catch((err)=>{
		res.status(400).json(REST_API_STATUS_CODE.badrequest);
	})
})
module.exports = router;