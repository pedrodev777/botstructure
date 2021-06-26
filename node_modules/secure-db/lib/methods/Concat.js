
'use strict';

const Database = require('../Database');
const lodash = {
    set: require("lodash/set"),
    get: require("lodash/get")
}

function Concat(id, data, options, name){
    var database = Database.Get(name);
    const _data = lodash.get(database, id, null);
    if (typeof _data === "null"){
        database = lodash.set(database, id, data.toString());
    } else {
        database = lodash.set(database, id, _data.toString() + data.toString());
    }
    Database.Save(name, database);
    return lodash.get(database, id, data);
}
module.exports = Concat