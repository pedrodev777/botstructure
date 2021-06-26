'use strict';

const Database = require('../Database');
const lodash = {
    set: require("lodash/set"),
    get: require("lodash/get")
}

function Push(id, data, options, name){
    var database = Database.Get(name);
    const _data = lodash.get(database, id, []);
    if (_data.constructor === Array){
        _data.push(data);
        database = lodash.set(database, id, _data);
    }
    Database.Save(name, database);
    return lodash.get(database, id, data);
}
module.exports = Push