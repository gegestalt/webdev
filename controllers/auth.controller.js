const User = require('../models/user.models');
function getSignup(req, res) {
    res.render('customer/auth/signup');
}

function getLogin(req, res) {
    res.render('customer/auth/login');
}

async function signup(req, res) {
    const user = new User(
        req.body.email,
        req.body.password,
        req.body.fullname,
        req.body.street,
        req.body.postal,
        req.body.city
    );

    try {
        await user.signup();
        res.redirect('/login');
    } catch (error) {
        console.error('Signup failed:', error);
        res.status(500).send('Signup failed');
    }
}

module.exports = {
    getSignup,
    getLogin,
    signup
};
