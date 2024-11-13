const axios = require('axios');

class OpenMeteoClient {
    constructor() {
        // Open-Meteo API base URL
        this.apiUrl = 'https://api.open-meteo.com/v1/forecast';
    }

    // Fetch current and hourly weather data for a given latitude and longitude
    async getWeather(latitude, longitude) {
        try {
            // Construct the API request URL with the required parameters
            const url = `${this.apiUrl}?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,wind_speed_10m&hourly=temperature_2m,relative_humidity_2m,wind_speed_10m`;

            // Make the GET request to the Open-Meteo API
            const response = await axios.get(url);

            // Return the data from the response
            return response.data;
        } catch (error) {
            // Handle any errors and throw them for further processing
            console.error('Error fetching weather data:', error);
            throw new Error('Failed to retrieve weather data');
        }
    }
}

module.exports = OpenMeteoClient;
