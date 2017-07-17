const validator = require('lodash');
const REST_API_STATUS_CODE = require("../responses")
var verifier = function(req,res,next){
	let token = req.headers.access_token;
	var token_verifier = require('./mysql/token_verifier/token_verify')
	token_verifier.verifyToken(token)
	.then((data)=>{
		if(validator.isEmpty(data)){
			res.status(REST_API_STATUS_CODE.unauthorized.code).json(REST_API_STATUS_CODE.unauthorized);
		}
		else{
			 res.locals = data[0];
			next()
		}
	})
	
}

module.exports = {
	verifier : verifier
}; 