const express = require('express')
const router = express.Router()
const verifier_function = require('../verifier');
const curl = require('curl')
var request = require('request');
const app = express();
var url = 'https://api.id.me/oauth/token';
let code;

router.get('/ID_me', (req,res)=>{
	code = req.query.code

	let body = {
		url : 'https://api.id.me/oauth/token',
		client_d : '2a4020a6d1b4fc5d721ed95be614e879',
		code : code,
		client_secret : '27bf2978791fb27a8b6ee84a38688741',
		redirect_uri : 'https://oz-dev.crewlogix.com/mobile/ID_me'
	}

	let options = {
		url : 'https://api.id.me/oauth/token',
		client_d : '2a4020a6d1b4fc5d721ed95be614e879',
		code : code,
		client_secret : '27bf2978791fb27a8b6ee84a38688741',
		redirect_uri : 'https://oz-dev.crewlogix.com/mobile/ID_me'
	}

	

	let response1;
	request(options, function (error, response, body) {

			console.log("response", response)
		    response1 = response
		    res.send(response1)
	});
	res.send(response1)
	
})


module.exports = router;