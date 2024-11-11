exports.handler = async (event) => {
    // Log the full event object to CloudWatch Logs for debugging purposes
    console.log('Received event:', JSON.stringify(event, null, 2));

    // Loop through each record in the event (there can be multiple SNS messages in a batch)
    for (const record of event.Records) {
        // Get the SNS message from the record
        const snsMessage = record.Sns.Message;

        // Log the SNS message content to CloudWatch Logs
        console.log('Received SNS Message:', snsMessage);

        // Optional: If the SNS message is a JSON string, you can parse it and log the parsed object
        try {
            const parsedMessage = JSON.parse(snsMessage);
            console.log('Parsed SNS Message:', parsedMessage);
        } catch (error) {
            // If the SNS message body is not valid JSON, log the error
            console.log('Error parsing SNS message:', error);
        }
    }

    // Return a success response
    const response = {
        statusCode: 200,
        body: JSON.stringify('Hello from Lambda'),
    };
    return response;
};
