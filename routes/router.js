const express = require('express');
const { geocoding, reverseGeocoding } = require('../controllers/weather');
const router = express.Router();

// Define your routes here

router.get('/geo-coding', geocoding);

router.get('/reverse-geo-coding', reverseGeocoding);

module.exports = router;
