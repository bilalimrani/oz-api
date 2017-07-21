const express = require('express')
const router = express.Router()
const verifier_function = require('../verifier');



router.get('/ID_me', (req,res)=>{
	console.log("ID.me",req.body, req.params, req.query)
	res.send({message : "ID.me"})
})

module.exports = router;