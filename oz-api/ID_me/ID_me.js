const express = require('express')
const router = express.Router()
const verifier_function = require('../verifier');

var request = require('request');
const app = express();
var url = 'https://api.id.me/oauth/token';
let code;
var curl = require('curlrequest');

router.get('/ID_me',  (req,res)=>{
	
})


router.get('/verification', verifier_function.verifier, (req, res)=>{
	let IDme_Url = 'https://api.id.me/oauth/authorize?client_id=2a4020a6d1b4fc5d721ed95be614e879&redirect_uri=https://oz-dev.crewlogix.com/mobile/ID_me&response_type=code&scope=military&state=488e864b'
	request(IDme_Url, (request,response)=>{
		res.send("data",request)
	})


})

module.exports = router;