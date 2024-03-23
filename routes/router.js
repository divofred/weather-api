const express = require('express');
const { geocoding, reverseGeocoding } = require('../controllers/weather');
const router = express.Router();

// Define your routes here

router.post('/geo-coding', geocoding);

router.post('/reverse-geo-coding', reverseGeocoding);

module.exports = router;
