var responses = {
	'param_missing' : { responseCode: 206, message:"Partial Content",response:{}},
	'already_reported' : {responseCode: 208, message:"Account Already Exist",response:{}},
	'created' : {responseCode : 201, message: "Insert Record Sucessfully Please verify your account for activation",response:{}},
	'no_content_found' : {responseCode : 204, message: "No Record Found",response:{}},
	'no_content_found1' : {responseCode : 204, message: "No Record Found",response:[]},
	'ok_userAlreadyLogIn' : {responseCode : 200,message : "User Already Login",response:{}},
	'sucess' : {responseCode : 200,message : "sucess",response:{}},
	'unauthorized' : {responseCode : 401 , message : "You are not authorize for this request",response : {}},
	'badrequest' : {responseCode : 400 , message: "Bad Request Error",response:{}},
	'notModified' : {responseCode: 304 , message : "Not Modified",response : {}}

}
module.exports = responses;