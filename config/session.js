

const session = require('express-session');
const mongoDBStore = require('connect-mongodb-session');
function createSessionStore() {
    const MongoDBStore = mongoDBStore(session);
    const store = new MongoDBStore({
        uri: process.env.MONGO_URI,
        databaseName: 'node-complete',
        collection: 'sessions'
    });
    return store;
}
function createSessionConfig(){
    return{
        secret:'super-secret',
        resave:'false',
        saveUninitialized:false,
        store: createSessionStore(),
        cookie:{
            maxAge: 1000 * 60 * 60 * 24
        }
    }
}
module.exports = createSessionConfig;