exports.handler = async (event) => {
    // Loop through each SQS message in the event
    for (const record of event.Records) {
        // The SQS message body can be accessed via record.body
        console.log('Received SQS message:', JSON.stringify(record.body));
    }

    return {
        statusCode: 200,
        body: JSON.stringify('SQS message processed successfully')
    };
};
