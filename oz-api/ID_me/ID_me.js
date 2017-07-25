const express = require('express')
const router = express.Router()
const verifier_function = require('../verifier');

var request = require('request');
const app = express();
var url = 'https://api.id.me/oauth/token';
let code;
var curl = require('curlrequest');



var curlify = require('request-as-curl'),
    request = require('express'),
    data = {data: 'data'};


router.get('/ID_me', (req,res)=>{
	code = req.query.code
	let body = {
		client_d : '2a4020a6d1b4fc5d721ed95be614e879',
		code : code,
		client_secret : '27bf2978791fb27a8b6ee84a38688741',
		redirect_uri : 'https://oz-dev.crewlogix.com/mobile/ID_me'
	}

	let options = {
		client_d : '2a4020a6d1b4fc5d721ed95be614e879',
		code : code,
		client_secret : '27bf2978791fb27a8b6ee84a38688741',
		redirect_uri : 'https://oz-dev.crewlogix.com/mobile/ID_me',

	}

	console.log("https://api.id.me/oauth/token request with params",options)

	let response1;
	 request({url:'https://api.id.me/oauth/token',method:'POST'}, options, function (error, response, expected) {
	    console.log('api.id.me token ', error, response, expected)

	    if(err){
	    	console.log("err", err)
	    }
	    else{
	    	console.log("response", response)
	    }
	    response1 = response
	    res.send(error+response+expected)
	    
	});

	//res.send({"message" : response1})


})


module.exports = router;