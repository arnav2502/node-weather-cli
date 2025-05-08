const axios = require('axios');
require('dotenv').config();

async function fetchWeather(city) {
  const API_KEY = process.env.API_KEY;
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;

  try {
    const response = await axios.get(url);
    return response.data;
  } catch (err) {
    throw new Error('City not found or API error');
  }
}

module.exports = fetchWeather;
