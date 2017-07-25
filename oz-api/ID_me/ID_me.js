const express = require('express')
const router = express.Router()
const verifier_function = require('../verifier');

var request = require('request');
const app = express();
var url = 'https://api.id.me/oauth/token';
let code;
var curl = require('curlrequest');

router.get('/ID_me', (req,res)=>{
	code = req.query.code
	res.redirect('/mobile/ID_me');


})

router.post('/mobile/IDme_auth', (req, res)=>{

	let body = {
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
		redirect_uri : 'https://oz-dev.crewlogix.com/mobile/ID_me',
		
	}

	

	let response1;
	curl.request(options, function (err, parts) {
	    parts = parts.split('\r\n');
	    var data = parts.pop()
	      , head = parts.pop();
	});

	res.send(response1)
})

module.exports = router;