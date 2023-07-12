/* eslint-disable global-require */
require("dotenv").config();
const numCPUs = require("node:os").availableParallelism();
const cluster = require("node:cluster");
const { runMigrationsAndSeeders } = require("./src/database/services/run-migration-seeders");

// Set Current Working Direcory 
if (!process.env.CURRENT_WORKING_DIRECTORY) {
    process.env.CURRENT_WORKING_DIRECTORY = process.cwd();
}

(async () => {
    if (cluster.isPrimary) {
        // Fork workers.
        // Execute migrations and seeders for database
        await runMigrationsAndSeeders();
        for (let i = 0; i < numCPUs; i++) {
            cluster.fork();
        }
      
        cluster.on("exit", (worker, code, signal) => {
            console.log(`worker ${worker.process.pid} died`);
        });
    } else {
        // Workers can share any TCP connection
        // In this case it is an HTTP server
        const { startServer } = require("./src/server");
        // Start the Server
        startServer();
    }
})();