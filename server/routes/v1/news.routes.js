const express = require('express');
const userNews = require('../../controllers/news.controller');

const router = express.Router();

router.get('/:page', userNews);

module.exports = router;