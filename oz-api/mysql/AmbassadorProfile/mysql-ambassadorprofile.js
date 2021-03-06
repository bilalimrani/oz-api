const databaseUtil = require('../../../utils/database_utils');
const apiUtil = require('../../../utils/api_utils');
const commonUtil = require('../../../utils/utils');
const configration = require('../../../config')();
const mysql = require('../mysql-client');
var multer = require('multer');
var thumb = require('node-thumbnail').thumb;
console.log("mysql-AmbassadorProfile file")
let path = "./bin/upload";
let thumbPath = "./bin/thumbnail";

var AmbassadorProfile = function(){
	return{
		getImage : function(req,res){
			let img_path = null; 
			console.log("I am in getImage function of AmbassadorProfile")
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
					var ext = file.originalname
					callback(null, true)
				}
			}).single('filename');
			upload(req, res, function(err) {
				if(req.file){
					img_path = req.file.path;
					thumb({
							  source: img_path, // could be a filename: dest/path/image.jpg 
							  destination: thumbPath,
							  concurrency: 1
						}, 
						function(files, err, stdout, stderr) {
						});
				}
				else
				{
				console.log("Ok problem solved");
				}
					console.log("Multer Data")
					resolve(img_path);
				})
			});
		},
		updateProfile : function(req,img_paths,user_id){
			let img_path = img_paths
			console.log("I am In Update profile function")
				let full_thumb_path = '';
				if(img_path == null){
					img_path = '';
				}
				else{
					let image_path = img_path.split('/');
					let thumbs_img = image_path[image_path.length-1];
			 		let splits_thumb = thumbs_img.split('.');
			 		full_thumb_path = splits_thumb[0] + '_thumb.' + splits_thumb[1];
					img_path = 'http://' + configration.path + '/upload/'+image_path[image_path.length-1];
					full_thumb_path = 'http://'+configration.path+ "/thumbnail/" + full_thumb_path
				}	
				console.log('iiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii',img_path)
				let dataobj = {			
					name:req.body.name, 
		            age:req.body.age ,
		            gender:req.body.gender , 
		            service_member:req.body.service_member,
		            lat: req.body.lat,
		            lng: req.body.lng,
					service: req.body.service,
					veteran: req.body.veteran,
					mos: req.body.mos,
					component:req.body.component,
					city : req.body.city,
					state : req.body.state,
					zip_code : req.body.zip_code, 
		            user_id:user_id,
		            profile_pic: img_path,
					thumbnail : full_thumb_path,
					date_of_birth : req.body.date_of_birth,
					contact : req.body.contact,
					specialties : req.body.specialties


		        };
		        //console.log('My dataobj',dataobj)

		       	let query = 'UPDATE ambassedor SET name =:name, age =:age,date_of_birth=:date_of_birth,specialties=:specialties,contact=:contact,city=:city,state=:state,zip_code=:zip_code, gender =:gender ,service_member=:service_member,service=:service,veteran=:veteran,mos=:mos,component=:component,profile_pic=:profile_pic,thumbnail=:thumbnail,lat=:lat,lng=:lng WHERE user_id =:user_id';
		       	
		       	return new Promise((resolve,reject)=>{
		       		databaseUtil.updateMultiRecord(mysql,query,dataobj,(err,data)=>{
		       			if(err){
		       				console.log(err)
		       				reject(err);
		       			}
		       			else{
		       				console.log(data)
		       				resolve(data);
		       			}
		       		});
		       	}); 
		},
		returnResponse : function(params){
			let dataobj = {
				user_id : params
			}
			let query = "select *from ambassedor WHERE user_id=:user_id";
			return new Promise((resolve,reject)=>{
				databaseUtil.getSingleRecord(mysql,query,dataobj,(err,data)=>{
					if(err){
						reject(err);
					}
					else{
						resolve(data);
					}
				});
			});
		}
	}
}

module.exports = new AmbassadorProfile;