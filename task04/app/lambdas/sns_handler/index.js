exports.handler = async (event) => {
    // Loop through each SNS message in the event
    for (const record of event.Records) {
        // SNS message body can be accessed via record.Sns.Message
        console.log('Received SNS message:', JSON.stringify(record.Sns.Message));
    }

    return {
        statusCode: 200,
        body: JSON.stringify('SNS message processed successfully')
    };
};
