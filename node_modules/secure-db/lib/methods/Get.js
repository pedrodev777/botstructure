
'use strict';

const Database = require('../Database');
const lodash = {
    set: require("lodash/set"),
    get: require("lodash/get")
}

function Get(id, options, name){
    const database = Database.Get(name);
    return lodash.get(database, id, null);
}
module.exports = Get;