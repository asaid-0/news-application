const axios = require('axios');

const token = process.env.NODE_NEWS_API_KEY || "b14404b146634bc1b7c602a6f5fde018";
const baseURL = process.env.NODE_NEWS_API_URL || "https://newsapi.org/v2";
const headers = {}
if (token) {
    headers['x-api-key'] = token;
}

module.exports = axios.create({ headers, baseURL });