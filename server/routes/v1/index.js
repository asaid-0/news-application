const express = require('express');
const auth = require('../../middlewares/auth');

const userRoute = require('./user.routes');
const newsRoute = require('./news.routes');
const sourcesRoute = require('./sources.routes');

const router = express.Router();

router.use('/user', userRoute);
router.use('/news', auth, newsRoute)
router.use('/sources', auth, sourcesRoute)


module.exports = router;