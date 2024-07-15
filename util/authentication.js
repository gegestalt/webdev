function createUserSession(req,user,action){
    req.session.uid = user._id.toString();
    req.session.user = user;
    req.session.isLoggedIn = true;
    req.session.save(action);

      
}
module.exports = createUserSession;  