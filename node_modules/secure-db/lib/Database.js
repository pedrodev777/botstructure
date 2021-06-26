'use strict';

const fs = require('fs');
const criptjs = require('./Cript.js');
const Errors = require('./Errors')
const util = require('util')

function Get(database){
    ResolveDatabase(database);
    
    var result;
    var securityKey;
    switch (database.type) {
        case 'main':
            result = fs.readFileSync(`./database/${database.name}/main.db`).toString();
            securityKey = fs.readFileSync(`./database/${database.name}/security.db`).toString();
            criptjs.setKey(securityKey);
            if (database.encrypt){
                result = JsonParse(criptjs.decrypt(result)) || JsonParse(result);
            } else {
                result = JsonParse(result) || JsonParse(criptjs.decrypt(result));
            };
            break;
        case 'child':
            result = fs.readFileSync(`./database/${database.name}/${database.child.name}.db`).toString();
            securityKey = fs.readFileSync(`./database/${database.name}/security.db`).toString();
            criptjs.setKey(securityKey);
            if (database.encrypt){
                result = JsonParse(criptjs.decrypt(result)) || JsonParse(result);
            } else {
                result = JsonParse(result) || JsonParse(criptjs.decrypt(result));
            };
            break;
    }
    return result;
}
async function All(database, callback){
    ResolveDatabase(database);
    await fs.readdir(`./database/${database.name}/`, (error, files) => {
        callback(files.filter(file => file.endsWith('.db'))
                .map(file => file.replace('.db', ''))
                .filter(file => file !== 'security' && file !== 'main')
        );
    })
}
function Save(database, data){
    ResolveDatabase(database);
    const oldDatabase = Get(database);
    criptjs.setKey(fs.readFileSync(`./database/${database.name}/security.db`).toString())
    var result = JsonStringify(data);
    switch (database.type) {
        case 'main':
            if (database.encrypt){
                fs.writeFileSync(`./database/${database.name}/main.db`, criptjs.encrypt(result));
            } else {
                fs.writeFileSync(`./database/${database.name}/main.db`, result)
            }
            break;
        case 'child':
            if (database.encrypt){
                fs.writeFileSync(`./database/${database.name}/${database.child.name}.db`, criptjs.encrypt(result));
            } else {
                fs.writeFileSync(`./database/${database.name}/${database.child.name}.db`, result);
            }
            break;
    }
    
}
function ResolveDatabase(database){
    if (!fs.existsSync('./database')){
        fs.mkdirSync('./database');
    };
    if (
        fs.existsSync('./database.db') && 
        fs.existsSync('./security.db')
    ){
        fs.mkdirSync('./database/your-database/')
        fs.renameSync('./database.db', './database/your-database/main.db');
        fs.renameSync('./security.db', './database/your-database/security.db');
    }
    switch (database.type) {
        case 'main':
            if (!fs.existsSync(`./database/${database.name}`)){
                fs.mkdirSync(`./database/${database.name}`)
            };
            if (
                !fs.existsSync(`./database/${database.name}/main.db`) ||
                !fs.existsSync(`./database/${database.name}/security.db`)
            ){
                criptjs.genKey(3000, ["letters", "numbers"], (err, key) => {
                    criptjs.setKey(key);
                    fs.writeFileSync(`./database/${database.name}/security.db`, key);
                    if (database.encrypt){
                        fs.writeFileSync(`./database/${database.name}/main.db`, `${criptjs.encrypt('{}')}`);
                    } else {
                        fs.writeFileSync(`./database/${database.name}/main.db`, '{}');
                    }
                });
            };
            break;
        case 'child':
            if (!fs.existsSync(`./database/${database.name}`)){
                fs.mkdirSync(`./database/${database.name}`)
            };
            if (!fs.existsSync(`./database/${database.name}/${database.child.name}.db`)){
                if (!fs.existsSync(`./database/${database.name}/security.db`)){
                    criptjs.genKey(3000, ["letters", "numbers"], (err, key) => {
                        criptjs.setKey(key);
                        fs.writeFileSync(`./database/${database.name}/security.db`, key);
                    });
                } else {
                    criptjs.setKey(fs.readFileSync(`./database/${database.name}/security.db`).toString())
                }
                if (database.encrypt){
                    fs.writeFileSync(`./database/${database.name}/${database.child.name}.db`, `${criptjs.encrypt('{}')}`);
                } else {
                    fs.writeFileSync(`./database/${database.name}/${database.child.name}.db`, '{}');
                }
            };
            break;
    }
    
}
function JsonParse(data){
    try {
        return JSON.parse(data);
    } catch (error){
        return null;
    }
}
function JsonStringify(data){
    try {
        return JSON.stringify(data);
    } catch (error){
        return '{}';
    }
}

module.exports = { Get, Save, All };