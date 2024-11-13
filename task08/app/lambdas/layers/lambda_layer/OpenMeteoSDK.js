const axios = require('axios');

// Define the OpenMeteoClient class
class OpenMeteoClient {
    constructor() {
        // URL to fetch weather data for a specific location (Berlin, in this case)
        this.baseUrl = 'https://api.open-meteo.com/v1/forecast';
    }

    // Method to fetch current and hourly weather data using latitude and longitude
    async getWeather(latitude, longitude) {
        // Construct the full URL with query parameters
        const url = `${this.baseUrl}?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,wind_speed_10m&hourly=temperature_2m,relative_humidity_2m,wind_speed_10m`;

        try {
            // Send the GET request to the Open-Meteo API
            const response = await axios.get(url);

            // Return the weather data if the request was successful
            return response.data;
        } catch (error) {
            // Handle any errors that occur during the request
            throw new Error(`Failed to fetch weather data: ${error.message}`);
        }
    }
}

// Export the OpenMeteoClient class to use it elsewhere in the project
module.exports = OpenMeteoClient;
