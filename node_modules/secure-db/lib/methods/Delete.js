
'use strict';

const Database = require('../Database');
const lodash = {
    set: require("lodash/set"),
    get: require("lodash/get")
}

function Delete(id, options, name){
    const database = Database.Get(name);
    switch (id.constructor) {
        case String:
            delete database[id]
            break;
        case Array:
            id.forEach(itemId => {
                if (itemId.constructor !== String) return;
                delete database[itemId];
            })
            break;
    }
    Database.Save(name, database)
    return null
}

module.exports = Delete;