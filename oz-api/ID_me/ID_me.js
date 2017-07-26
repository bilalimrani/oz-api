const express = require('express')
const router = express.Router()
const verifier_function = require('../verifier');

var request = require('request');
const app = express();
var url = 'https://api.id.me/oauth/token';
let code;
var curl = require('curlrequest');

router.get('/ID_me',  (req,res)=>{

	res.send({"message" : "Hello World"})
	

	//res.send({"message" : response1})


})


module.exports = router;