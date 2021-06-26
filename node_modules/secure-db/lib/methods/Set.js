'use strict';

const Database = require('../Database');
const lodash = {
    set: require("lodash/set"),
    get: require("lodash/get")
}

function Set(id, data, options, name){
    var database = Database.Get(name);
    database = lodash.set(database, id, data);
    Database.Save(name, database);
    return data;
}
module.exports = Set