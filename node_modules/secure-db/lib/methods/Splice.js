'use strict';

const Database = require('../Database');
const lodash = {
    set: require("lodash/set"),
    get: require("lodash/get")
}

function Splice(id, data, options, name){
    var database = Database.Get(name);
    const _data = lodash.get(database, id, null);
    if (_data.constructor === Array){
        if (_data.indexOf(data) >= 0){
            _data.splice(_data.indexOf(data), 1)
        }
    }
    database = lodash.set(database, id, _data);
    Database.Save(name, database);
    return _data;
}
module.exports = Splice