'use strict';

const Database = require('../Database');
const lodash = {
    set: require("lodash/set"),
    get: require("lodash/get")
}

function ResolveOptions(defaults, options){
        options = options || {};
        for (let i in defaults){
        if (!options[i]){
            options[i] = defaults[i];
        }
    }
    return options;
}


function Reset(options, name){
    const database = Database.Get(name);
    const defaults = {
        keep: []
    }
    options = ResolveOptions(defaults, options);
    const new_database = {};
    
    if (options.keep.constructor === Array){
        options.keep.forEach(ID => {
            for (let i in database){
                if (ID == i){
                    new_database[i] = database[i];
                }
            }
        })
    }
    Database.Save(name, new_database);
    return new_database;
}
module.exports = Reset