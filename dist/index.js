"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_http_proxy_1 = __importDefault(require("express-http-proxy"));
const app = (0, express_1.default)();
const port = 3000;
app.use('/*', (0, express_http_proxy_1.default)('https://auth.hml.caradhras.io'));
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
