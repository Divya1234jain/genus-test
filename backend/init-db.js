require("dotenv").config();
const { createDB, dropDB } = require("./src/database/database-utils");

const run = async () => {
    if (process.env.DB_DIALECT == "postgres") {
        const config = {
            user: process.env.DB_USER,
            password: process.env.DB_PASS,
            port: process.env.DB_PORT,
            host: process.env.DB_HOST
        };
        await dropDB(config, process.env.DB_NAME);
        console.log("Database drop");
        await createDB(config, process.env.DB_NAME);
        console.log("Database created");
    } else {
        console.log("Please select dialect postgres");
        process.exit(4);
    }
};
run();
