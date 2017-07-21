const express = require('express')
const router = express.Router()
const verifier_function = require('../verifier');



router.get('/ID_me', (req,res)=>{
	res.send({message : "ID.me", req : req, res : res})
})

module.exports = router;