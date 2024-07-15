const session = require('express-session');

function createUserSession(req, user, action) {
    req.session.user = {
        id: user.id,
        email: user.email,
        fullname: user.fullname
    };
    req.session.isAuthenticated = true;
    req.session.save(action);
}

module.exports = {
    createUserSession
};
