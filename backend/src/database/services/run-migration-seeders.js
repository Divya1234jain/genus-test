/* eslint-disable global-require */
/* eslint-disable import/no-dynamic-require */

"use strict";

const path = require("path");
const osType = require("os").platform();
const { Umzug, SequelizeStorage } = require("umzug");
const Sequelize = require("sequelize");

const getSequalizeIns = async () => {
    const pool = {
        min: process.env.SEQ_POOL_MAX || 0,
        max: process.env.SEQ_POOL_MAX || 70,
        idle: process.env.SEQ_POOL_IDLE || 10000,
        acquire: process.env.SEQ_POOL_IDLE || 300000
    };

    const sequelize = new Sequelize(
        process.env.DB_NAME,
        process.env.DB_USER,
        process.env.DB_PASS,
        {
            host: process.env.DB_HOST,
            dialect: process.env.DB_DIALECT,
            dialectOptions: {
                ssl: false
            },
            port: process.env.DB_PORT,
            pool: pool,
            logging: false
        }
    );
    await sequelize.authenticate();
    return sequelize;
};

const runMigrationsAndSeeders = async () => {
    try {
        await runMigrations();
        await runSeeders();
    } catch (error) {
        console.log(">genus-wfm | [run-migration-seeders.js] | LINE #40 | error : ", error);
        throw error;
    }
};

const runMigrations = async function () {
    const migratorConfig = await getMigratInstance();
    await migratorConfig.up();
};

const runSeeders = async function () {
    const seederConfig = await getMigratInstance("seeders");
    await seederConfig.up();
};

const getMigratInstance = async function (folderName = "migrations") {
    let time = Date.now();
    const sequelize = await getSequalizeIns();
    const migrator = new Umzug({
        migrations: {
            glob: formatPath(path.resolve(__dirname, `../${folderName}/*.js`)),
            resolve: ({ name, path, context }) => {
                const migration = require(path);
                return {
                    name,
                    up: async () => migration.up(context, Sequelize),
                    down: async () => migration.down(context, Sequelize)
                };
            }
        },
        context: sequelize.getQueryInterface(),
        storage: new SequelizeStorage({ sequelize, modelName: folderName === "migrations" ? "system_migrations" : "system_seeders" })
    });
    migrator.on("migrating", ({ name }) => {
        time = Date.now();
        console.log(`== ${name}: ${folderName === "migrations" ? "migrating" : "seeding"} =======`);
    });
    migrator.on("migrated", ({ name }) => {
        console.log(`== ${name}: ${folderName === "migrations" ? "migrated" : "seeded"} (${(Date.now() - time) / 1000}s) \n`);
    });
    return migrator;
};

function formatPath(pathText) {
    if (pathText && osType === "win32") {
        return pathText.replace(/\\/g, "/");
    }
    return pathText;
}

module.exports = {
    runMigrationsAndSeeders,
    runMigrations,
    runSeeders,
    getSequalizeIns
};
