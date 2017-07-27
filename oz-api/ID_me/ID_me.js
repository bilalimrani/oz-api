const express = require('express')
const router = express.Router()
const verifier_function = require('../verifier');
var request = require('request');
const app = express();
var url = 'https://api.id.me/oauth/token';
var curl = require('curlrequest');
const REST_API_STATUS_CODE = require("../../responses");
let code;

router.get('/ID_me', (req,res)=>{
	code = req.query.code
	let testtoken = '1234ABC'
	let response1;
	 request.post({url:'https://api.id.me/oauth/token', form: {
	 	client_id : '2a4020a6d1b4fc5d721ed95be614e879',
		code : code,
		client_secret : '27bf2978791fb27a8b6ee84a38688741',
		redirect_uri : 'https://oz-dev.crewlogix.com/mobile/ID_me',
		grant_type : 'authorization_code'
	 } } , function (error, response, expected) {

	    res.render('../pages/veteran.ejs',{data : expected})
	    
	});

	//res.send({"message" : response1})



})
router.post('/veteran_data', verifier_function.verifier, (req, res)=>{
	if(req.body.veteran_data != ""){
		let mysql_insertIDme = require('../mysql/ID_me/mysql_IDme')
	    mysql_insertIDme.updateVeteran(res.locals, req.body.veteran_data)
	    .then((data)=>{
	    	res.send({"responseCode" : 200, "message" : "Data updated Sussessfullt", "response" : data[1][0] })
	    })
	   	.catch((err)=>{
	    	res.status(400).json(REST_API_STATUS_CODE.badrequest)
	    })
	}
})


module.exports = router;