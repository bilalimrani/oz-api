const databaseUtil = require('../../../utils/database_utils');
const apiUtil = require('../../../utils/api_utils');
const commonUtil = require('../../../utils/utils');
const configration = require('../../../config')();
const mysql = require('../mysql-client');

var ambassadorPage = function(data){
	return {
		ambassadorvideo : function(data){
			let query = "select file, title from videos"

			return new Promise((resolve, reject)=>{
				databaseUtil.getSingleRecord(mysql, query, (err, res)=>{
					if(err){
						reject(err)
					}
					else{
						resolve(res[0])
					}
				})
			})
		},

		questionarepage : function(){
			let query = 'select questions.description, questions.id, answer_options.question_id, answer_options.option, answer_options.is_correct from questions left join answer_options on questions.id = answer_options.question_id'


			return new Promise((resolve, reject)=>{
				databaseUtil.getSingleRecord(mysql, query, (err, res)=>{
					if (err) {
						reject(err)
					}
					else{
						let arr = []
						let questions = []
						res.forEach((value)=>{

							let allQuestion = value.description;
							questions.push(allQuestion)
							
						})
						resolve(questions)
					}
				})
			})
		}
	}
}


module.exports = new ambassadorPage