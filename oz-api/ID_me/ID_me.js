const express = require('express')
const router = express.Router()
const verifier_function = require('../verifier');



router.post('/ID_me', verifier_function.verifier, (req,res)=>{
	console.log("res",res.locals)
	console.log("verifier", verifier_function.verifier)
})

module.exports = router;