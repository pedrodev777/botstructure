
'use strict';

const methods = require('./methods/Methods');
const Errors = require('./Errors')

class Database {
    constructor(name = 'your-database', encrypt = true){
        if (name.constructor !== String) return;
        if (typeof encrypt !== 'boolean') encrypt = true;
        this.name = ResolveName(name);
        this.encrypt = encrypt;
        this.type = 'main';
        this.child = {};
        this.version = require('../package.json').version;
        this.Database = Database;
        
        this.add = function(identifier, data, options){
            if (typeof identifier === 'undefined' || typeof data === 'undefined') throw Errors.argumentsAreMissing('add')
            if (identifier.constructor !== String) throw Errors.identifierMustBeString('add');
            if (data.constructor === Function) throw Errors.dataCannotBeFunction('add');
            if (options && options.constructor !== Object) throw Errors.optionsMustBeObject('add');
            return methods.add(identifier, data, options, this);
        }
        this.all = function(options){
           if (options && options.constructor !== Object) throw Errors.optionsMustBeObject("all");
           return methods.all(options, this);
        }
        this.concat = function(identifier, data, options){
            if (typeof identifier === 'undefined' || typeof data === 'undefined') throw Errors.argumentsAreMissing('concat')
            if (identifier.constructor !== String) throw Errors.identifierMustBeString('concat');
            if (data.constructor === Function) throw Errors.dataCannotBeFunction('concat');
            if (options && options.constructor !== Object) throw Errors.optionsMustBeObject('concat');
            return methods.concat(identifier, data, options, this);
        }
        this.delete = function(identifier, options){
            if (!identifier) throw Errors.argumentsAreMissing('deletes')
            if (identifier.constructor !== String && identifier.constructor !== Array) throw Errors.identifierMustBeString('delete');
            if (options && options.constructor !== Object) throw Errors.optionsMustBeObject('delete');
            return methods.delete(identifier, options, this);
        }
        this.get = function(identifier, options){
            if (!identifier) throw Errors.argumentsAreMissing('get')
            if (identifier.constructor !== String) throw Errors.identifierMustBeString('get');
            if (options && options.constructor !== Object) throw Errors.optionsMustBeObject('get');
            return methods.get(identifier, options, this);
        }
        this.has = function(identifier, options){
            if (!identifier) throw Errors.argumentsAreMissing('has')
            if (identifier.constructor !== String) throw Errors.identifierMustBeString('has');
            if (options && options.constructor !== Object) throw Errors.optionsMustBeObject('has');
            return methods.has(identifier, options, this);
        }
        this.push = function(identifier, data, options){
            if (typeof identifier === 'undefined' || typeof data === 'undefined') throw Errors.argumentsAreMissing('push')
            if (identifier.constructor !== String) throw Errors.identifierMustBeString('push');
            if (data.constructor === Function) throw Errors.dataCannotBeFunction('push');
            if (options && options.constructor !== Object) throw Errors.optionsMustBeObject('push');
            return methods.push(identifier, data, options, this);
        }
        this.reset = function(options){
           if (options && options.constructor !== Object) throw Errors.optionsMustBeObject('reset');
           return methods.reset(options, this);
        }
        this.set = function(identifier, data, options){
            if (typeof identifier === 'undefined' || typeof data === 'undefined') throw Errors.argumentsAreMissing('set')
            if (identifier.constructor !== String) throw Errors.identifierMustBeString('set');
            if (data.constructor === Function) throw Errors.dataCannotBeFunction('set');
            if (options && options.constructor !== Object) throw Errors.optionsMustBeObject('set');
            return methods.set(identifier, data, options, this);
        }
        this.setBigInt = function(identifier, data, options){
            if (typeof identifier === 'undefined' || typeof data === 'undefined') throw Errors.argumentsAreMissing('setBigInt')
            if (identifier.constructor !== String) throw Errors.identifierMustBeString('setBigInt');
            if (data.constructor === Function) throw Errors.dataCannotBeFunction('setBigInt');
            if (options && options.constructor !== Object) throw Errors.optionsMustBeObject('setBigInt');
            return methods.setBigInt(identifier, data, options, this);
        }
        this.splice = function(identifier, data, options){
            if (typeof identifier === 'undefined' || typeof data === 'undefined') throw Errors.argumentsAreMissing('splice')
            if (identifier.constructor !== String) throw Errors.identifierMustBeString('splice');
            if (data.constructor === Function) throw Errors.dataCannotBeFunction('splice');
            if (options && options.constructor !== Object) throw Errors.optionsMustBeObject('splice');
            return methods.splice(identifier, data, options, this);
        }
        this.sub = function(identifier, data, options){
            if (typeof identifier === 'undefined' || typeof data === 'undefined') throw Errors.argumentsAreMissing('sub')
            if (identifier.constructor !== String) throw Errors.identifierMustBeString('sub');
            if (data.constructor === Function) throw Errors.dataCannotBeFunction('sub');
            if (options && options.constructor !== Object) throw Errors.optionsMustBeObject('sub');
            return methods.sub(identifier, data, options, this);
        }
        this.subtract = this.sub;
        this.sum = function(identifier, data, options){
            if (typeof identifier === 'undefined' || typeof data === 'undefined') throw Errors.argumentsAreMissing('sum')
            if (identifier.constructor !== String) throw Errors.identifierMustBeString('sum');
            if (data.constructor === Function) throw Errors.dataCannotBeFunction('sum');
            if (options && options.constructor !== Object) throw Errors.optionsMustBeObject('sum');
            return methods.sum(identifier, data, options, this);
        }
        
        this.Child = class Child extends Database {
            constructor(name, childName, encrypt){
                if (typeof name === 'undefined' || typeof childName === 'undefined') throw Errors.argumentsAreMissing('Child')
                if (name.constructor !== String) throw Errors.identifierMustBeString('Child');
                if (childName.constructor !== String) throw Errors.dataCannotBeFunction('Child');
                super(ResolveName(name), encrypt);
                this.type = 'child';
                this.child = {
                    name: ResolveName(childName)
                }
                delete this.Child
            }
        }
        this.getChilds = function(name, callback){
            if (typeof name === 'undefined' || typeof callback === 'undefined') throw Errors.argumentsAreMissing('getChilds');
            if (name.constructor !== String) throw Errors.identifierMustBeString('getChilds');
            if (callback.constructor !== Function) throw Errors.dataMustBeFunction('getChilds');
            return methods.getChilds(new Database(ResolveName(name)), callback);
        }
    }
}

function ResolveName(name){
    return name.replace(/[\\\/:*?"<>|]/gi, '')
               .replace(/security/gi, 'scty')
}

module.exports = new Database('your-database')
