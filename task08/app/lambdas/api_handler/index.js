// Lambda function code: index.js

// Importing axios from Lambda Layer (/opt/nodejs) where it is available
const axios = require('axios');

// OpenMeteoAPI Class to interact with Open-Meteo API
class OpenMeteoAPI {
  constructor(latitude, longitude) {
    this.latitude = latitude;
    this.longitude = longitude;
    this.apiUrl = `https://api.open-meteo.com/v1/forecast?latitude=${this.latitude}&longitude=${this.longitude}&current=temperature_2m,wind_speed_10m&hourly=temperature_2m,relative_humidity_2m,wind_speed_10m`;
  }

  // Function to fetch weather data from Open-Meteo API
  async getWeatherData() {
    try {
      // Make the HTTP request to Open-Meteo API
      const response = await axios.get(this.apiUrl);
      
      // Check if the response is successful
      if (response.status !== 200) {
        throw new Error(`Error fetching weather data: ${response.statusText}`);
      }

      // Return the relevant weather data
      return {
        current: {
          temperature: response.data.current.temperature_2m,
          windSpeed: response.data.current.wind_speed_10m,
        },
        hourly: response.data.hourly.time.map((time, index) => ({
          time: time,
          temperature: response.data.hourly.temperature_2m[index],
          humidity: response.data.hourly.relative_humidity_2m[index],
          windSpeed: response.data.hourly.wind_speed_10m[index]
        }))
      };

    } catch (error) {
      console.error('Error fetching weather data:', error.message);
      throw new Error('Failed to fetch weather data');
    }
  }
}

// Lambda function handler
exports.handler = async (event) => {
  const latitude = 52.52;  // Example latitude (Berlin)
  const longitude = 13.41; // Example longitude (Berlin)

  try {
    // Create an instance of OpenMeteoAPI class
    const openMeteoAPI = new OpenMeteoAPI(latitude, longitude);
    
    // Fetch weather data using the method from the class
    const weatherData = await openMeteoAPI.getWeatherData();

    // Return the weather data as a response
    return {
      statusCode: 200,
      body: JSON.stringify({
        message: 'Weather data retrieved successfully',
        data: weatherData
      }),
    };
  } catch (error) {
    // Handle errors
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: 'Error fetching weather data',
        error: error.message
      }),
    };
  }
};
