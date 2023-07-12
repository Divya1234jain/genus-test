/* eslint-disable import/no-dynamic-require */
/* eslint-disable global-require */
const fs = require("fs");
const path = require("path");

const loadRoutesAndMiddleware = function (app) {
    const modulesPath = path.join(__dirname, "../app");
    const modules = fs.readdirSync(path.join(__dirname, "../app"));
    modules.forEach((folderName) => {
        const routeFileName = path.join(modulesPath, folderName, `${folderName}.route.js`);
        if (fs.existsSync(routeFileName)) {
            app.use("/api/v1", require(routeFileName));
        }
    });
};

module.exports = {
    loadRoutesAndMiddleware
};