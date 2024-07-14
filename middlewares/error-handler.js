function handleErrors(error, req, res, next) {
    console.error(error);
    res.status(500).render('error', {
        errorCode: error.status || 500,
        errorMessage: error.message || 'Internal Server Error'
    });
}

module.exports = handleErrors;
