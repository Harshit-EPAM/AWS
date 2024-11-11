exports.handler = async (event) => {
    // Log the event to CloudWatch Logs for debugging purposes
    console.log('Received event:', JSON.stringify(event, null, 2));

    // Loop through each SQS message in the event
    for (const record of event.Records) {
        // Get the message body from the SQS record
        const messageBody = record.body;
        
        // Log the message content to CloudWatch Logs
        console.log('SQS Message Body:', messageBody);

        // Optional: If the message body is a JSON string, you can parse it and log the parsed object
        try {
            const parsedMessage = JSON.parse(messageBody);
            console.log('Parsed message:', parsedMessage);
        } catch (error) {
            // If the message body is not valid JSON, log the error
            console.log('Error parsing JSON message:', error);
        }
    }

    // Return a success response
    const response = {
        statusCode: 200,
        body: JSON.stringify('Hello from Lambda'),
    };
    return response;
};
