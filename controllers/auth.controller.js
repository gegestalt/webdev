
const User = require('../models/user.models');

function getSignup(req,res) {
    res.render('customer/auth/signup');
}
function getLogin(req,res){
    res.render('customer/auth/login');
    
}
function signup(req,res){
    const user = new User(
        req.body.email,
        req.body.password,
        req.body.fullname,
        req.body.street,
        req.body.postal,
        req.body.city
    );
    user.signup();
    res.redirect('/login');
}

module.exports = {
    getSignup: getSignup,
    getLogin: getLogin,
    signup: signup
};
