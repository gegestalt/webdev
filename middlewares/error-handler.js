function handleErrors(error, req, res, next) {
    console.error(error); // Log the error for debugging purposes

    // Set default error values
    let statusCode = error.status || 500;
    let errorMessage = error.message || 'Internal Server Error';
    let errorDetails = error.stack || null; // Use stack trace for detailed error

    // Render error page with status code, message, and details
    res.status(statusCode).render('shared/error', {
        pageTitle: 'An Error Occurred',
        errorCode: statusCode,
        errorMessage: errorMessage,
        errorDetails: errorDetails
    });
}

module.exports = handleErrors;
