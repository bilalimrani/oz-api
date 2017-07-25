const express = require('express')
const router = express.Router()
const verifier_function = require('../verifier');



router.get('/ID_me', (req,res)=>{
	console.log("ID.me",req.body, req.params, req.query,res)


	let data = {
		body : req.body,
		params : req.params,
		query : req.params,
		res : res
	}
	res.send({message : "ID.me", response : data})
})

module.exports = router;