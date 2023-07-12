require("dotenv").config();

const config = {
    [process.env.NODE_ENV]: {
        [process.env.NODE_ENV]: {
            username: process.env.DB_USER,
            password: process.env.DB_PASS,
            database: process.env.DB_NAME,
            host: process.env.DB_HOST,
            dialect: process.env.DB_DIALECT,
            seederStorage: "sequelize",
            migrationStorage: "sequelize",
            seederStorageTableName: "system_seeders",
            migrationStorageTableName: "system_migrations"
            // logging: console.log // Uncomment this if you want to see the queries executing while after running migration command.
        }
    }
};

module.exports = config;
