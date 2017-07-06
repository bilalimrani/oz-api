"user strict"

const commonUtil = require('../../../utils/utils');
const databaseUtil = require('../../../utils/database_utils');
const apiUtil = require('../../../utils/api_utils');
const _ = require('underscore');

const configuration = require('../../../config')();
let URL  = configuration.host;
let port = configuration.port;
var multer = require('multer')
var thumb = require('node-thumbnail').thumb;

	console.log("My UrL ",URL)
	console.log("My port ",port)

function updateAmbassador(req,res){
	 

	var globalResObj = {
		"responseCode" : "200",
		"message" : "Data Retrived Sucessfully",
		"response":{
				  "id": "",
			      "user_id": "",
			      "name": "",
			      "age": "",
			      "gender": "",
			      "days_available": "",
			      "time_range_start": "",
			      "time_range_end": "",
			      "is_available_voiceCall": "",
			      "is_available_videoCall": "",
			      "is_available_textChat": "",
			      "lat": "",
			      "lng": "",
			      "service_member": "",
			      "service": "",
			      "veteran": "",
			      "component": "",
			      "mos": "",
			      "email": "",
			      "contact": "",
			      "date_of_birth": "",
			      "city": "",
			      "state": "",
			      "zip_code": "",
			      "profile_pic": "",
			      "thumbnail": "",
			      "is_favourite": ""

		}
	};

	var img_path = null; 
	var user_id = req.userData.id;
	var dbObj = req.app.get('db');
	
	var path = req.app.get('current_directory');
	var thumbPath = path + "/bin/thumbnail"
	path = path + "/bin/upload";
	
	req.assert('name', 'please put name').notEmpty();
	console.log('Final path',path);
	

			// get image first
		var getImage = function(req){

			return new Promise((resolve,reject)=>{
			var storage = multer.diskStorage({

			destination: function(req, file, callback) {
				callback(null, path)
			},
			filename: function(req, file, callback) {
				var spliter = file.mimetype.split('/');
				
				callback(null, file.fieldname + '_' + Date.now() +'.'+ spliter[1])
			}
		})

		var upload = multer({
			storage: storage,
			fileFilter: function(req, file, callback) {
				console.log("FIle  ",file);
				var ext = file.originalname
				callback(null, true)
		}
		}).single('filename');
		upload(req, res, function(err) {
			if(req.file){
				console.log("I am in");
				img_path = req.file.path;
			console.log('My Images Path ',img_path);
			thumb({
						  source: img_path, // could be a filename: dest/path/image.jpg 
						  destination: thumbPath,
						  concurrency: 1
						}, function(files, err, stdout, stderr) {
						  console.log('All done!');
						});
			}else{
				console.log("Ok problem solved");
			}
			
			resolve(req);
		})
	});
	}


		

	var insertAmbassador = function(req){
		console.log("I am in insert Ambassador")
		var image_path = null;
			console.log(img_path);
		if(img_path != null){
			 image_path = img_path.split('/');
			 var thumbs_img = image_path[image_path.length-1];
			 var splits_thumb = thumbs_img.split('.');
			 var full_thumb_path = splits_thumb[0] + '_thumb.' + splits_thumb[1];
		console.log("Image Path ",full_thumb_path);
		
		}

		
		var body = req.body;
		var table = 'ambassedor';
		return new Promise((resolve,reject)=>{
       console.log('tableeeeeeeee' ,table);
       console.log('bodyyyyyyyyyyyyyy' ,req.body.name);
				 let query = null;
				 	let dataobj = null;
				 	if(image_path == null){
						 	dataobj = {name:req.body.name, 
		             		age:req.body.age ,
		             	 	gender:req.body.gender , 
		             		service_member:req.body.service_member,
		             		lat: req.body.lat,
		             		lng: req.body.lng,
							service: req.body.service,
							veteran: req.body.veteran,
							mos: req.body.mos,
							component:req.body.component,
		             		user_id:user_id};
		             		query = 'UPDATE ambassedor SET name = :name, age = :age, gender = :gender ,service_member=:service_member,service=:service,veteran=:veteran,mos=:mos,component=:component,lat=:lat,lng=:lng WHERE user_id = :user_id';
				 	}
		             	else{
		             		console.log("I am ",URL)
		             		console.log("I am ",port)
		             	dataobj = {name:req.body.name, 
		             		age:req.body.age ,
		             	 	gender:req.body.gender , 
		             		service_member:req.body.service_member,
		             		lat: req.body.lat,
		             		lng: req.body.lng,
							service: req.body.service,
							veteran: req.body.veteran,
							mos: req.body.mos,
							component:req.body.component,
							profile_pic:'http://' + URL + ':' + port+ '/upload/'+image_path[image_path.length-1],
							thumbnail : 'http://'+URL + ":" + port + "/thumbnail/" + full_thumb_path,
		             		user_id:user_id};
		             		query = 'UPDATE ambassedor SET name = :name, age = :age, gender = :gender ,service_member=:service_member,service=:service,veteran=:veteran,mos=:mos,component=:component,profile_pic=:profile_pic,thumbnail=:thumbnail,lat=:lat,lng=:lng WHERE user_id = :user_id';
		             		

		             }


		            

       databaseUtil.updateMultiRecord(dbObj,query,dataobj,function (err,data){
             if(err){
             	console.log("error 1",err)
                 reject(err);
             }else{
                 
                 resolve(data);
             }
         });
       });
	};

	var returnResponse = function(data){
		let table = 'ambassedor';
        let dataobj = {
            user_id : user_id
        };

		let query  = 'SELECT * FROM ambassedor WHERE user_id=:user_id' ;
 			databaseUtil.getSingleRecord(dbObj,query,dataobj,function (err,data){
                if(err){
                	console.log("error 2",err)
                    reject(err);
                }else{
                    if(_.isEmpty(data)){
                        reject(new Error({responseCode:202,message:"An error occured during insertion",response:{}}))
                    }else{

                    	globalResObj.response.id = data[0].id;
                    	globalResObj.response.user_id = data[0].user_id;
                    	globalResObj.response.name = data[0].name;
	                    globalResObj.response.age = data[0].age;
						globalResObj.response.gender = data[0].gender;
						globalResObj.response.email = data[0].email;
						globalResObj.response.contact = data[0].contact;
						globalResObj.response.date_of_birth = data[0].date_of_birth;
						globalResObj.response.city = data[0].city;
						globalResObj.response.state = data[0].state;
						globalResObj.response.zip_code = data[0].zip_code;
						globalResObj.response.service_member = data[0].service_member;
						globalResObj.response.service = data[0].service;
						globalResObj.response.veteran = data[0].veteran;
						globalResObj.response.mos = data[0].mos;
						globalResObj.response.component = data[0].component;
						globalResObj.response.days_available = data[0].days_available;
						globalResObj.response.lat = data[0].lat;
				        globalResObj.response.lng = data[0].lng;
				        globalResObj.response.time_range_start = data[0].time_range_start;
				        globalResObj.response.time_range_end = data[0].time_range_end;
				        globalResObj.response.is_available_voiceCall = data[0].is_available_voiceCall;
				        globalResObj.response.is_available_textChat = data[0].is_available_textChat;
				        globalResObj.response.is_available_videoCall = data[0].is_available_videoCall;
				        globalResObj.response.thumbnail = data[0].thumbnail;
				       	globalResObj.response.is_favourite = data[0].is_favourite;
                    	globalResObj.response.profile_pic = data[0].profile_pic;
                        res.json(globalResObj);
                    }
                }

            });
	};

            	getImage(req)
            	.then(insertAmbassador)
            	.then(returnResponse)
                .catch((e) => {
                res.status(299).json({message: "something wrong happend while processsing request", error: e});
        });
        

}

