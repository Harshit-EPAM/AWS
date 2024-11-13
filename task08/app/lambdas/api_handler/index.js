// Import the OpenMeteoClient class from the Lambda Layer
const OpenMeteoClient = require('/Users/harshit_godawat/AWS/task08/app/lambdas/layers/lambda_layer/OpenMeteoSDK'); // Path to OpenMeteoClient class in Lambda Layer

// Lambda function handler
exports.handler = async (event) => {
    // Extract latitude and longitude from the event, with defaults for testing purposes
    const latitude = event.latitude || 52.52; // Default to 52.52 (Berlin)
    const longitude = event.longitude || 13.41; // Default to 13.41 (Berlin)
    
    try {
        // Create an instance of the OpenMeteoClient
        const client = new OpenMeteoClient();
        
        // Fetch the weather data using the provided latitude and longitude
        const weatherData = await client.getWeather(latitude, longitude);
        
        // Return the weather data as a response
        return {
            statusCode: 200,
            body: JSON.stringify(weatherData),
        };
    } catch (error) {
        // Handle errors and return a 500 response with the error message
        return {
            statusCode: 500,
            body: JSON.stringify({ message: error.message }),
        };
    }
};
