"user strict"

const commonUtil = require('../../../utils/utils');
const databaseUtil = require('../../../utils/database_utils');
const apiUtil = require('../../../utils/api_utils');

const configuration = require('../../../config')();
let URL  = configuration.host;
let port = configuration.port;
const _ = require('underscore');
 //Routes Rendering pages

function seetingScreen(req,res){
    console.log('I am in Screen Page');

    var access_token = req.userData.access_token;
    var globalResObj = {
        "responseCode" : "200",
        "message" : "Links posted sucessfully",
        "response":{
                "about_page": "",
                "terms_and_condition_page": "",
                "faq_page" : "",
                "privacy_page":""

        }
    };

    globalResObj.response.about_page = "http://" + URL + ":" + port + "/mobile/about_oz_page?token="+access_token;
    globalResObj.response.terms_and_condition_page = "http://" + URL + ":" + port + "/mobile/terms_condition_page?token="+access_token;
    globalResObj.response.faq_page = "http://" + URL + ":" + port + "/mobile/faq_page?token="+access_token;
    globalResObj.response.privacy_page = "http://" + URL + ":" + port + "/mobile/privacy_page?token="+access_token;

    res.json(globalResObj);
}

function getPage1(req,res){ 
 var path = req.app.get('current_directory');
 var getVideo = function(obj){

 };
 var link = '107.170.82.21:3000/mobile/getpage1';
 console.log('Host  -  ',URL+port);
 var access_token = req.token;
 
 res.render(path +'/pages/page1' ,  { link: 'http://techslides.com/demos/sample-videos/small.mp4',token:access_token,host:URL,port:port});


}

function getQuessionarePage(req,res){

	let qs1 = "Reasearch on the development of a person in a so-called 'humanistic life outlook' has shown that it is facilitated by:";
	let qs2 = "In the context of group counseling,members that are high in conformity also tend to be high in:";

	let ans1_1 = "formal educational experiances XYZ"
	let ans1_2 = "observational learning experiances"
	let ans1_3 = "deverse interpresonal interaction"
	let ans1_4 = "All of the Above"
	var access_token = req.token;
	
	var path = req.app.get('current_directory');
	res.render(path+'/pages/quessionarepage',{q1:qs1,q2:qs2,chk1_1:ans1_1,chk1_2:ans1_2,chk1_3:ans1_3,chk1_4:ans1_4,token:access_token,host:URL,port:port });
}

function getCongratulationPage(req,res){
	console.log("I am in getCongratulationPage");

			var user_id = req.userData.id;
			console.log('Id',user_id);
			let table = 'ambassedor';
		    var dbObj  = req.app.get('db');
		    let bodyyy = {
		        user_id:user_id
		    };


        var checkUserExist = function (req){
            
    
            let query  = 'SELECT * FROM ambassedor WHERE user_id = :user_id' ;
            return new Promise((resolve,reject)=>{
                    // implement logic
                    databaseUtil.getSingleRecord(dbObj,query,bodyyy,function (err,data){
                    if(err){
                        reject(err);
                    }else{
                        if(_.isEmpty(data)){
                            resolve(req);
                        }else{
                                    console.log('ALready exist');
					 let qs1 = "Reasearch on the development of a person in a so-called 'humanistic life outlook' has shown that it is facilitated by:";
					 let qs2 = "In the context of group counseling,members that are high in conformity also tend to be high in:";

					 let ans1_1 = "formal educational experiances XYZ"
					 let ans1_2 = "observational learning experiances"
					 let ans1_3 = "deverse interpresonal interaction"
					 let ans1_4 = "All of the Above"

					 var path = req.app.get('current_directory');
				 	res.render(path+'/pages/verifiedambassador',{q1:qs1,q2:qs2,chk1_1:ans1_1,chk1_2:ans1_2,chk1_3:ans1_3,chk1_4:ans1_4});
                        }
                    }

                });
            });

        };



		    var insertUser = function (obj) {

            return new Promise((resolve,reject)=>{

                databaseUtil.insertSingleRecord(dbObj,table,bodyyy,function (err,result) {
                    if(err){
                        reject(err);
                    }else {
                        if(_.isEmpty(result.info.insertId)){
                            reject(new Error({responseCode:202,message:"An error occured during insertion",response:{}}))
                        }else{
                            obj.insertedRecordId = result.info.insertId;
                            
                            resolve(obj);
                        }

                    }
                });


            });


    };

   		 var verifyAmbassador = function(obj){
        			  return new Promise ((resolve,reject)=>{
        			  		console.log('I want to verify ambassedor');
                let query = 'UPDATE users SET isverified = :isverified  WHERE id = :user_id';

        let dataobj = {isverified: 1 ,  user_id : user_id};
        databaseUtil.updateMultiRecord(dbObj,query,dataobj,function (err,data){
            if(err){
            	console.log(err);
                reject(err);
            }else{
            	console.log(data)
                
                resolve(data);
            }
        });
    });
        		}

    var openPage = function(obj){
    	 return new Promise((resolve,reject)=>{

               
		 let qs1 = "Reasearch on the development of a person in a so-called 'humanistic life outlook' has shown that it is facilitated by:";
		 let qs2 = "In the context of group counseling,members that are high in conformity also tend to be high in:";

		 let ans1_1 = "formal educational experiances XYZ"
		 let ans1_2 = "observational learning experiances"
		 let ans1_3 = "deverse interpresonal interaction"
		 let ans1_4 = "All of the Above"

		 var path = req.app.get('current_directory');
	 	res.render(path+'/pages/verifiedambassador',{q1:qs1,q2:qs2,chk1_1:ans1_1,chk1_2:ans1_2,chk1_3:ans1_3,chk1_4:ans1_4});


            });
    }
    	checkUserExist(req)
    	.then(insertUser)
    	.then(verifyAmbassador)
            	.then(openPage)
                .catch((e) => {
                res.status(299).json({message: "something wrong happend while processsing request", error: e});
        });

}


