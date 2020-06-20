const axios = require('axios');

const token = process.env.NODE_NEWS_API_KEY;
const baseURL = process.env.NODE_NEWS_API_URL;
const headers = {}
if (token) {
    headers['x-api-key'] = token;
}

module.exports = axios.create({ headers, baseURL });