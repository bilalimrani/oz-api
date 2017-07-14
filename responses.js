var responses = {
	'param_missing' : { code: 206, message:"Partial Content",response:{}},
	'already_reported' : {code: 208, message:"Account Already Exist",response:{}},
	'created' : {code : 201, message: "Insert Record Sucessfully Please verify your account for activation",response:{}},
	'no_content_found' : {code : 204, message: "No Record Found",response:{}},
	'ok_userAlreadyLogIn' : {code : 200,message : "User Already Login",response:{}},
	'sucess' : {code : 200,message : "sucess",response:{}},
	'unauthorized' : {code : 401 , message : "You are not authorize for this request",response : {}},
	'badrequest' : {code : 400 , message: "Bad Request Error",response:{}},
	'notModified' : {code : 304 , message : "Not Modified",response : {}}

}
module.exports = responses;