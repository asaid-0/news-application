const express = require('express');
const sourcesController = require('../../controllers/sources.controller');

const router = express.Router();

router.get('/', sourcesController.getAllSources);   // get all available sources list
router.patch('/', sourcesController.subscribeToSource);   // subscribe to a news source
router.delete('/', sourcesController.unsubscribeFromSource);   // unsubscribe from a news source

module.exports = router;