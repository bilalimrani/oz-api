const express = require('express')
const router = express.Router()
const verifier_function = require('../verifier');
const curl = require('curl')
var request = require('request');

var url = 'https://api.id.me/oauth/token';


router.get('/ID_me', (req,res)=>{
	let query_data = req.query.code

	let body = {
		client_d : '2a4020a6d1b4fc5d721ed95be614e879',
		code : req.query.code,
		client_secret : '27bf2978791fb27a8b6ee84a38688741',
		redirect_uri : 'https://oz-dev.crewlogix.com/mobile/ID_me'
	}

	let options = {
		client_d : '2a4020a6d1b4fc5d721ed95be614e879',
		code : req.query.code,
		client_secret : '27bf2978791fb27a8b6ee84a38688741',
		redirect_uri : 'https://oz-dev.crewlogix.com/mobile/ID_me'
	}

	console.log("req",options)

	let response1;
	request({url : url, option : options}, function (error, response, body) {
		    response1 = response
		});

	res.send(response1)

})

module.exports = router;