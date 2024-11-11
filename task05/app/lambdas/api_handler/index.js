const AWS = require('aws-sdk');
const uuid = require('uuid');
const dynamodb = new AWS.DynamoDB.DocumentClient();

// DynamoDB table name
const TABLE_NAME = 'Events';

exports.handler = async (event) => {
    try {
        // Parse the incoming event
        const { principalId, content } = JSON.parse(event.body);

        // Ensure principalId and content are provided
        if (!principalId || !content) {
            return {
                statusCode: 400,
                body: JSON.stringify({ message: 'Missing required fields: principalId or content' }),
            };
        }

        // Create a new event object
        const newEvent = {
            id: uuid.v4(), // Generate a unique UUID for the event
            principalId: principalId, // Use the provided principalId
            createdAt: new Date().toISOString(), // Use current timestamp in ISO 8601 format
            body: content, // Store the content provided
        };

        // Insert the event into DynamoDB
        await dynamodb.put({
            TableName: TABLE_NAME,
            Item: newEvent,
        }).promise();

        // Return the created event as the response
        return {
            statusCode: 201,
            body: JSON.stringify({
                event: newEvent, // Return the created event
            }),
        };
    } catch (error) {
        console.error('Error processing event:', error);

        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Internal server error', error: error.message }),
        };
    }
};
