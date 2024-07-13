
const User = require('../models/user.models');

function getSignup(req,res) {
    res.render('customer/auth/signup');
}
function getLogin(req,res){
    
}
function signup(req,res){
    const user = new User(
        
    );
}

module.exports = {
    getSignup: getSignup,
    getLogin: getLogin,
    signup: signup
};
