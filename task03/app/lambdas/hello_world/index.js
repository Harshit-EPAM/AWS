exports.handler = async (event) => {
    // Prepare the response object
    const response = {
        statusCode: 200,
        body: JSON.stringify({
            message: 'Hello from Lambda',
        }),
    };
    
    // Return the response
    return response;
};