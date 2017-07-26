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

	let response1;
	 request.post({url:'https://api.id.me/oauth/token', form: {
	 	client_id : '2a4020a6d1b4fc5d721ed95be614e879',
		code : code,
		client_secret : '27bf2978791fb27a8b6ee84a38688741',
		redirect_uri : 'https://oz-dev.crewlogix.com/mobile/ID_me',
		grant_type : 'authorization_code'
	 } } , function (error, response, expected) {
	    

	    if(error){
	    	console.log("err", error)
	    }
	    else if(Object.keys(expected)){
	    	new Promise((resolve, reject)=>{
	    		let mysql_insertIDme = require('../mysql/ID_me/mysql-ID-me')
	    		mysql_insertIDme.updateVeteran("veteran")

	    	})
	    }
	    
	    
	});

	//res.send({"message" : response1})


})


module.exports = router;