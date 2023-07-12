const { Client } = require("pg");
const logger = require("../logger/logger");

const dropDB = async (dbConfig, dbName) => dbQuery(dbConfig, dbName, "DROP");
const createDB = async (dbConfig, dbName) => dbQuery(dbConfig, dbName, "CREATE");

const executeQuery = (clientIns, sqlQuery) => new Promise((resolve, reject) => {
    clientIns.query(sqlQuery, (pgErr) => {
        clientIns.end();
        if (pgErr) {
            logger.error(pgErr);
            resolve(false);
        } else {
            resolve(true);
        }
    });
});

const dbQuery = async (dbConfig, dbName, type) => {
    const clientIns = new Client({
        user: dbConfig.user,
        password: dbConfig.password,
        port: dbConfig.port,
        host: dbConfig.host
    });
    await clientIns.connect();
    // TODO : Use parameterized query here to prevent injection
    let query = "";
    switch (type) {
        case "CREATE":
            query = `CREATE DATABASE "${dbName}"`;
            break;
        case "DROP":
            await clientIns.query("SELECT pg_terminate_backend(pid) FROM pg_stat_activity WHERE datname = $1 ", [dbName]);
            query = `DROP DATABASE IF EXISTS "${dbName}"`;
            break;
        case "TERMINATE":
            await clientIns.query("SELECT pg_terminate_backend(pid) FROM pg_stat_activity WHERE datname = $1 ", [dbName]);
            break;
        case "RENAME":
            const newDbName = dbConfig.newDbName || `backup_${dbName}_${new Date().getTime()}`;
            query = `ALTER DATABASE "${dbName}" RENAME TO "${newDbName}"`;
            break;
        default:
            break;
    }
    return executeQuery(clientIns, query);
};

module.exports = {
    createDB,
    dropDB
};