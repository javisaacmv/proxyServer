"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.globalInstance = exports.authIntance = void 0;
const axios_1 = __importDefault(require("axios"));
const fs_1 = __importDefault(require("fs"));
const https_1 = __importDefault(require("https"));
const path = require("path");
const auth_url = process.env.auth_url;
const api_global = process.env.api_global;
const options = {
    cert: fs_1.default.readFileSync(path.resolve(__dirname, "./certs/certificate.pem"), `utf-8`),
    key: fs_1.default.readFileSync(path.resolve(__dirname, "./certs/certificate.key"), "utf-8"),
    rejectUnauthorized: false,
    keepAlive: false,
};
const agent = new https_1.default.Agent(options);
exports.authIntance = axios_1.default.create({
    baseURL: auth_url,
    httpAgent: agent,
});
exports.globalInstance = axios_1.default.create({
    baseURL: api_global,
    httpAgent: agent,
});
