const express = require('express');
const router = express.Router();
const validator = require('lodash');
const REST_API_STATUS_CODE = require("../../responses");
const verifier_function = require("../verifier");

router.get('/filters',verifier_function.verifier,(req,res)=>{
	console.log('I am in filters router')
	let mysqlfilters = require('../mysql/Filters/mysql-filters');
	mysqlfilters.getFilters()
	.catch((err)=>{
		console.log('I am in error')
	})

})

module.exports = router;