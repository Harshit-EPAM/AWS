exports.handler = async (event) => {
    // Return the response
    const response = {
        statusCode: 200,
        body: JSON.stringify({
            message: 'Hello from Lambda',
        }),
    };
    return response;
};
