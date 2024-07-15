const User = require('../models/user.models');
const authUtil = require('../util/authentication');  
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

async function login(req, res) {
    const user = new User(req.body.email, req.body.password);
    constExistinguser =  user.getUserWithSameEmail();
    if(!existingUser) {
        return res.status(401).send('Invalid email or password');
    }
    const passwordMatch = await user.hasMatchingPassword(existingUser.password);
    if(!passwordMatch) {
        return res.status(401).send('Invalid email or password');
    }
    authUtil.createUserSession(req, existingUser, function(){
        res.redirect('/');
    } ); 
}


module.exports = {
    getSignup:getSignup,
    getLogin:getLogin,
    signup:signup,
};
