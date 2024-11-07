exports.handler = async (event) => {
    // Loop through each SQS message that triggered the Lambda function
    for (const record of event.Records) {
        console.log('Received SQS message:', JSON.stringify(record.body));
    }

    return {
        statusCode: 200,
        body: JSON.stringify('Message processed successfully')
    };
};

