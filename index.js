const fetchWeather = require('./utils/fetchWeather');
const { loadCache, saveCache } = require('./utils/cache');
require('dotenv').config();

const city = process.argv[2];

if (!city) {
  console.log('❗ Please provide a city name');
  process.exit(1);
}

(async () => {
  const cache = loadCache();
  const now = Date.now();

  // Use cache if it's less than 1 hour old
  if (cache[city] && now - cache[city].timestamp < 3600000) {
    console.log(`📦 Using cached data for ${city}...\n`);
    displayWeather(cache[city].data);
  } else {
    try {
      const data = await fetchWeather(city);
      cache[city] = { data, timestamp: now };
      saveCache(cache);
      displayWeather(data);
    } catch (err) {
      console.error('⚠️', err.message);
    }
  }
})();

function displayWeather(data) {
  console.log(`🌤️  Weather in ${data.name}`);
  console.log(`🌡️  Temperature: ${data.main.temp} °C`);
  console.log(`🌈 Condition: ${data.weather[0].description}`);
  console.log(`💨 Wind Speed: ${data.wind.speed} m/s`);
}
