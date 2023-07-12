const http = require("http");
const https = require("https");
const fs = require("fs");
const path = require("path");
const { generateSelfSignedSSL, getSSLConfig } = require("./ssl/ssl.service");
const DataBaseConnection = require("./database/database-connection.service");

const { HTTPS_PORT, HTTP_PORT } = process.env;
global.rootDir = path.resolve();
global.upploadFolder = path.resolve("public");
global.formSubissionsUploadFolderName = "form-submissions-uploads";

const startServer = async () => {

    // Create PostgreSQL database connection
    await DataBaseConnection.createDatabaseConnection();
    // eslint-disable-next-line global-require
    const app = require("./app");
    if (process.env.DISABLED_HTTPS_SERVER !== "true") {
        if (!fs.existsSync(path.join(__dirname, "ssl/keys/localhost.key"))) {
            await generateSelfSignedSSL();
        }
        const sslConfig = getSSLConfig();
        const secureServer = createHttpsServer(app, sslConfig);
        secureServer.listen(HTTPS_PORT, function () {
            console.log(`Secure Server is listening on port ${HTTPS_PORT}`);
        });
        // Redirect from http port 80 to https
        createHttpServer();
    } else {
        http.createServer(app).listen(HTTP_PORT, function () {
            console.log(`Server is listening on port ${HTTP_PORT}`);
        });
    }
};

const createHttpServer = () => http.createServer(function (req, res) {
    const redirectURL = `https://${req.headers.host}${req.url}`.replace(HTTP_PORT, HTTPS_PORT);
    res.writeHead(301, { Location: redirectURL });
    res.end();
}).listen(HTTP_PORT);

const createHttpsServer = (_app, sslConfig) => {
    const options = {
        key: fs.readFileSync(path.join(sslConfig.keyPath)),
        cert: fs.readFileSync(path.join(sslConfig.certPath))
    };
    return https.createServer(options, _app);
};

module.exports = {
    startServer
};
