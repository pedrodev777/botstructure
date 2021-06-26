'use strict';

const Database = require('../Database');
const lodash = {
    set: require("lodash/set"),
    get: require("lodash/get")
}

function SetBigInt(id, data, options, name){
    var database = Database.Get(name);
    if (/string|bigint/.test(typeof data)) return;
    
     
    if (data < 1e+20) return console.log(Error(`The minimum limit for setting a number using bigint is 10000000000000000000.\nTo set smaller numbers use the function [db].set(...).`));
    database = lodash.set(database, id, BigInt(data.toLocaleString().replace(/[,.]/g,"")).toString());
    Database.Save(name, database);
    return BigInt(data.toLocaleString().replace(/[,.]/g,"")).toString()
}
module.exports = SetBigInt