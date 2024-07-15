const User = require('../models/user.models');
const authUtil = require('../util/authentication');

function getSignup(req, res) {
    res.render('customer/auth/signup');
}

function getLogin(req, res) {
    res.render('customer/auth/login');
}

async function signup(req, res) {
    const { email, password, fullname, street, postal, city } = req.body;

    const user = new User(email, password, fullname, street, postal, city);

    try {
        await user.signup();
        res.redirect('/login');
    } catch (error) {
        console.error('Signup failed:', error);
        res.status(500).send('Signup failed');
    }
}

async function login(req, res) {
    const { email, password } = req.body; // Destructure email and password from req.body
    const user = new User(email, password); // Use destructured variables
    try {
        const existingUser = await user.getUserWithSameEmail();

        if (!existingUser) {
            return res.status(401).render('shared/error', {
                pageTitle: 'Authentication Error',
                errorCode: 401,
                errorMessage: 'Invalid email or password',
                errorDetails: null
            });
        }

        const passwordMatch = await user.hasMatchingPassword(password, existingUser.password);

        if (!passwordMatch) {
            return res.status(401).render('shared/error', {
                pageTitle: 'Authentication Error',
                errorCode: 401,
                errorMessage: 'Invalid email or password',
                errorDetails: null
            });
        }

        authUtil.createUserSession(req, existingUser, function() {
            res.redirect('/');
        });

    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).render('shared/error', {
            pageTitle: 'Internal Server Error',
            errorCode: 500,
            errorMessage: 'Internal server error',
            errorDetails: error.message
        });
    }
}



module.exports = {
    getSignup: getSignup,
    getLogin: getLogin,
    signup: signup,
    login: login
};
