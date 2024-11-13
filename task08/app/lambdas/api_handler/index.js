// Lambda Layer Code (OpenMeteoAPI.js)
const fetch = require('node-fetch'); // You can use the native fetch if running in an environment that supports it (Node.js 18.x and higher supports it natively)

class OpenMeteoAPI {
  constructor(latitude, longitude) {
    this.latitude = latitude;
    this.longitude = longitude;
    this.apiUrl = `https://api.open-meteo.com/v1/forecast?latitude=${this.latitude}&longitude=${this.longitude}&current=temperature_2m,wind_speed_10m&hourly=temperature_2m,relative_humidity_2m,wind_speed_10m`;
  }

  // Function to fetch the latest weather forecast data
  async getWeatherData() {
    try {
      // Make the HTTP request to the Open-Meteo API
      const response = await fetch(this.apiUrl);
      
      // Check if the response status is OK (200)
      if (!response.ok) {
        throw new Error(`Error fetching weather data: ${response.statusText}`);
      }

      // Parse the response data as JSON
      const data = await response.json();
      
      // Return the relevant weather data
      return {
        current: {
          temperature: data.current.temperature_2m,
          windSpeed: data.current.wind_speed_10m
        },
        hourly: data.hourly.time.map((time, index) => ({
          time: time,
          temperature: data.hourly.temperature_2m[index],
          humidity: data.hourly.relative_humidity_2m[index],
          windSpeed: data.hourly.wind_speed_10m[index]
        }))
      };

    } catch (error) {
      console.error('Error in getWeatherData:', error.message);
      throw new Error('Failed to fetch weather data');
    }
  }
}

module.exports = OpenMeteoAPI;
