const JSONdb = require('@matteo-ricciotti/json-db');

const Data = new JSONdb.Database('users');

console.log(Data);

Data.add('users', { _id: 'user', name: 'ok' });
