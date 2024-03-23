const { getLatAndLon, getWeatherforcast, getAddress } = require('../utils');
exports.geocoding = async (req, res) => {
  try {
    const { city, state, country, days } = req.body;
    if (!city || !state || !country || !days) {
      return res
        .status(400)
        .json({ error: 'city, state, country or days parameter is missing' });
    }
    const { lat, lon, error } = await getLatAndLon(city, state, country);
    if (error) {
      return res.status(500).json({ error: 'Error getting geolocation' });
    }
    const val = await getWeatherforcast(city, lat, lon, days);

    return res.json({ ...val });
  } catch (error) {
    console.error('Error getting geolocation:', error);
    return res.status(500).json({ error: 'Error getting geolocation' });
  }
};
exports.reverseGeocoding = async (req, res) => {
  try {
    const { lat, lon, days } = req.query;
    if (!lat || !lon || !days) {
      return res
        .status(400)
        .json({ error: 'lat, lon or days parameter is missing' });
    }
    const city = await getAddress(lat, lon);
    const val = await getWeatherforcast(city, lat, lon, days);
    return res.json({ ...val });
  } catch (error) {
    console.error('Error getting geolocation:', error);
    return res.status(500).json({ error: 'Error getting geolocation' });
  }
};
