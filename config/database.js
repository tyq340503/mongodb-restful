const MongoClient = require("mongodb").MongoClient;
const mongoose = require('mongoose');

const option = {
    socketTimeoutMS: 30000,
    keepAlive: true,
    reconnectTries: 30000
};
// mongoose.Promise = global.Promise;

const mongoConfig = {
    serverUrl: "mongodb://localhost:27017/",
    database: "testnodeapi-dev"
};
const URL = 'mongodb://localhost/testnodeapi-dev';
let _connection = undefined;
let _db = undefined;

try {
    _connection =  mongoose.connect(URL, option);
    // _db =  _connection.db(mongoConfig.database);
} catch (error) {
    mongoose.createConnection(URL);
    //throw error;
}

mongoose.connection.once("open", function () {
    console.log('mongo running success');
}).on('error', function (err) {
    throw err;
})

// const getCollectionFn = collection => {
//     let _col = undefined;

//     return async () => {
//         if (!_col) {
//             const db = await _db;
//             _col = await db.collection(collection);
//         }

//         return _col;
//     };
// };

// module.exports = {
//     users: getCollectionFn("users")
// };