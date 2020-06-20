const { getNews } = require('../services/newsapi.service');
const User = require('../models/user.model');
const { ErrorHandler } = require('../helpers/error');
const _ = require('lodash');

const userNews = async (req, res) => {
    const userId = _.get(req, 'currentUser.userId');
    const user = await User.findById(userId);
    if (!user || _.isEmpty(user.sources)) {
        return res.status(200).send([]);
    }
    try {
        const result = await getNews(user.sources);
        res.status(200).send(result);
    } catch (error) {
        throw new ErrorHandler(500, 'Couldn\'t fetch news from server!');
    }
};

module.exports = userNews;