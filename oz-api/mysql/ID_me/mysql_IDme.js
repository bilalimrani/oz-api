const databaseUtil = require('../../../utils/database_utils');
const apiUtil = require('../../../utils/api_utils');
const commonUtil = require('../../../utils/utils');
const configration = require('../../../config')();
const mysql = require('../mysql-client');


var veteranData = function(){
	return {
		updateVeteran : function(data){
			console.log(data)
		}
	}
}

module.exports = veteranData