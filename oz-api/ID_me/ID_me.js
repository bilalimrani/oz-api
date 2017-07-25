const express = require('express')
const router = express.Router()
const verifier_function = require('../verifier');



router.get('/ID_me', (req,res)=>{
	console.log("ID.me",req.body, req.params, req.query,res)
	let query_data = req.query.code

	let data1 = {
		query : query_data,
	}
	res.send({message : "ID.me", response : data1})
})

module.exports = router;