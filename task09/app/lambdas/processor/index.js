const axios = require('axios'); // Import axios to make the HTTP request
const { DynamoDB } = require('aws-sdk'); // Import AWS SDK to interact with DynamoDB

const dynamoDB = new DynamoDB.DocumentClient();
const TABLE_NAME = 'Weather';  // The name of your DynamoDB table

exports.handler = async (event) => {
    try {
        // Fetch the weather data from Open-Meteo API
        const url = 'https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&current=temperature_2m,wind_speed_10m&hourly=temperature_2m,relative_humidity_2m,wind_speed_10m';
        
        const response = await axios.get(url);
        const weatherData = response.data;

        // Prepare the data to store in DynamoDB
        const params = {
            TableName: TABLE_NAME,
            Item: {
                Id: Date.now(),  // Use current timestamp as the ID
                temperature: weatherData.current.temperature_2m,
                wind_speed: weatherData.current.wind_speed_10m,
                timestamp: new Date().toISOString(),
                hourly_forecast: weatherData.hourly
            }
        };

        // Store the weather data in DynamoDB
        await dynamoDB.put(params).promise();

        return {
            statusCode: 200,
            body: JSON.stringify({
                message: 'Weather data stored successfully',
                data: weatherData
            })
        };
    } catch (error) {
        console.error('Error:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({
                message: 'Error storing weather data',
                error: error.message
            })
        };
    }
};
