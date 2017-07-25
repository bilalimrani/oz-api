const express = require('express')
const router = express.Router()
const verifier_function = require('../verifier');
const curl = require('curl')



router.get('/ID_me', (req,res)=>{
	console.log("ID.me",req.body, req.params, req.query,res)
	let query_data = req.query.code

	let data1 = {
		query : query_data,
	}

	let body = {
		code : req.query.code,
		client_d : '2a4020a6d1b4fc5d721ed95be614e879',
		client_secret : '27bf2978791fb27a8b6ee84a38688741',
		redirect_uri : 'https://oz-dev.crewlogix.com/mobile/ID_me'
	}

	let options = {
		code : req.query.code,
		client_d : '2a4020a6d1b4fc5d721ed95be614e879',
		client_secret : '27bf2978791fb27a8b6ee84a38688741',
		redirect_uri : 'https://oz-dev.crewlogix.com/mobile/ID_me'
	}

	let response1;
	curl.post('https://api.id.me/oauth/token', body, options, function(err, response, body) {
		response1 = response
	});
	res.send(response)
})

module.exports = router;