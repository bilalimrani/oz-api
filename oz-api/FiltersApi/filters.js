const express = require('express');
const router = express.Router();
const validator = require('lodash');
const REST_API_STATUS_CODE = require("../../responses");
const verifier_function = require("../verifier");

router.get('/filters',verifier_function.verifier,(req,res)=>{
	console.log('I am in filters router')
	let mysqlfilters = require('../mysql/Filters/mysql-filters');
	mysqlfilters.getFilters()
	.then((Filters)=>{
		REST_API_STATUS_CODE.sucess.response = Filters;
			res.json(REST_API_STATUS_CODE.sucess);
	})
	.catch((err)=>{
		console.log('I am in error')
	})

	// filter = {
 //            service : ["USMC", "USMC"],
 //            veteran : ["OIF", "OIF"],
 //            component : ["Active Duty", ""],
 //            MOS : ["MOS", "MOS"],
 //            distance : ["50 mi", "70 mi", "80 mi"],
 //            gender : ["Male", "Female"],
 //            age_range : ["20 to 30", "30 to 40", "40 to 50"]
 //        }


 //    res.json({responseCode : 200, message : "ambassador filter record", response :  filter})

})

module.exports = router;