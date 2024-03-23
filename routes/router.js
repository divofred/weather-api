const express = require('express');
const { geocoding, reverseGeocoding } = require('../controllers/weather');
const router = express.Router();

/**
 * @swagger
 * /api/geo-coding:
 *   post:
 *     summary: GeoCoding
 *     description: Get the weather forecast based on the provided city, state, country, and number of days.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               city:
 *                 type: string
 *               state:
 *                 type: string
 *               country:
 *                 type: string
 *               days:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Successful operation. Returns the weather forecast.
 *       400:
 *         description: Bad request. One or more parameters (city, state, country, days) are missing.
 *       500:
 *         description: Internal server error. Error getting geolocation or weather forecast.
 */

router.post('/geo-coding', geocoding);

/**
 * @swagger
 * /reverse-geo-coding:
 *   post:
 *     summary: Reverse GeoCoding
 *     description: Get the weather forecast based on the provided latitude, longitude, and number of days.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               lat:
 *                 type: number
 *               lon:
 *                 type: number
 *               days:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Successful operation. Returns the weather forecast.
 *       400:
 *         description: Bad request. One or more parameters (lat, lon, days) are missing.
 *       500:
 *         description: Internal server error. Error getting geolocation or weather forecast.
 */
router.post('/reverse-geo-coding', reverseGeocoding);

module.exports = router;
