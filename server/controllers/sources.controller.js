const { getSources } = require('../services/newsapi.service');
const User = require('../models/user.model');
const { ErrorHandler } = require('../helpers/error');
// const _ = require('lodash');

const getAllSources = async (req, res) => {
    try {
        const data = await getSources();
        const user = await User.findById(req.currentUser.userId);
        const userSources = user.sources;
        // append user sources to original response
        res.status(200).send({ ...data, userSources });
    } catch (error) {
        throw new ErrorHandler(500, "Failed to retrieve all sources");
    }
};


const subscribeToSource = async (req, res) => {
    const { sourceId } = req.body
    if (!sourceId) {
        throw new ErrorHandler(403, "sourceId is invalid");
    }
    try {
        // will get sources list from cache for validation
        const data = await getSources();
        if (!data.sources.some(e => e.id === sourceId)) {
            throw new ErrorHandler(403, "sourceId is not available to subscribe");
        }
    } catch (error) {
        throw error;
    }
    const user = await User.findById(req.currentUser.userId);
    const userDoc = await user.subscribe(sourceId);

    if (userDoc) {
        return res.status(201).send({ message: "success", sources: userDoc.sources });
    } else {
        throw new ErrorHandler(500, "can't subscribe to this source");
    }
};


const unsubscribeFromSource = async (req, res) => {
    const { sourceId } = req.body
    if (!sourceId) {
        throw new ErrorHandler(403, "sourceId is invalid");
    }
    const user = await User.findById(req.currentUser.userId);
    const userDoc = await user.unsubscribe(sourceId);

    if (userDoc) {
        return res.status(201).send({ message: "success", sources: userDoc.sources });
    } else {
        throw new ErrorHandler(500, "can't unsubscribe");
    }
};


module.exports = {
    getAllSources,
    subscribeToSource,
    unsubscribeFromSource
};