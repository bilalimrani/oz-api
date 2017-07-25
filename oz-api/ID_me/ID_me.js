const express = require('express')
const router = express.Router()
const verifier_function = require('../verifier');
var request = require('request');
const app = express();

let code;


router.get('/ID_me', verifier_function.verifier, (req,res)=>{
	console.log("ok")
	code = req.query.code

	let response1;
	 request.post({url:'https://api.id.me/oauth/token', form: {
	 	client_id : '2a4020a6d1b4fc5d721ed95be614e879',
		code : code,
		client_secret : '27bf2978791fb27a8b6ee84a38688741',
		redirect_uri : 'https://oz-dev.crewlogix.com/mobile/ID_me',
		grant_type : 'authorization_code'
	 } } , function (error, response, expected) {
	    console.log('api.id.me token ', error, response.statusCode, expected)

	    if(error){
	    	console.log("err", error)
	    }
	    else{
	    	console.log("response")
	    }
	    response1 = response
	    res.send(error+response+expected)
	    
	});

})


module.exports = router;