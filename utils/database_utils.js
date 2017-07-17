/**
 * Created by ghazanfar on 5/15/17.
 */

"use strict"


/**
 * Model class User
 */

function getSingleRecord(db,query,data,callback){
    //db.connect();
    db.query(query,
        data, function(err, rows) {
            if (err){
                callback(err,null);
            }else{
                callback(null,rows);
            }

        });
    //db.end();
}

function getAllRecord(db,query,callback){
    //db.connect();
    db.query(query,
         function(err, rows) {
            if (err){
                callback(err,null);
            }else{
                callback(null,rows);
            }

        });
    //db.end();
}

function insertSingleRecord(db,table,data,callback){
    let keys = Object.keys(data);
    let values  =   Object.keys(data).map(function(k){return data[k]}).join(",");
    var temp = new Array();
    temp = values.split(",");
    let valuessting = '';
    for(var key in temp){
        console.log(temp[key]);
        valuessting+=  "'"+temp[key]+"',";
    }
    let newValueString = valuessting.slice(0, -1);
    var sql = "INSERT INTO "+table+" ("+keys+") VALUES ("+newValueString+")";
    db.query(sql, function (err, result) {
        if(err){
            callback(err,null);
        }else{
            callback(null,result);
        }
    });
}



function updateMultiRecord(db,query,data,callback){

    db.query(query,data ,function (err,result) {
        if(err){
            callback(err,null);
        }else{
            callback(null,result);
        }
    });
}

function deleteRecord(db,query,data,callback){
    db.query(query,data,function(err,result){
        if(err){
            callback(err,null);
        }
        else{
            callback(null,result);
        }
    })
}


module.exports = {
    getSingleRecord : getSingleRecord,
    insertSingleRecord : insertSingleRecord,
    updateMultiRecord : updateMultiRecord,
    getAllRecord : getAllRecord,
    deleteRecord : deleteRecord
};