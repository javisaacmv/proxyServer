import axios from "axios";
import fs from 'fs';
import https from 'https';
const path = require("path");



const auth_url = process.env.auth_url
const api_global = process.env.api_global

const options = {
      
    cert: fs.readFileSync(
      path.resolve(__dirname, "./certs/certificate.pem"),
      `utf-8`
    ),
    key: fs.readFileSync(
      path.resolve(__dirname, "./certs/certificate.key"),
      "utf-8"
    ),
  
    rejectUnauthorized: false,
   
    keepAlive: false, 
  }; 

const agent = new https.Agent(options);

export const authInstance = axios.create({
  baseURL: auth_url,
  httpAgent: agent,
});

export const globalInstance = axios.create({
    baseURL: api_global,
    httpAgent: agent,
  });