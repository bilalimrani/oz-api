"user strict"

const commonUtil = require('../../../utils/utils');
const databaseUtil = require('../../../utils/database_utils');
const apiUtil = require('../../../utils/api_utils');

function settingAmbassador(req,res){
	console.log("I am in about Oz");
	 let globalResObj = {
        responseCode: "",
        message : "",
        response : {
            "about" : "",
            "tour" : "",
            "privacy&policy" : "",
            "terms&Conditions" : "",
            "frequentlyAskQuestions":""
           
        }
    }

    res.json(globalResObj);


}


module.exports = {
	settingAmbassador: settingAmbassador,
	
}