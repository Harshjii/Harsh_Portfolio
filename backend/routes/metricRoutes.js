const express = require('express');
const router = express.Router();
const { recordClick, getClicks } = require('../controllers/metricController');

// Route configurations
router.post('/click', recordClick);
router.get('/clicks', getClicks);

module.exports = router;
