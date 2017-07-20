const databaseUtil = require('../../../utils/database_utils');
const apiUtil = require('../../../utils/api_utils');
const commonUtil = require('../../../utils/utils');
const configration = require('../../../config')();
const mysql = require('../mysql-client');
const _ = require('lodash')
console.log("mysql-filters file")

var filters = function(){
	return{
		getFilters : function(){
			console.log('I am in getFilters function of mysql-filters')
			let query = 'select filter_types.id,filter_types.name as filters_name,filters.name FROM filters LEFT JOIN filter_types ON filter_types.id = filters.filter_type_id ORDER BY filter_types.id'
			let dataObj = {}
			return new Promise((resolve,reject)=>{
				databaseUtil.getSingleRecord(mysql,query,dataObj,(err,data)=>{
					if(err){
						reject(err);
					}
					else{
						console.log(data);
						var size = data.info.numRows;
						var count = 0;
						var val = 0;
						var multiArray = [];
						var nameArray = [];
						let Filters = {}
						let Values = []
						
						let Names = "";
						Object.keys(data).forEach((key)=>{
								let filters_name = data[key]['filters_name'];
								
								let name = data[key]['name']
								//eachValue.push(name)
								if(filters_name && name){
									console.log(' filters_name = ', filters_name, ' and name = ', name );
									//Names += name;
									//Values[filters_name] = filters_name;
									if(Values[filters_name])
										Values[filters_name] = Values[filters_name] + name +'-*-'
									else
										Values[filters_name] = name + '-*-'
										Filters[filters_name] = Values
								}
								
							
						})

						console.log('Filterss ... = ',Filters)    

						Object.keys(Filters).forEach((filter)=>{
							//console.log('values = ', Values)
							//console.log('filter Data = ', filter, ' Values at fitler location ', Values[filter].split('-*-'))
								Filters[filter] = Values[filter].split('-*-');
								console.log('Length',Filters[filter][Filters[filter].length-2],'---------',Filters[filter].length);
								if(Filters[filter][Filters[filter].length-1] === ''){
									let x = Filters[filter].length - 1;
									Filters[filter].splice(x , 1);
								} 
								
						})

							console.log('Final Filters',Filters)
							resolve(Filters)

						/*while(count < size){
							val = data[count].id;
							nameArray.push(data[val].filters_name)
							var dataArray = [];
							while(count < size && val === data[count].id){
								dataArray.push(data[count].name);
								count++;
							}
							multiArray.push(dataArray)
						}
						console.log('size',nameArray.length)
						var object = {}
						for(var i = 0 ; i < nameArray.length ; i++){
							//object[nameArray] = multiArray[i]
						}
						console.log(object)*/
						//resolve(nameArray,multiArray);
					}
				});
			});
		}
	}
}
module.exports = new filters;