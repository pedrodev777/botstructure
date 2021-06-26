# SecureDB - Local Database

SecureDB is a fast, encrypted, simple and easy to use database package for simple projects with local JSON storage.

![PACKAGE VESION](https://img.shields.io/npm/v/secure-db?color=red&label=SecureDB&style=for-the-badge) ![PACKAGE DOWNLOADS](https://img.shields.io/npm/dw/secure-db?color=red&label=Download&style=for-the-badge) ![PACKAGE SIZE](https://img.shields.io/snyk/vulnerabilities/npm/secure-db?color=red&style=for-the-badge) ![PACKAGE LICENSE](https://img.shields.io/npm/l/secure-db?color=red&style=for-the-badge)

## Installation

This is a [Node.js](https://nodejs.org/en/) module available through the
[npm registry](https://www.npmjs.com/).

Before installing, [download and install Node.js](https://nodejs.org/en/download/).
Node.js 0.10 or higher is required.

Installation is done using the
[`npm install` command](https://docs.npmjs.com/getting-started/installing-npm-packages-locally):
```
$ npm install secure-db
```

```javascript
const { Database } = require('secure-db');
const db = new Database('my-database');
// ES6
import { Database } from 'secure-db';
const db = new Database('my-database');
```
## Features
 \- 1.4.0^
+ ##### Safe Data
> This package is 100% secure because it has a key encryption feature [cript.js](//npmjs.com/package/cript.js). The data is stored in JSON format so its handling becomes faster and more perfomatic. There is no need to run a server to use the database because its storage is saved locally.

+ ##### Separate Databases
> It is possible to create several databases separated by folders and files, all with individual security. All databases created can have a [`Child Database`](https://github.com/DablioZe/SecureDB/tree/main/docs/Child.md) which is a space within a database separated by file and can be accessed individually.

+ ##### Individual Security Keys
> All saved data is initially stored with encryption. Each database has its security key that is used to encrypt the data, if it is changed, the saved data is lost forever or until the key is renconstructed correctly.

+ ##### Disable Encryption
> It is possible to disable the encryption of the databases `new Database('your-database', false)`. ___If you disable encryption, your data will lose security and it will be possible to change your data through the file itself___.

#### Need Help? Check out: 
* **Documentation: [SecureDB/docs](https://github.com/DablioZe/SecureDB/tree/main/docs)**
* **Support: [SecureDB/Discord](https://discord.gg/WgsMRWETMz)**
* **OpenSource: [SecureDB/OS](https://github.com/DablioZe/SecureDB/tree/main/lib)**

## Example

```javascript
const db = require('secure-db');

// Saves data to the database
db.set('Felipe', { age: 30 }); // Felipe: { age: 30 }

// Pushing an element to an array
db.push('Felipe.books', 'Harry Potter'); // Felipe: { books: ['Harry Potter'] }

// Add in a number
db.sum('Felipe.age', 3); // Felipe: { age: 33 }

// Subtract a number
db.sub('Felipe.age', 2); // Felipe: { age: 31 }

// Returns saved data
db.get('Felipe'); // Felipe: { age: 31, books: ['Harry Potter'] }
db.get('Felipe.books'); // Felipe: { books: ['Harry Potter'] }
```
## Dependencies
* fs - [built-in](https://www.npmjs.com/package/fs)
* cript.js - [1.1.3](https://www.npmjs.com/package/cript.js)
* lodash - [4.17.21](https://www.npmjs.com/package/lodash) 
