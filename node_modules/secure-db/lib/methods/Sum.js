'use strict';

const Database = require('../Database');
const lodash = {
    set: require("lodash/set"),
    get: require("lodash/get")
}

function Sum(id, data, options, name){
    var database = Database.Get(name);
    const _data = lodash.get(database, id, null);
    
    if (_data){
        if (!isNaN(data) && !isNaN(_data)){
            if (data < 1e+20 && _data < 1e+20){
                database = lodash.set(database, id, Number(_data) + Number(data));
            } else {
                database = lodash.set(database, id, (BigInt(_data.toLocaleString().replace(/[,.]/g,"")) + BigInt(data.toLocaleString().replace(/[,.]/g,""))).toLocaleString().replace(/[,.]/g,""))
            }
        } else {
            database = lodash.set(database, id, _data + data);
        }
    } else {
        database = lodash.set(database, id, data);
    }
    Database.Save(name, database);
    return lodash.get(database, id, data);
}
module.exports = Sum