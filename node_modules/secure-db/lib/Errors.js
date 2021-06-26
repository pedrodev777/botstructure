module.exports = {
    argumentsAreMissing: function(method){
        return new SyntaxError(`Failed to execute the '${method}' function: missing arguments.`)
    },
    identifierMustBeString: function(method){
        return new TypeError(`Failed to execute the '${method}' function: The first argument cannot be different from a string.`);
    },
    dataCannotBeFunction: function(method){
        return new TypeError(`Failed to execute the '${method}' function: The second argument cannot be different from a string.`)
    },
    dataMustBeFunction: function(method){
        return new TypeError(`Failed to execute the '${method}' function: The second argument cannot be different from a function.`)
    },
    optionsMustBeObject: function(method){
        return new TypeError(`Failed to execute the '${method}' function: The options need to be object.`)
    },
    couldNotReadTheDatabaseFile: function(){
        return new Error(`There was an error reading the file "[...].db".  Probably it has been modified or the file "security.db" has another security key.  To resolve this error, delete the files "main.db", "security.db" and run the code again, unfortunately your saved data will be lost.`)
    }
}