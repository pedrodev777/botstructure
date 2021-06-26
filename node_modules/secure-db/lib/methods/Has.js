
'use strict';

const Database = require('../Database');
const lodash = {
    set: require("lodash/set"),
    get: require("lodash/get")
}

function Has(id, options, name){
    const database = Database.Get(name);
    if (typeof lodash.get(database, id, undefined) != "undefined") return true;
    return false;
};
module.exports = Has;