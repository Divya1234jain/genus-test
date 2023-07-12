const EventEmitter = require("events");
const createDbConnection = require("./services/sequlize");

const dbConnections = {};

class DB extends EventEmitter {
    constructor() {
        super();
        this.db = dbConnections.db || {};
    }

    static createDatabaseConnection = async () => {
        if (!Object.keys(dbConnections).length) {
            dbConnections.db = await createDbConnection();
            console.log("*** PostgresSQL connection successfully created ***");
        }
    };

    getDataBaseConnections() {
        return this.db;
    }
}

module.exports = DB;