function addNewAmbassador(req,res){

	var globalResObj = {
		"responseCode" : "200",
		"message" : "Data Retrived Sucessfully",
		"response":{
				  "id": "",
			      "user_id": "",
			      "name": "",
			      "age": "",
			      "gender": "",
			      "days_available": "",
			      "time_range_start": "",
			      "time_range_end": "",
			      "is_available_voiceCall": "",
			      "is_available_videoCall": "",
			      "is_available_textChat": "",
			      "lat": "",
			      "lng": "",
			      "service_member": "",
			      "service": "",
			      "veteran": "",
			      "component": "",
			      "mos": "",
			      "email": "",
			      "contact": "",
			      "date_of_birth": "",
			      "city": "",
			      "state": "",
			      "zip_code": "",
			      "profile_pic": "",
			      "thumbnail": "",
			      "is_favourite": ""

		}
	};
	
	console.log("Start Testing updateAmbassador Api");
	var user_id = req.userData.id;
	var dbObj = req.app.get('db');
	console.log('Data of Ambassador',req.body);
	req.assert('name' , 'please put Name').notEmpty();

	var updateAmbassador = function(req){
		var body = req.body;
		var table = "ambassedor";

		return new Promise((resolve,reject) =>{
				console.log('I am in table - ',table);
				let query = 'UPDATE ambassedor SET name = :name, age = :age, gender = :gender ,service_member=:service_member,contact_type=:contact_type,service=:service,veteran=:veteran,mos=:mos,component=:component WHERE user_id = :user_id';
				let dataobj = {
						name : req.body.name,
						age : req.body.age,
						gender : req.body.gender,
						service_member : req.body.service_member,
						contact_type : req.body.contact_type,
						service: req.body.service,
						veteran: req.body.veteran,
						mos: req.body.mos,
						component:req.body.component,
             			user_id:user_id
				};

				databaseUtil.updateMultiRecord(dbObj,query,dataobj,function(err,data){
						if(err){
							reject(err);
						}
						else
						{
							console.log('I have update the ambassedor record - ',data);
							resolve(data);
						}
				});

		});
	};

	var returnResponse = function(data){
		return new Promise ((resolve,reject)=>{
				globalResObj.responseCode = 200;
				globalResObj.message = "Ambassador Record Update Sucessfully";
				res.json(globalResObj);
		});
	};

	req.getValidationResult().then(function(result){
		if(_.isEmpty(result.useFirstErrorOnly().array[0])){
				updateAmbassador(req)
				.then(returnResponse)
				.catch((e)=>{
						 res.status(299).json({message: "something wrong happend while processsing request", error: e});
				});
		}
		else{
				res.json({responseCode:510,message:"validation error",response:result.useFirstErrorOnly().array()[0]});
		}
	});

}
function getAmbassadorProfile(req,res){

var globalResObj = {
		"responseCode" : "200",
		"message" : "Data Retrived Sucessfully",
		"response":{
				  "id": "",
			      "user_id": "",
			      "name": "",
			      "age": "",
			      "gender": "",
			      "days_available": "",
			      "time_range_start": "",
			      "time_range_end": "",
			      "is_available_voiceCall": "",
			      "is_available_videoCall": "",
			      "is_available_textChat": "",
			      "lat": "",
			      "lng": "",
			      "service_member": "",
			      "service": "",
			      "veteran": "",
			      "component": "",
			      "mos": "",
			      "email": "",
			      "contact": "",
			      "date_of_birth": "",
			      "city": "",
			      "state": "",
			      "zip_code": "",
			      "profile_pic": "",
			      "thumbnail": "",
			      "is_favourite": ""

		}
	};
	
	var user_id = req.userData.id;
	var dbObj = req.app.get('db');

	var retriveData = function(req){
		var body = req.body;
		var table = "ambessador";

		let query = "Select *from ambassedor where user_id = :user_id";
		return new Promise((resolve,reject)=>{
			var dataobj = {
				user_id : user_id
			}

			databaseUtil.getSingleRecord(dbObj,query,dataobj,function(err,data){
				if(err){
					reject(err);
				}else{
					resolve(data);	
				}
			})
		});
	};

	var returnResponse = function(data){
		return new Promise((resolve,reject)=>{
			console.log('Check')
						globalResObj.response.id = data[0].id;
                    	globalResObj.response.user_id = data[0].user_id;
                    	globalResObj.response.name = data[0].name;
	                    globalResObj.response.age = data[0].age;
						globalResObj.response.gender = data[0].gender;
						globalResObj.response.email = data[0].email;
						globalResObj.response.contact = data[0].contact;
						globalResObj.response.date_of_birth = data[0].date_of_birth;
						globalResObj.response.city = data[0].city;
						globalResObj.response.state = data[0].state;
						globalResObj.response.zip_code = data[0].zip_code;
						globalResObj.response.service_member = data[0].service_member;
						globalResObj.response.service = data[0].service;
						globalResObj.response.veteran = data[0].veteran;
						globalResObj.response.mos = data[0].mos;
						globalResObj.response.component = data[0].component;
						globalResObj.response.days_available = data[0].days_available;
						globalResObj.response.lat = data[0].lat;
				        globalResObj.response.lng = data[0].lng;
				        globalResObj.response.time_range_start = data[0].time_range_start;
				        globalResObj.response.time_range_end = data[0].time_range_end;
				        globalResObj.response.is_available_voiceCall = data[0].is_available_voiceCall;
				        globalResObj.response.is_available_textChat = data[0].is_available_textChat;
				        globalResObj.response.is_available_videoCall = data[0].is_available_videoCall;
				        globalResObj.response.thumbnail = data[0].thumbnail;
				       	globalResObj.response.is_favourite = data[0].is_favourite;
                    	globalResObj.response.profile_pic = data[0].profile_pic;
                        res.json(globalResObj);
	
				resolve(data);
		});
	};

	retriveData(req).then(returnResponse).catch((e)=>{
		 res.status(299).json({message: "something wrong happend while processsing request", error: e});
	});
}
function ambassadorAvalibility(req,res){

	var globalResObj = {
		"responseCode" : "200",
		"message" : "Data Retrived Sucessfully",
		"response":{
				  "id": "",
			      "user_id": "",
			      "name": "",
			      "age": "",
			      "gender": "",
			      "days_available": "",
			      "time_range_start": "",
			      "time_range_end": "",
			      "is_available_voiceCall": "",
			      "is_available_videoCall": "",
			      "is_available_textChat": "",
			      "lat": "",
			      "lng": "",
			      "service_member": "",
			      "service": "",
			      "veteran": "",
			      "component": "",
			      "mos": "",
			      "email": "",
			      "contact": "",
			      "date_of_birth": "",
			      "city": "",
			      "state": "",
			      "zip_code": "",
			      "profile_pic": "",
			      "thumbnail": "",
			      "is_favourite": ""

		}
	};

	var user_id = req.userData.id;
	var dbObj = req.app.get('db');
	
	

	var insertAmbassador = function(req){
		console.log("I am in insert Ambassador")
		
		var body = req.body;
		return new Promise((resolve,reject)=>{
				 let query = null;
				 	let dataobj  = {
						 	days_available:req.body.days_available, 
		             		time_range_start:req.body.time_range_start ,
		             	 	time_range_end:req.body.time_range_end , 
		             		is_available_voiceCall:req.body.is_available_voiceCall,
		             		is_available_textChat: req.body.is_available_textChat,
		             		is_available_videoCall: req.body.is_available_videoCall,
		             		user_id:user_id
		             	};
		             		query = 'UPDATE ambassedor SET days_available= :days_available, time_range_start = :time_range_start, time_range_end = :time_range_end ,is_available_voiceCall=:is_available_voiceCall,is_available_textChat=:is_available_textChat,is_available_videoCall=:is_available_videoCall WHERE user_id = :user_id';
				 	
		             	
       databaseUtil.updateMultiRecord(dbObj,query,dataobj,function (err,data){
             if(err){
             	
                 reject(err);
             }else{
                 
                 resolve(data);
             }
         });
       });
	};

	var returnResponse = function(data){
		let table = 'ambassedor';
        let dataobj = {
            user_id : user_id
        };

		let query  = 'SELECT * FROM ambassedor WHERE user_id=:user_id' ;
 			databaseUtil.getSingleRecord(dbObj,query,dataobj,function (err,data){
                if(err){
                    reject(err);
                }else{
                    if(_.isEmpty(data)){
                        reject(new Error({responseCode:202,message:"An error occured during insertion",response:{}}))
                    }else{
                    	console.log('Start Checking')
                    	globalResObj.response.id = data[0].id;
                    	globalResObj.response.user_id = data[0].user_id;
                    	globalResObj.response.name = data[0].name;
	                    globalResObj.response.age = data[0].age;
						globalResObj.response.gender = data[0].gender;
						globalResObj.response.email = data[0].email;
						globalResObj.response.contact = data[0].contact;
						globalResObj.response.date_of_birth = data[0].date_of_birth;
						globalResObj.response.city = data[0].city;
						globalResObj.response.state = data[0].state;
						globalResObj.response.zip_code = data[0].zip_code;
						globalResObj.response.service_member = data[0].service_member;
						globalResObj.response.service = data[0].service;
						globalResObj.response.veteran = data[0].veteran;
						globalResObj.response.mos = data[0].mos;
						globalResObj.response.component = data[0].component;
						globalResObj.response.days_available = data[0].days_available;
						globalResObj.response.lat = data[0].lat;
				        globalResObj.response.lng = data[0].lng;
				        globalResObj.response.time_range_start = data[0].time_range_start;
				        globalResObj.response.time_range_end = data[0].time_range_end;
				        globalResObj.response.is_available_voiceCall = data[0].is_available_voiceCall;
				        globalResObj.response.is_available_textChat = data[0].is_available_textChat;
				        globalResObj.response.is_available_videoCall = data[0].is_available_videoCall;
				        globalResObj.response.thumbnail = data[0].thumbnail;
				       	globalResObj.response.is_favourite = data[0].is_favourite;
                    	globalResObj.response.profile_pic = data[0].profile_pic;
                        res.json(globalResObj);
                    }
                }

            });
	};

            	
            	insertAmbassador(req)
            	.then(returnResponse)
                .catch((e) => {
                res.status(299).json({message: "something wrong happend while processsing request", error: e});
        });
        
}

module.exports = {
	addNewAmbassador:addNewAmbassador,
	updateAmbassador:updateAmbassador,
	getAmbassadorProfile:getAmbassadorProfile,
	ambassadorAvalibility:ambassadorAvalibility
}