
'use strict';

const Database = require('../Database')
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

function All(options, name){
    var database = Database.Get(name);
    var new_database = new Array();
    
    const defaults = {
        startsWith: undefined,
        endsWith: undefined,
        type: undefined,
        sort: undefined,
        sortSource: undefined
    }
    options = ResolveOptions(defaults, options);
    
    var ops = false;
    for (let i in options){
        if (options[i]){
            ops = true;
        }
    }
    if (!ops){
        for (let i in database){
            new_database.push({ID: i, data: database[i]});
        }
        return new_database;
    }
    
    
    if (options.startsWith){
        for (let i in database){
            if (i.startsWith(options.startsWith)){
                new_database.push({ID: i, data: database[i]});
            }
        }
    }
    if (options.endsWith){
        for (let i in database){
            if (i.endsWith(options.endsWith)){
                if (!new_database.includes({ID: i, data: database[i]})){
                    new_database.push({ID: i, data: database[i]});
                }
            }
        }
    }
    
    var types = /strings?|objects?|numbers?|booleano?|arrays?/i
    
    if (options.type && types.test(options.type)){
        options.type = options.type.toLowerCase();
        for (let i in database){
            if (options.type === "array"){
                if (database[i].constructor === Array){
                    if (!new_database.includes({ID: i, data: database[i]})){
                        new_database.push({ID: i, data: database[i]});
                    }
                }
            } else if (options.type === "number"){
                if (!isNaN(database[i]) && typeof database[i] !== "boolean"){
                    if (!new_database.includes({ID: i, data: database[i]})){
                        new_database.push({ID: i, data: database[i]});
                    }
                }
            } else {
                if (typeof database[i] === options.type){
                    if (!new_database.includes({ID: i, data: database[i]})){
                        new_database.push({ID: i, data: database[i]});
                    }
                }
            }
        }
    }
    var ops = /a-z|z-a/i;
    if (options.sort && ops.test(options.sort)){
        if (new_database.length == 0){
            for (let i in database){
                new_database.push({ID: i, data: database[i]});
            }
        }
        if (options.sortSource){
            new_database = new_database.sort((a, b) => {
                return lodash.get(a.data, options.sortSource) - lodash.get(b.data, options.sortSource)
            })
        } else {
            new_database = new_database.sort((a, b) => {
                return a.data - b.data
            })
        }
    }
    if (options.sort && ops.test(options.sort) && options.sort === "z-a"){
        var array = [];
        for (let i = new_database.length; i > 0; i--){
            array.push(new_database[i - 1]);
        }
        new_database = array;
    }
    
    return new_database;
}

module.exports = All;