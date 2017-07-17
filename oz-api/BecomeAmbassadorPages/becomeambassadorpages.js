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
module.exports = router;