"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Code for the proxy server
const express_1 = __importDefault(require("express"));
const axios_1 = require("./axios");
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
const port = process.env.PORT || 4010; // Puerto del proxy
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cors_1.default)());
app.get('/health-check', (req, res) => {
    res.status(200).json({
        status: 'ok',
        message: 'Proxy server is running: ' + port,
        urlDock: process.env.dock_url
    });
});
app.use('/auth', (req, res, next) => {
    console.log('AUTH');
    const method = req.method;
    const body = req.body;
    const url = req.url;
    const authorization = req.headers.authorization;
    axios_1.authIntance.request({ method, data: body, headers: { authorization }, url })
        .then((response) => {
        res.status(response.status).send(response.data);
    }).catch((error) => {
        console.log('axios: ', error.toJSON());
        next(error);
    });
});
app.use('/', (req, res, next) => {
    console.log('GLOBAL');
    const method = req.method;
    const body = req.body;
    const url = req.url;
    const authorization = req.headers.authorization;
    axios_1.globalInstance.request({ method, data: body, headers: { authorization }, url })
        .then((response) => {
        res.status(response.status).send(response.data);
    }).catch((error) => {
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            // console.log(error.response.data);
            // console.log('STATUS',error.response.status);
            // console.log(error.response.headers);
        }
        else if (error.request) {
            // The request was made but no response was received
            // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
            // http.ClientRequest in node.js
            // console.log(error.request);
        }
        else {
            // Something happened in setting up the request that triggered an Error
            // console.log('Error', error.message);
        }
        //   console.log(error.config);
        console.log('axios: ', error.toJSON());
        next(error);
    });
});
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
