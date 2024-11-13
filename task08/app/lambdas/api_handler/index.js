// Import the OpenMeteoClient class from the Lambda Layer
const OpenMeteoClient = require('/opt/nodejs/OpenMeteoSDK');

exports.handler = async (event) => {
    const latitude = 52.52;  // You can modify the latitude based on the event or input
    const longitude = 13.41; // You can modify the longitude based on the event or input

    try {
        // Create an instance of OpenMeteoClient
        const weatherClient = new OpenMeteoClient();

        // Fetch the weather data using the client
        const weatherData = await weatherClient.getWeather(latitude, longitude);

        // Return a successful response with the weather data
        return {
            statusCode: 200,
            body: JSON.stringify({
                message: 'Weather data fetched successfully',
                data: weatherData
            })
        };
    } catch (error) {
        // Return an error response if something goes wrong
        return {
            statusCode: 500,
            body: JSON.stringify({
                message: 'Failed to fetch weather data',
                error: error.message
            })
        };
    }
};
