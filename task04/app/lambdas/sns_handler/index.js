exports.handler = async (event) => {
    // Loop through each record in the SNS event (there can be multiple SNS messages in one invocation)
    for (const record of event.Records) {
        // The SNS message content can be accessed via record.Sns.Message
        console.log('Received SNS message:', JSON.stringify(record.Sns.Message));
    }

    return {
        statusCode: 200,
        body: JSON.stringify('SNS message processed successfully')
    };
};