function AboutOZPage(req,res){
    console.log("I am in About Oz Page")

   var dbObj = req.app.get('db');
    var retriveData = function(req){
       
        var dataobj = {
            section_type : "About"
        }

        let query = "Select *from sections where section_type = :section_type";
        return new Promise((resolve,reject)=>{
          
            databaseUtil.getSingleRecord(dbObj,query,dataobj,function(err,data){
                if(err){
                   
                    reject(err);
                }else{
                    
                    let title = data[0].title;
                    let description1 = data[0].description;
                   
    
                    var path = req.app.get('current_directory');
                    res.render(path+'/pages/about_oz',{title:title,description1:description1});
                    resolve(data);  
                }
            })
        });
    };
    retriveData(req).catch((e)=>{});
}

function privacy_Policy(req,res){
    console.log("I am in About privacy_Policy Page")

   var dbObj = req.app.get('db');
    var retriveData = function(req){
       
        var dataobj = {
            section_type : "PrivacyPolicy"
        }

        let query = "Select *from sections where section_type = :section_type";
        return new Promise((resolve,reject)=>{
          
            databaseUtil.getSingleRecord(dbObj,query,dataobj,function(err,data){
                if(err){
                   console.log("hello111");
                    reject(err);
                }else{
                    console.log("hello");
                    let title = data[0].title;
                    let description1 = data[0].description;
                    console.log(title,description1)
    
                    var path = req.app.get('current_directory');
                    res.render(path+'/pages/privacy_page',{title:title,description1:description1});
                    resolve(data);  
                }
            })
        });
    };
    retriveData(req).catch((e)=>{});
}

function termsAndCondition(req,res){
    console.log('I am in termsAndCondition page')

    var dbObj = req.app.get('db');
    var retriveData = function(req){
   
        var dataobj = {
            section_type : "TermsAndConditions"
        }

        let query = "Select *from sections where section_type = :section_type";
        return new Promise((resolve,reject)=>{
          
            databaseUtil.getSingleRecord(dbObj,query,dataobj,function(err,data){
                if(err){
                    
                    reject(err);
                }else{
                    
                    let title = data[0].title;
                    let description1 = data[0].description;
                 
    
                    var path = req.app.get('current_directory');
                    res.render(path+'/pages/terms_and_condition_page',{title:title,description1:description1});
                    resolve(data);  
                }
            })
        });
    };
    retriveData(req).catch((e)=>{});
}

function faq(req,res){
    console.log('I am in Faq')

        var title = "Frequently Ask Questions"
        var size = 2;
        var arr = [['Consectetur adipiscing elit?','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam at porttitor sem.  Aliquam erat volutpat. Donec placerat nisl magna, et faucibus arcu condimentum sed.'],['Consectetur adipiscing elit?','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam at porttitor sem.  Aliquam erat volutpat. Donec placerat nisl magna, et faucibus arcu condimentum sed.']];

         var path = req.app.get('current_directory');
         res.render(path+'/pages/faq_page',{title:title,size:size,arr:arr});

}
// Routes sending pages Link

function getPage1link(req,res){

	console.log("Page1 link");
	var path = req.app.get('absolutepaths');
	console.log("paths",path);
  let globalResObj = {
        responseCode: "",
        message : "",
        response : {
           "link": path+"/mobile/getpage1"
        }

    }	
    res.json(globalResObj);
}

function getQuessionarePageLink(req,res){
 console.log("Page1 link");
 var path = req.app.get('absolutepaths');
 console.log("paths",path);
  let globalResObj = {

        responseCode: "",
        message : "",
        response : {
           "link": path+"/mobile/quessionarepage"
        }

    }	

    

    res.json(globalResObj);
}
function getCongratulationPageLink(req,res){
	console.log("I am in getCongratulationPageLink");
	var path  = req.app.get('absolutepaths');
	let globalResObj = {
		responseCode: "",
		message: "",
		response: {
			"link":path + "/mobile/getcongratulationpage"
		}
	}
	 res.json(globalResObj);
}

module.exports = {

	getPage1: getPage1,
	getQuessionarePage: getQuessionarePage,
	getCongratulationPage:getCongratulationPage,
	getPage1link:getPage1link,
	getQuessionarePageLink:getQuessionarePageLink,
	getCongratulationPageLink:getCongratulationPageLink,
    AboutOZPage:AboutOZPage,
    termsAndCondition:termsAndCondition,
    faq:faq,
    seetingScreen:seetingScreen,
    privacy_Policy:privacy_Policy
	
}
