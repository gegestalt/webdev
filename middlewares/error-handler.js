function handleErrors(error, req, res, next) {
    console.error(error);
    res.status(500).render('error', { error });
    res.status(500).send('Something went wrong');
}