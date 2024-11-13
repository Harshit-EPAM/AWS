const axios = require('axios');

class OpenMeteoClient {
    constructor() {
        this.baseUrl = 'https://api.open-meteo.com/v1/forecast';
    }

    /**
     * Get weather data for a specific location.
     * 
     * @param {number} latitude - The latitude of the location.
     * @param {number} longitude - The longitude of the location.
     * @returns {Promise<Object>} - Returns a Promise resolving to the weather data.
     */
    async getWeather(latitude, longitude) {
        try {
            const url = `${this.baseUrl}?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,wind_speed_10m&hourly=temperature_2m,relative_humidity_2m,wind_speed_10m`;

            // Send GET request to Open-Meteo API
            const response = await axios.get(url);
            
            // Return the API response data
            return response.data;
        } catch (error) {
            // Handle any errors (e.g., network issues, invalid data)
            console.error('Error fetching weather data:', error);
            throw new Error('Failed to fetch weather data');
        }
    }
}

module.exports = OpenMeteoClient;
