const express = require('express');
const userNews = require('../../controllers/news.controller');

const router = express.Router();

router.get('/', userNews);

module.exports = router;