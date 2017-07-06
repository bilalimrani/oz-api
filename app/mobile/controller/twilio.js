const commonUtil = require('../../../utils/utils');
const databaseUtil = require('../../../utils/database_utils');
const apiUtil = require('../../../utils/api_utils');

	function voiceCall(req,res){
			conole.log("I am in VOice Call");
	}
	function message(req,res){
		conole.log("I am in Message");
	}

	module.exports = {
		voiceCall: voiceCall,
		message: message
	}