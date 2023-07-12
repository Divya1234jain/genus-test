/* eslint-disable import/no-extraneous-dependencies */
const express = require("express");
const cors = require("cors");
const path = require("node:path");
const fs = require("node:fs");
const bodyParser = require("body-parser");
const compression = require("compression");
const fileUpload = require("express-fileupload");
const { middleware, set } = require("express-http-context");
const cookieParser = require("cookie-parser");
const { loadRoutesAndMiddleware } = require("./utilities/server-utill");
const swaggerAPIDoc = require("./swagger");

const app = express();

// Load API Logger Middleware
app.use(middleware);
app.get("*", (req, res, next) => {
    set("qyeryObject", req.query || {});
    next();
});
app.use(require("./middlewares/api-logger.middleware"));
app.use(require("./middlewares/response-handler.middleware"));

app.use(fileUpload());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(compression());
app.use(require("./middlewares/cors"));
app.use(require("./middlewares/helmet"));

app.use(cors({
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
    optionsSuccessStatus: 204,
    exposedHeaders: ["Content-Disposition", "FileLength"]
}));

// Loadding Swagger API Doc
swaggerAPIDoc(app);

app.get(`/${global.formSubissionsUploadFolderName}/*`, (req, res) => {
    if (fs.existsSync(path.join(global.upploadFolder, req.path))) {
        return res.sendFile(path.join(global.upploadFolder, req.path));
    } else {
        res.status(400).send({ message: "Bad Request" });
    }
});

app.use(express.static(path.join(process.cwd(), "../frontend/build")));

// load routes and controllers files
loadRoutesAndMiddleware(app);

app.get(["index.html", "/*"], (req, res) => {
    const indexFilePath = process.env.INDEX_FILE_PATH || path.join(process.cwd(), "../frontend/build/index.html");
    res.sendFile(indexFilePath);
});

module.exports = app;