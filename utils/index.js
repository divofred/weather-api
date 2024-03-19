const LOCATION_API_KEY = process.env.LOCATION_API_KEY;
exports.getLatAndLon = async (city, state, country) => {
  const searchString = `city=${city}&state=${state}&country=${country}`.replace(
    /\s+/g,
    '-'
  );
  try {
    const response = await fetch(
      `https://geocode.maps.co/search?${searchString}&api_key=${LOCATION_API_KEY}`
    );
    if (response.ok) {
      const data = await response.json();

      if (data.length > 0) {
        if (data.length == 1) {
          const { lat, lon } = data[0];
          return { lat, lon };
        } else {
          const { lat, lon } = data.find(
            location => location.osm_type === 'node'
          );
          return { lat, lon };
        }
      } else {
        throw new Error('Failed to fetch location data');
      }
    } else {
      throw new Error('Failed to fetch location data');
    }
  } catch (error) {
    console.error('Error getting geolocation:', error);
    return { error };
    // Handle errors here, e.g., show an error message to the user
  }
};

exports.getWeatherforcast = async (city, lat, lon, days) => {
  try {
    if (!city) {
      city = await this.getAddress(lat, lon);
    }
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=temperature_2m&daily=temperature_2m_max&forecast_days=${days}`;
    const response = await fetch(url);
    const data = await response.json();

    // Create an empty array to store the transformed data
    const forecast = [];

    // Loop through each daily entry
    data.daily.time.forEach((date, index) => {
      // Initialize an object for the daily forecast
      const dailyForecast = {
        date: date,
        max_forecast: {},
        hourly: {}
      };

      // Find the index of the maximum temperature for the day
      const maxTempIndex = data.hourly.temperature_2m.findIndex(
        temp => temp === data.daily.temperature_2m_max[index]
      );

      // Set the time and temperature for the max forecast
      dailyForecast.max_forecast.time = data.hourly.time[
        maxTempIndex
      ].substring(11, 16);
      dailyForecast.max_forecast.temp = `${data.daily.temperature_2m_max[index]}`;

      // Loop through each hourly entry
      data.hourly.time.forEach((time, idx) => {
        // If the current time belongs to the current date, add it to the hourly forecast
        if (time.startsWith(date)) {
          dailyForecast.hourly[
            time.substring(11, 16)
          ] = `${data.hourly.temperature_2m[idx]}`;
        }
      });

      // Push the daily forecast to the forecast array
      forecast.push(dailyForecast);
    });

    // Output the transformed data
    return { city, forecast };
  } catch (error) {
    console.error('Error getting weather forecast:', error);
    return { error: 'Error getting weather forecast' };
  }
};

exports.getAddress = async (lat, lon) => {
  try {
    const response = await fetch(
      `https://geocode.maps.co/reverse?lat=${lat}&lon=${lon}&api_key=${LOCATION_API_KEY}`
    );
    if (response.ok) {
      const data = await response.json();
      if (data) {
        return data.address.city;
      } else {
        throw new Error('Failed to fetch location data');
      }
    } else {
      throw new Error('Failed to fetch location data');
    }
  } catch (error) {
    console.error('Error getting address:', error);
    return { error: 'Error getting address' };
  }
};
